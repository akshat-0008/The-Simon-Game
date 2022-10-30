var buttonColors =["red", "blue", "green", "yellow"];
var gamePattern = [];
var chosenPattern =[];
var started=false;
var level=0;


    $(document).on("keydown",function(){
        if(!started){
            $("#level-title").text("Level "+level);
            gameSequence();
            started=true;
        }
    })

function gameSequence(){
    chosenPattern=[];
    level++;
    $("#level-title").text("Level "+level)
    var randomNumber = Math.floor(Math.random()*4);
    randomColor=buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playTrack(randomColor);
}

$(".btn").on("click",function(){
    var chosenColor = $(this).attr('id');
    chosenPattern.push(chosenColor);
    checkAnswer(chosenPattern.length-1);
    buttonAnimation(chosenColor);
    playTrack(chosenColor);
})




function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]===chosenPattern[currentlevel]){
        if(chosenPattern.length===gamePattern.length){
            setTimeout(function(){
                gameSequence();
            }, 1000);

        }
    }
    else{
        var gameOver = new Audio("assets/sounds/wrong.mp3");
        gameOver.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press any key to restart")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $("#level-title").text("Press A Key to Start");
}

function playTrack(randomColor){
    var audio = new Audio("assets/sounds/"+randomColor+".mp3");
            audio.play();
}

function buttonAnimation(currentKey){
    $("#"+currentKey).addClass("pressed");

    setTimeout(function(){
        $("#"+currentKey).removeClass("pressed");
    }, 100)
}
