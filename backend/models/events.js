const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:campusconnect12%40@campusconnect.pahyh.mongodb.net/CampusConnectApp");

const eventSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        type: Time
    },
    description: {
        type: String, 
        required: true
    },
    venue: {
        type: String, 
        required: true
    },
    place: {
        type: String,
        required: true
    },
    photo1: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    formatDate: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("events", eventSchema)