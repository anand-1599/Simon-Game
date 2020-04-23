var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var started = false;

$("body").keydown(function(event){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".start").click(function(event){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".restart").click(function(event){
  startOver();
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

var level = 0;

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
    console.log ("Success...");
    if(userClickedPattern.length === gamePattern.length ){
      setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}
  else{
    console.log("Wrong!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }


}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level+=1;
  $("h1").text("Level " + level) ;

}

function playSound(name){

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function(){
  $("." + currentColour).removeClass("pressed");

}, 100);
}
