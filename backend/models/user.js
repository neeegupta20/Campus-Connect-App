const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://admin:campusconnect12%40@campusconnect.pahyh.mongodb.net/campusConnect");

const userSchema=mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    telno: {type: String, required: true},
    likedEvents: {type:[Number]},
    likedRestaurants: {type: [Number]}
})

module.exports = mongoose.model("user", userSchema)
