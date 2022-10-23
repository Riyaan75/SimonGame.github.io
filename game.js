var buttonColours =["red","green","blue","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function(){
if(!started){
    $("#level-title").text("level  "+ level);
    nextSequence();
    started=true;
}
});

$(".btn").click(function(){
var userChosenColour =$(this).attr("id");
userClickedPattern.push(userChosenColour);
checkAnswer(userClickedPattern.length-1);
playsound(userChosenColour);
animatePress(userChosenColour);


});

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function () {
            nextSequence();
          }, 1000);
    }
}
else{
    playsound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
}
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);

}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}



function playsound(currentColour){
    var audio = new Audio("sounds/"+currentColour+".mp3");
    audio.play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }