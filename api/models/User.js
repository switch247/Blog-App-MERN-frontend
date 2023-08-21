const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    profilePic:{
        type:String,
        default:"",
        required:false
    }, 
},
{timestamps:true}




)

const User = mongoose.model("User",UserSchema)

module.exports = User


