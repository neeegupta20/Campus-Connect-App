const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:campusconnect12%40@campusconnect.pahyh.mongodb.net/CampusConnectApp");


const tokenSchema = new mongoose.Schema({
    userId: String,
    expoPushToken: String
})

module.exports = mongoose.model("tokenSchema", tokenSchema)