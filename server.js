import express from "express";
import * as db from "./database.js";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

// LOGIN
app.post("/api/login", async (req, res) => {
    const {email, password} = req.body;

    // check for missing fields
    if (!email || !password) {
        res.status(400).send({status: "error", error: "missing fields"});
        return;
    }

    // get user from the database by email if it exists
    const user = await db.getUserByEmail(email);
    
    // if user does not exist, return error
    if (!user) {
        res.status(400).send({status: "error", error: "invalid email or password"});
        return;
    }

    // check if password is correct
    const hashedPassword = user.password;
    const passwordCorrect = await bcrypt.compare(password, hashedPassword);

    // if password is incorrect, return error
    if (!passwordCorrect) {
        res.status(400).send({status: "error", error: "invalid email or password"});
        return;
    }

    console.log("login", user);
    res.send({status: "ok"});
});


// SIGN UP
app.post("/api/signup", async (req, res) => {
    const {email, password, displayName} = req.body;

    // check for missing fields
    if (!email || !password || !displayName) {
        res.status(400).send({status: "error", error: "missing fields"});
        return;
    }

    // check if email is already in use
    const existingUser = await db.getUserByEmail(email);
    if(existingUser) {
        res.status(400).send({status: "error", error: "email already in use"});
        return;
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user in database
    const user = await db.createUser({email, password: hashedPassword, displayName});
    
    console.log("sign up", user)
    res.send({status: "ok"});
});

// UPDATE DISPLAY NAME
app.put("/api/users/:id/displayName", (req, res) => {
    console.log("update display name", req.body)
    res.send({status: "ok"});
});


// UPDATE PROFILE IMAGE
app.put("/api/users/:id/profileImage", (req, res) => {
    console.log("update profile image", req.body)
    res.send({status: "ok"});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});