$(document).ready(function(){

  $(".tags").hide();

  $(".start-div").click(function() {
    start();
    $(".tags").show();
    $(".lives").html("<h3>Lives:</h3>" + livesLeft);
    $(this).remove();
  })
})
