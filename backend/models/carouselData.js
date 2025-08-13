const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:campusconnect12%40@campusconnect.pahyh.mongodb.net/CampusConnectApp");

const carouselData=new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    }
})

module.exports=mongoose.model("Carousel",carouselData)
