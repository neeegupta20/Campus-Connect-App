const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:campusconnect12%40@campusconnect.pahyh.mongodb.net/CampusConnectApp");

const checkInSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref:'user'
    },
    zoneId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telno:{
        type:String,
        required:true
    },
    isCheckedIn:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("checkins",checkInSchema);