$("#post-selector").on("submit",".postone-comment-form",function(e)
{
    e.preventDefault();
    var actionurl=$(this).attr("action");
    var commentdata=$(this).serialize();
    var postoneid=($(this).data("postid"));

    var x=postoneid.toString();

    $.post(actionurl,commentdata,function(data)
    {
                var y="#"+postoneid;
                if(data['avatar']!="")
                {
                  $(y.toString()).append(
                  `
                        <div class="postone-comment">

                          <div class="others-comment-photo"><div class="my-comment-photo "><img class="thumbnail-image" src="${data["avatar"]}"></div></div>



                          <div class="whole-comment"><div class="author-name">${data["author"]}</div><div class="comment-text">${data["text"]}</div></div>
                          <div class="comment-delete">
                                           <form class="postone-comment-delete-form" action="/postone/comments/${data._id}/delete" method="POST">
                                             <button class="comment-delete-button"></button>
                                          </form>

                           </div>

                        </div>
                  `

                  )
              }
              else
              {
                 $(y.toString()).append(
                  `
                        <div class="postone-comment">

                          <div class="others-comment-photo"><div class="my-comment-photo "></div></div>



                          <div class="whole-comment"><div class="author-name">${data["author"]}</div><div class="comment-text">${data["text"]}</div></div>

                           <div class="comment-delete">
                                          <form class="postone-comment-delete-form" action="/postone/comments/${data._id}/delete" method="POST">
                                             <button class="comment-delete-button"></button>
                                          </form>
                           </div>


                        </div>
                  `

                  )

              }



              $("#post-selector").find(".postone-text").val("");

       })
});


//=====================================================


$("#post-selector").on("submit",".posttwo-comment-form",function(event)
{

    event.preventDefault();

     var actionurl=$(this).attr("action");
    var commentdata=$(this).serialize();
    var posttwoid=($(this).data("postid"));
   $.post(actionurl,commentdata,function(data)
   {

            var x="#"+posttwoid;
            if(data["avatar"]!="")
            {
                $(x.toString()).append(

                    `
                         <div class="posttwo-comment">
                             <div class="others-comment-photo"><div class="my-comment-photo "><img class="thumbnail-image" src="${data["avatar"]}"></div></div>
                             <div class="whole-comment"><div class="author-name">${data["author"]}</div><div class="comment-text">${data["text"]}</div></div>
                              <div class="comment-delete">
                                           <form class="posttwo-comment-delete-form" action="/posttwo/comments/${data._id}/delete" method="POST">
                                             <button class="comment-delete-button"></button>
                                          </form>

                           </div>



                         </div>



                    `


                )

            }
            else
            {
                     $(x.toString()).append(

                    `
                         <div class="posttwo-comment">
                             <div class="others-comment-photo"><div class="my-comment-photo "></div></div>
                             <div class="whole-comment"><div class="author-name">${data["author"]}</div><div class="comment-text">${data["text"]}</div></div>
                              <div class="comment-delete">
                                           <form class="posttwo-comment-delete-form" action="/posttwo/comments/${data._id}/delete" method="POST">
                                             <button class="comment-delete-button"></button>
                                          </form>

                           </div>

                         </div>



                    `


                )




            }
             $("#post-selector").find(".posttwo-text").val("");

   })

})
//=======================================================================


$("#post-selector").on("submit",".postone-like-form",function(event)
{

    event.preventDefault();

    var actionurl=$(this).attr("action");
    var likedata=$(this).serialize();
    var postid=($(this).data("postid"));
    var a="#"+postid+"likepostone";
    var q=$(this).children("button");

  p= q.attr("class").toString();

 if(p!="clicked")
  {
    $(this).find("button").addClass("clicked");
     $(this).find("button").removeClass("unclicked");
  }
   if(p=="clicked")
  {
             $(this).find("button").removeClass("clicked");
          $(this).find("button").addClass("unclicked");


  }





     $originalitem=$(a.toString()).parent(".postone-counters");
    $.ajax({
            url:actionurl,
            data:likedata,
            type:"POST",
            originalitem:$originalitem,
            success:function(data)
            {
               this.originalitem.html(
                `
                       <div class="postone-like-counter" id="${data._id}likepostone">${data["likes"].length} appreciates</div>
                       <div class="postone-comment-counter">${data["comments"].length} comments</div>


                `

                )

            }


    })


})
//=============================================================================


$("#post-selector").on("submit",".posttwo-like-form",function(event)
{

    event.preventDefault();

    var actionurl=$(this).attr("action");
    var likedata=$(this).serialize();
    var postid=($(this).data("postid"));

    var b="#"+postid+"likeposttwo";
       var q=$(this).children("button");

          p= q.attr("class").toString();

         if(p!="clicked")
          {
            $(this).find("button").addClass("clicked");
             $(this).find("button").removeClass("unclicked");
          }
           if(p=="clicked")
          {
                     $(this).find("button").removeClass("clicked");
                  $(this).find("button").addClass("unclicked");


          }








     $originalitem=$(b.toString()).parent(".postone-counters");



    $.ajax({
            url:actionurl,
            data:likedata,
            type:"POST",
            originalitem:$originalitem,
            success:function(data)
            {

               this.originalitem.html(
                `
                       <div class="postone-like-counter" id="${data._id}likeposttwo">${data["likes"].length} appreciates</div>
                       <div class="postone-comment-counter">${data["comments"].length} comments</div>


                `

                )

            }


    })



})



//====================================== delete comments =======================

$("#post-selector").on("submit",".postone-comment-delete-form",function(e)
{
    e.preventDefault();

  var url=$(".postone-comment-delete-form").attr("action");
  $itemtodelete=$(this).closest(".postone-comment");
   $.ajax(
   {
        url:url,
        type:"POST",
       itemtodelete:$itemtodelete,
        success:function(data)
        {
            this.itemtodelete.remove();
        }

   })
});



$("#post-selector").on("submit",".posttwo-comment-delete-form",function(e)
{
    e.preventDefault();

  var url=$(".posttwo-comment-delete-form").attr("action");
  $itemtodelete=$(this).closest(".posttwo-comment");
   $.ajax(
   {
        url:url,
        type:"POST",
       itemtodelete:$itemtodelete,
        success:function(data)
        {
            this.itemtodelete.remove();
        }

   })
});







