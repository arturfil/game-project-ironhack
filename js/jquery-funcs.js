$(document).ready(function(){

  $(".tags").hide();
  $(".loose-div").hide();

  $(".start-div").click(function() {
    start();
    $(".tags").show();
    $(".lives").html("Lives :" + livesLeft);
    $(this).remove();
  });

  $(".loose-div").click(function() {
    start();
    $(".tags").show();
    $(".lives").html("Lives :" + livesLeft);
    $(this).remove();
  });
});
