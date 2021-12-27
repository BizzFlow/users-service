const bcrypt = require ('bcrypt');

const users = [];

// REGISTER A USER
app.post ("/user", async (req,res) => {
    const user = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push ({user: user, password: hashedPassword});
    res.status(201).send(users);
    console.log(users);
})