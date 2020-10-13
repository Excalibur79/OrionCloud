$('.down').click(function() {
    if(($(".fadein").css("display"))=="none")
    {

          $('.down').animate(
            { deg: 180 },
            {
              duration: 800,
              step: function(now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });

              }
            }
          );
        $(".fadein").fadeIn();
    }
    else
    {
         $('.down').animate(
            { deg: 0 },
            {
              duration: 800,
              step: function(now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });

              }
            }
          );
        $(".fadein").fadeOut();
    }

});

$("#post-selector").on("click",".comment-image",function()
{
    var x= $(this).parent().parent().parent().find(".postone-comment");
    if( x.css("display")=="flex")
    {
         $(this).parent().parent().parent().find(".postone-comment").css("display","none");
    }
     else if( x.css("display")=="none")
    {
         $(this).parent().parent().parent().find(".postone-comment").css("display","flex");
    }

})


$("#post-selector").on("click",".comment-image",function()
{
    var x= $(this).parent().parent().parent().find(".posttwo-comment");
    if( x.css("display")=="flex")
    {
         $(this).parent().parent().parent().find(".posttwo-comment").css("display","none");
    }
     else if( x.css("display")=="none")
    {
         $(this).parent().parent().parent().find(".posttwo-comment").css("display","flex");
    }

})





/*$("#post-selector").on("click","#profile-file-upload",function(e)
{

    var x=$("#profile-image").val();



})*/
$("#profile-image").change(function()
{
     var x=$("#profile-image").val();
     if(x=="")
     {
        $("#profile-file-upload").text("Profile Photo");
     }
     else
     {
        $("#profile-file-upload").html("<strong>Selected</strong>");
     }
})

$("#image").change(function()
{
     var y=$("#image").val();
     if(y=="")
     {
        $(".custom-file-upload").text("Select Image");
     }
     else
     {
        $(".custom-file-upload").html("Selected");
     }
})

