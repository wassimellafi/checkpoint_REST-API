const mongoose = require("mongoose");
//shema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, required: true },
    last_name: [String],
    email: [String],
    age: Number,
});

//Model

var User = mongoose.model("User", userSchema);

// saving user to our mongo database
const data = {
    name: "wassim",
    last_name: "ellafi",
    email: "wassim@gmail.com",
    age: 26,
};

const newUser = new User(data); /**  instance of the model */

newUser.save((error) => {
    if (error) {
        console.log("something happened");
    } else {
        console.log("Data has been saved!!!");
    }
});
module.exports = mongoose.model("User", userSchema);
