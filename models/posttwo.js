var mongoose=require("mongoose")
var posttwoSchema=new mongoose.Schema({
           author:{

                            type:mongoose.Schema.Types.ObjectId,
                            ref:"User"



             },


        description:String,

        tags:
                [
                 {
                      name:String
                 }
                ],

        comments:[
                    {
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"Comment"
                    }

             ],

             likes:[
                    {
                          id:String
                    }


               ]

});
module.exports=mongoose.model("Posttwo",posttwoSchema);

