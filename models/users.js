var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");
var userSchema=new mongoose.Schema(
{
    username:String,
    firstname:String,
    lastname:String,
     email:String,
     avatar:String,
    phone:String,
    bio:String,
    password:String



});
userSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model("User",userSchema);