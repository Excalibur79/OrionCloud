var mongoose=require("mongoose");
var commentSchema=new mongoose.Schema(
{
    author:String,


});
module.exports=mongoose.model("Like",commentSchema);