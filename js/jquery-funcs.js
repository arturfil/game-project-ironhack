$(document).ready(function(){

  $(".tags").hide();

  $(".start-div").click(function() {
    start();
    $(".tags").show();
    $(".lives").html("Lives :" + livesLeft);
    $(this).remove();
  })
})
