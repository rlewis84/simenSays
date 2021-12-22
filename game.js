//////////////////Global Variables//////////////////////////////
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;


$(document).keydown(function()
{
  if(!gameStarted)
  {
    $("#level-title").text("Level:" + level);
    nextSequence();
    gameStarted = true;
  }

});

///////////////Do stuff on button click//////////////////////
$(".btn").click(function(e)
{
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length -1);


});

///////////////Not exactly sure yet//////////////////////
function nextSequence()
{
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level:" + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

///////////////Play that 90s music whiteboy//////////////////
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
///////////////Play that 90s music whiteboy//////////////////
function playSound(name)
{
  var mySounds = new Audio("sounds/" + name + ".mp3");
  mySounds.play();
}

///////////////Make buttons look cool when pressed/////////////////
function animatePress(currentColor)
{
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
