import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

const users: any[] = [];

const ACCESS_TOKEN_SECRET = "3e9af42de397cfc9387a06972c28c23a1ac7e9a60fb6dc1f05295bc6057baf500672d4a13db5d04ea84bbc4c5679164a7723f3d49f516bb73dc3df6e3b768c8e";
const REFRESH_TOKEN_SECRET = "56a6d157ad7d2ee09e480960ae857e528ae546d156f47433b1afad162311c45aa520697b65d13a5c72891f6145ab1f2675886fc124027dc95f86073dd8fe1462";

// accessTokens
function generateAccessToken(user: any) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function validateToken(req: any, res: any, next: any) {

    //get token from request header
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
    if (token == null) {
        res.sendStatus(400).send("Token not present")
    };


    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            res.status(403).send("Token invalid")
        }
        else {
            req.user = user;
            next(); //proceed to the next action in the calling function
        }
    }) //end of jwt.verify()
} //end of function

// refreshTokens
let refreshTokens: any[] = [];

function generateRefreshToken(user: any) {
    const refreshToken =
        jwt.sign(user, REFRESH_TOKEN_SECRET, { expiresIn: "20m" })
    refreshTokens.push(refreshToken)
    return refreshToken
}

app.post("/user", async (req: any, res: any) => {
    const user = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({ user: user, password: hashedPassword });
    res.status(201).send(users);
    console.log(users);
})

app.get("/user", async (req, res) => {
    res.status(201).send(users);
    console.log(users);
})

//AUTHENTICATE LOGIN AND RETURN JWT TOKEN
app.post("/login", async (req, res) => {
    const user = users.find((c) => c.user == req.body.name);

    //check to see if the user exists in the list of registered users
    if (user == null) res.status(404).send("User does not exist!");
    //if user does not exist, send a 400 response
    if (await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = generateAccessToken({ user: req.body.name });
        const refreshToken = generateRefreshToken({ user: req.body.name });
        res.json({
            accessToken,
            refreshToken
        });
    }
    else {
        res.status(401).send("Password Incorrect!");
    }
});

//REFRESH TOKEN API
app.post("/refreshToken", (req: any, res: any) => {

    if (!refreshTokens.includes(req.body.token)) {
        res.status(400).send("Refresh Token Invalid");
    }

    refreshTokens = refreshTokens.filter((c) => c != req.body.token);

    //remove the old refreshToken from the refreshTokens list
    const accessToken = generateAccessToken({ user: req.body.name });

    const refreshToken = generateRefreshToken({ user: req.body.name })

    //generate new accessToken and refreshTokens
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.delete("/logout", (req: any, res: any) => {
    refreshTokens = refreshTokens.filter((c) => c != req.body.token);

    //remove the old refreshToken from the refreshTokens list
    res.status(204).send("Logged out!");
});

app.get("/posts", validateToken, (req: any, res: any) => {
    console.log("Token is valid");
    console.log(req.user.user);
    res.send(`${req.user.user} successfully accessed post`);
})

//This middleware will allow us to pull req.body.<params>
// const port = process.env.TOKEN_SERVER_PORT 
const port = 3000

//get the port number from .env file
app.listen(port, () => {
    console.log(`Authorization Server running on ${port}...`)
})