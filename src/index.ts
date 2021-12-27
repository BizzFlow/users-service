import bcrypt from "bcrypt";
import express from "express";

const app = express();

app.use(express.json());

const users: any[] = [];

app.post ("/user", async (req: any,res: any) => {
    const user = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push ({user: user, password: hashedPassword});
    res.status(201).send(users);
    console.log(users);
})

app.get ("/user", async (req,res) => {
    res.status(201).send(users);
    console.log(users);
})

//This middleware will allow us to pull req.body.<params>
// const port = process.env.TOKEN_SERVER_PORT 
const port = 3000

//get the port number from .env file
app.listen(port, () => { 
    console.log(`Authorization Server running on ${port}...`)
})