const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:campusconnect12%40@campusconnect.pahyh.mongodb.net/CampusConnectApp");

const notificationSchema = new mongoose.Schema({
    title: String,
    body: String,
    timestamp: { type: Date, default: Date.now },

})

module.exports = mongoose.model("notificationSchema", notificationSchema)
