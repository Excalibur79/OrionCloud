var express=require("express");
var app=express();
var bodyparser=require("body-parser");

var mongoose=require("mongoose");
var User=require("./models/users.js");
var Postone=require("./models/postone.js");
var Posttwo=require("./models/posttwo.js");
var Comment=require("./models/comment.js");

var fs = require('fs');
var path = require('path');
var multer = require('multer');
var cloudinary=require("cloudinary");
var passport=require("passport");
var localstrategy=require("passport-local");
var passportlocalmongoose=require("passport-local-mongoose");
var flash=require("connect-flash");




app.use(express.static("package"));







var mongoose=require("mongoose");
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cloudappnew", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

var DIR='uploads'
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR)
	},
	filename: (req, file, cb) => {

		cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
	}
});
const upload = multer({
 storage: storage,
 fileFilter:(req,file,cb)=>{
    if(file.mimetype=="image/png" ||file.mimetype=="image/jpg"||file.mimetype=="image/jpeg"||file.mimetype=="image/gif")
    {
        cb(null,true);
    }
    else
    {

        cb("Error:Images only");


    }

 }

 }).single('image');


 //===============CLOUDINARY Config =====================


 //========================================================


app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");

//========================USER========================

app.use(require("express-session")(
{
    secret:"This is DankCloud",
    resave:false,
    saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//====================================================

app.use(flash());



app.get("/",function(req,res)
{
    res.render("register");
});

//INDEX PAGE ROUTE
app.get("/posts",function(req,res)
{
   Postone.find({}).populate(["author","comments"]).exec(function(err,postone)
   {
        if(err)
        {
           console.log(err);
        }
        else
        {
            Posttwo.find({}).populate(["author","comments"]).exec(function(err,posttwo)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {

                     res.render("index",{postones:postone,posttwos:posttwo,currentuser:req.user,message:req.flash("success"),errormessage:req.flash("error")});
                }
            });

        }
   });
});
app.get("/posts/search",function(req,res)
{
    var search=req.query.search;
    search=search.concat("#");

    var array=[];
    var g=-1;
    for(var i=0;i<search.length;i++)
    {
        if((search.charAt(i)=="+")||(search.charAt(i)=="#"))
        {
            array.push(search.substring(g+1,i));
            g=i;

        }
    }



   Postone.find({"tags.name":{$in:array}}).populate(["author","comments"]).exec(function(err,found)
   {
        if(err)
        {
            console.log(err);
        }
        else
        {
             Posttwo.find({"tags.name":{$in:array}}).populate(["author","comments"]).exec(function(err,foundtwo)
             {
                    if(err)
                    {
                        console.log(err)
                    }
                    else
                    {
                          res.render("index",{postones:found,posttwos:foundtwo,currentuser:req.user});

                    }

             });


        }
   });


});
app.post("/posttwos",isLoggedin,function(req,res)
{

                     var x={};
                    var catagory=[];
                    if(req.body.type1)
                    {
                       var ob1={ name:req.body.type1 };
                       catagory.push(ob1);
                    }
                    if(req.body.type2)
                    {
                        var ob2={ name:req.body.type2 };
                       catagory.push(ob2);
                    }
                    if(req.body.type3)
                    {
                        var ob3={ name:req.body.type3 };
                       catagory.push(ob3);
                    }
                     if(req.body.type4)
                    {
                        var ob4={ name:req.body.type4 };
                       catagory.push(ob4);
                    }
                     if(req.body.type5)
                    {
                        var ob5={ name:req.body.type5 };
                       catagory.push(ob5);
                    }
                     if(req.body.type6)
                    {
                        var ob6={ name:req.body.type6 };
                       catagory.push(ob6);
                    }
                     if(req.body.type7)
                    {
                        var ob7={ name:req.body.type7 };
                       catagory.push(ob7);
                    }


                    if(catagory.length==0)
                    {
                         req.flash("error","You must select atleast one tag");
                        return  res.redirect("/posts");
                    }
                    if(req.body.desc=="")
                    {
                         req.flash("error","Content is null");
                        return res.redirect("/posts");
                    }


                    Posttwo.create(
                    {
                        description:req.body.desc,
                        tags:catagory,
                        userid:req.user
                    },function(err,newposttwo)
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                             newposttwo.author=req.user;

                             newposttwo.save();

                            res.redirect("/posts");
                        }
                    });


});

//FORM SHOW Route
app.get("/postones/new",isLoggedin,function(req,res)
{
    res.render("new",{currentuser:req.user,errormessage:req.flash("error")});
});

//SHOW
app.post('/postones',isLoggedin,(req, res) => {

        upload(req,res,(err) =>
        {
            if(err)
            {
                res.render("new",{message:err});
            }
            else
            {


                           var x={};
                            var catagory=[];
                            if(req.body.type1)
                            {
                               var ob1={ name:req.body.type1 };
                               catagory.push(ob1);
                            }
                            if(req.body.type2)
                            {
                                var ob2={ name:req.body.type2 };
                               catagory.push(ob2);
                            }
                            if(req.body.type3)
                            {
                                var ob3={ name:req.body.type3 };
                               catagory.push(ob3);
                            }
                             if(req.body.type4)
                            {
                                var ob4={ name:req.body.type4 };
                               catagory.push(ob4);
                            }
                             if(req.body.type5)
                            {
                                var ob5={ name:req.body.type5 };
                               catagory.push(ob5);
                            }
                             if(req.body.type6)
                            {
                                var ob6={ name:req.body.type6 };
                               catagory.push(ob6);
                            }
                             if(req.body.type7)
                            {
                                var ob7={ name:req.body.type7};
                               catagory.push(ob7);
                            }
                             if(req.body.type8)
                            {
                                var ob8={ name:req.body.type8};
                               catagory.push(ob8);
                            }
                             if(req.body.type9)
                            {
                                var ob9={ name:req.body.type9 };
                               catagory.push(ob9);
                            }

                                 if(catagory.length==0)
                                {
                                     req.flash("error","You must select atleast one tag");
                                    return  res.redirect("/postones/new");
                                }
                                if(req.body.desc=="")
                                {
                                     req.flash("error","Content is null");
                                    return res.redirect("/postones/new");
                                }





                              if(req.body.type10)
                            {
                                var ob10={ name:req.body.type10 };
                               catagory.push(ob10);
                            }
                              if(req.body.type11)
                            {
                                var ob11={ name:req.body.type11};
                               catagory.push(ob11);
                            }
                              if(req.body.type12)
                            {
                                var ob12={ name:req.body.type12};
                               catagory.push(ob12);
                            }









                     cloudinary.uploader.upload(req.file.path,function(result)
                     {


                             var image=result.secure_url;
                            var obj = {

                                description: req.body.desc,
                                image:image,
                                tags:catagory

                            };
                            Postone.create(obj,(err, item) =>
                            {
                                if (err)
                                {
                                   res.redirect("/postones/new");
                                }
                                else
                                {
                                     item.author=req.user;
                                   item.save();
                                    res.redirect("/posts");
                                }
                            });
                     });
            }






        });
});

app.post("/postone/:id/delete",isLoggedin,postoneuserauthorized,function(req,res)
{
    Postone.findByIdAndRemove(req.params.id,function(err,deletedpostone)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/profile/"+deletedpostone.author._id);
        }
    })
})



app.post("/postone/:id/comments",isLoggedin,function(req,res)
{
    var newcomment=req.body.comment;
    Postone.findById(req.params.id,function(err,foundpostone)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
                  Comment.create(newcomment,function(err,comment)
                    {
                       foundpostone.comments.push(comment);
                       foundpostone.save(function(err,data)
                       {

                            if(req.xhr)
                            {

                                res.json(comment);
                            }
                           else
                            {
                                 res.send("strange postone");
                            }

                       });
                    });
        }
    })
});




app.post("/postone/:id/likes",isLoggedin,function(req,res)
{
   var obj=req.body.like;
   var k=0;
   var index=0;

    Postone.findById(req.params.id,function(err,foundpostone)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            var likearray=foundpostone.likes;
                for(var i=0;i<likearray.length;i++)
                {
                    if(likearray[i].id==obj.id)
                    {
                        k=-1;
                        index=i;
                        break;
                    }

                }
                if(k==0)
                {
                     foundpostone.likes.push(obj);
                     foundpostone.save();

                     if(req.xhr)
                     {
                        res.json(foundpostone);
                     }
                     else
                     {
                            res.send("Strange!");
                     }

                }
                if(k==-1)
                {
                    foundpostone.likes.splice(index,1);
                    foundpostone.save();

                       if(req.xhr)
                     {
                        res.json(foundpostone);
                     }
                     else
                     {
                            res.send("Strange!");
                     }


                }

        }
    })
});

app.post("/postone/comments/:commentid/delete",isLoggedin,checkcommentownership,function(req,res)
{

    Comment.findByIdAndRemove(req.params.commentid,function(err,foundcomment)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            Postone.findById(foundcomment.postid,function(err,foundpostone)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {

                    for(var i=0;i<foundpostone.comments.length;i++)
                    {
                        if(foundpostone.comments[i]==req.params.commentid.toString())
                        {

                            foundpostone.comments.splice(i,1);
                            foundpostone.save();
                            break;

                        }
                    }
                }
            });



            if(req.xhr)
            {

                res.json(foundcomment)
            }
           else
           {
              res.send("nani");

           }
        }
    })
})

app.post("/posttwo/:id/delete",isLoggedin,posttwouserauthorized,function(req,res)
{
    Posttwo.findByIdAndRemove(req.params.id,function(err,deletedposttwo)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {

            res.redirect("/profile/"+deletedposttwo.author._id);
        }
    })
})




app.post("/posttwo/:id/likes",isLoggedin,function(req,res)
{
   var obj=req.body.like;
   var l=0;
   var indexx=0;

    Posttwo.findById(req.params.id,function(err,foundposttwo)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            var likearrayy=foundposttwo.likes;
                for(var i=0;i<likearrayy.length;i++)
                {
                    if(likearrayy[i].id==obj.id)
                    {
                        l=-1;
                        indexx=i;
                        break;
                    }

                }
                if(l==0)
                {
                     foundposttwo.likes.push(obj);
                     foundposttwo.save();
                     if(req.xhr)
                     {
                        res.json(foundposttwo);
                     }
                     else
                     {
                        res.send("Strange");
                     }


                }
                if(l==-1)
                {
                    foundposttwo.likes.splice(indexx,1);
                    foundposttwo.save();
                     if(req.xhr)
                     {
                        res.json(foundposttwo);
                     }
                     else
                     {
                        res.send("Strange");
                     }

                }

        }
    })
});















app.post("/posttwo/:id/comments",isLoggedin,function(req,res)
{
    var newcomment=req.body.comment;
    Posttwo.findById(req.params.id,function(err,foundposttwo)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
                  Comment.create(newcomment,function(err,comment)
                    {
                       foundposttwo.comments.push(comment);
                       foundposttwo.save(function(err,data)
                       {

                            if(req.xhr)
                            {
                                res.json(comment);
                            }
                            else
                            {
                                 res.send("strange posttwo");
                            }

                       });
                    });
        }
    })
});


app.post("/posttwo/comments/:commentid/delete",isLoggedin,checkcommentownership,function(req,res)
{
    Comment.findByIdAndRemove(req.params.commentid,function(err,foundcomment)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
              Posttwo.findById(foundcomment.postid,function(err,foundposttwo)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {

                    for(var i=0;i<foundposttwo.comments.length;i++)
                    {
                        if(foundposttwo.comments[i]==req.params.commentid.toString())
                        {

                            foundposttwo.comments.splice(i,1);
                            foundposttwo.save();
                            break;

                        }
                    }
                }
            });



            if(req.xhr)
            {

                res.json(foundcomment)
            }
           else
           {
              res.send("This is strange");

           }
        }
    })
})


//======================================

app.get("/profile/:id",isLoggedin,function(req,res)
{

     Postone.find({"author":req.params.id}).populate(["author","comments"]).exec(function(err,postone)
   {
        if(err)
        {
           console.log(err);
        }
        else
        {
            Posttwo.find({"author":req.params.id}).populate(["author","comments"]).exec(function(err,posttwo)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {



                     User.findById(req.params.id,function(err,founduser)
                     {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {

                             res.render("profilepage",{postones:postone,posttwos:posttwo,profileuser:founduser,currentuser:req.user});
                        }
                     })


                }
            });

        }
   });

});


app.get("/profile/:id/edit",isLoggedin,function(req,res)
{


          User.findById(req.params.id,function(err,founduser)
                     {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {

                             res.render("useredit",{profileuser:founduser,currentuser:req.user,userid:req.params.id,message:req.flash("error")});
                        }
                     })



})
app.post("/profile/:id/edit",isLoggedin,isauthorizeduser,function(req,res)
{


             upload(req,res,(err)=>
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {

                        var phonecheck=req.body.phone;
                         if(Number.isNaN(parseInt(phonecheck)))
                            {

                                req.flash("error","Phone number is invalid");
                                return res.redirect("/profile/"+req.params.id+"/edit");
                            }
                         else
                         {
                             if(phonecheck.length!=10)
                                {
                                    req.flash("error","Phone number is invalid");
                                  return res.redirect("/profile/"+req.params.id+"/edit");
                                }

                         }




                        cloudinary.uploader.upload(req.file.path,function(result)
                        {

                            var phone=req.body.phone;
                            var image=result.secure_url;
                            var bio=req.body.bio;
                            var obj={phone:phone,avatar:image,bio:bio};


                            User.findByIdAndUpdate(req.params.id,obj,function(err,updateduser)
                            {
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {

                                    Comment.find({userid:req.params.id.toString()},function(err,foundcomments)
                                    {
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                        else
                                        {

                                            for(var i=0;i<foundcomments.length;i++)
                                            {
                                                foundcomments[i].avatar=image;
                                                foundcomments[i].save();

                                            }
                                            res.redirect("/profile/"+req.params.id);
                                        }
                                    })



                                }
                            });

                        });


                    }
                });
                
})
app.get("/profile/:id/about",isLoggedin,function(req,res)
{
      User.findById(req.params.id,function(err,founduser)
                     {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {

                            Postone.find({"author":req.params.id},function(err,foundpostones)
                            {
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    Posttwo.find({"author":req.params.id},function(err,foundposttwos)
                                    {
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                        else
                                        {

                                             var postonelikes=0;
                                             var posttwolikes=0;
                                            for(var i=0;i<foundpostones.length;i++)
                                            {
                                                postonelikes=postonelikes+foundpostones[i].likes.length;
                                            }
                                             for(var j=0;j<foundposttwos.length;j++)
                                            {
                                                posttwolikes=posttwolikes+foundposttwos[j].likes.length;
                                            }
                                           var respect=Math.round((posttwolikes+postonelikes)/(foundpostones.length+foundposttwos.length));
                                            res.render("userabout",{profileuser:founduser,currentuser:req.user,userid:req.params.id,respect:respect});
                                        }
                                    })
                                }
                            })


                        }
                     })

})


//=========================USER ROUTES===============================================================


app.get("/register",function(req,res)
{
    res.render("register",{message:req.flash("error")});
});

app.post("/register",function(req,res)
{
    var checkemail=req.body.email;
    var check=checkemail;
    check=check.concat("#");

    var array=[];
    var g=-1;
    for(var i=0;i<check.length;i++)
    {
        if((check.charAt(i)=="@")||(check.charAt(i)=="#"))
        {
            array.push(check.substring(g+1,i));
            g=i;

        }
    }
    if(array.length==2)
    {
        if(((array[1]=="gmail.com")||(array[1]=="hotmail.com")||(array[1]=="yahoo.com"))&&(array[0].length!=0))
        {

        }
        else
        {

            req.flash("error","Email id is Invalid");
           return res.redirect("/register");
        }
    }
    else
    {

            req.flash("error","Email id is Invalid");
          return res.redirect("/register");
    }



    User.find({"email":checkemail},function(err,foundcopy)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(foundcopy.length==0)
            {
                 User.register(new User({username:req.body.username,firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,
                 avatar:"",phone:"",bio:""}),req.body.password,function(err,user)
                    {
                        if(err)
                        {

                             req.flash("error","User with the given username already exists!");
                             return res.redirect("/register");
                        }
                        passport.authenticate("local")(req,res,function()
                        {

                            req.flash("success","Successfully Signed Up! Complete your profile");
                            res.redirect("/posts");
                        });
                    });
            }
            else
            {

                  req.flash("error","User with same email id already exists!");
                return res.redirect("/register");
            }
        }
    });

});

app.get("/login",function(req,res)
{

     res.render("login",{message:req.flash("error")});
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/posts",
    failureRedirect:"/login",
    failureFlash:true,
    successFlash:"Successfully logged in"

    }),function(req,res)
        {

        });

app.get("/logout",function(req,res)
{
    req.logout();
     req.flash("success","Logged you out");
    res.redirect("/posts");
});

function isLoggedin(req,res,next)
{
    if(req.isAuthenticated())
    {

        return next();
    }
     req.flash("error","Please Login first");
    res.redirect("/login");
};

function isauthorizeduser(req,res,next)
{
    if(req.user._id==req.params.id)
    {
        return next();
    }
    else
    {

        res.redirect("back");
    }
}

function checkcommentownership(req,res,next)
{
    Comment.findById(req.params.commentid,function(err,foundcomment)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(foundcomment.userid.toString()==req.user._id.toString())
            {

                return next();
            }
            else
            {
                res.redirect("back");
            }
        }
    })
}


function postoneuserauthorized(req,res,next)
{
    Postone.findById(req.params.id,function(err,foundpostone)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(foundpostone.author._id.toString()==req.user._id.toString())
            {

                return next();
            }
            else
            {

                res.redirect("back");

            }
        }
    })
}



function posttwouserauthorized(req,res,next)
{
    Posttwo.findById(req.params.id,function(err,foundposttwo)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            if(foundposttwo.author._id.toString()==req.user._id.toString())
            {

                return next();
            }
            else
            {

                res.redirect("back");

            }
        }
    })
}
//=======================================================





app.listen(2000,function(req,res)
{
    console.log("Server started on port 2000!");
});