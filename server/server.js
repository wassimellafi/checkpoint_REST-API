const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("../models/users");
const router = express.Router();
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));
// Create one user

app.post("/creat", async (req, res) => {
    const user = new User({
        name: req.body.name,
        userChannel: req.body.userChannel,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Get all users

app.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// fc getUserByid
async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cant find user" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}
// Delete one user
app.delete("/deleteuser/:id", getUser, async (req, res) => {
    try {
        await res.User.remove();
        res.json({ message: "Deleted This Subscriber" });
        res.json(res.User);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//getUserByID
app.get("/getuserbyid/:id", getUser, (req, res) => {
    res.json(res.user);
});
// Update Subscriber

app.patch("/update/:id", getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }

    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch {
        res.status(400).json({ message: err.message });
    }
});
app.listen(3000, () => console.log("server started"));
