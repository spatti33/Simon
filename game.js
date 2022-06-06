var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).on("keypress", function () {
    if (!started) {
        $('h1').text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").on("click", function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound (userChosenColor);
    animatePress (userChosenColor);
    var lastIndex = (userClickedPattern.length) - 1;
    checkAnswer(lastIndex);
});

function nextSequence () {
    userClickedPattern = [];
    level++;
    $('h1').text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound (randomChosenColor);
}

function playSound (name) {
    var audio = new Audio ("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress (currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout (function () {
            $("body").removeClass("game-over");
        }, 200);
        $('h1').text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}