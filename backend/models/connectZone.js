const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:campusconnect12%40@campusconnect.pahyh.mongodb.net/CampusConnectApp");

const connectZoneSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
})
module.exports=mongoose.model("connectZone",connectZoneSchema)

