var mongoose=require("mongoose");
var commentSchema=new mongoose.Schema(
{
    author:String,
    avatar:String,
    text:String,
    postid:String,
    userid:String

});
module.exports=mongoose.model("Comment",commentSchema);