const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:campusconnect12%40@campusconnect.pahyh.mongodb.net/CampusConnectApp");

const reservationSchema = mongoose.Schema({
    name:{
        type:String,
    },
    telno: {
        type:Number,
        required:false
    },
    numberOfPeople: {
        type:Number,
    },
    eventId:{
        type: String,
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,ref:'user'
    },
    restaurantId:{
        type: String,
    },
    venueName:{
        type:String,
    },
    Date:{
        type:String
    },
    Time:{
        type:String
    },
    isScanned:{
        type:Boolean,
        default:false
    },
    uid:{
        type:Number,
        required:false
    },
    teamName:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        required:false
    }
})


module.exports = mongoose.model("reservation", reservationSchema)
