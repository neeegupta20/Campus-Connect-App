const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:campusconnect12%40@campusconnect.pahyh.mongodb.net/CampusConnectApp");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    telno: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    expoPushToken: { 
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
