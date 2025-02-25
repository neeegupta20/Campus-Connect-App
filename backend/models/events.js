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
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
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
    },
    photo1:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("events", eventSchema)