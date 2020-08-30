// At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

// Create a new array called buttonColors and set it to hold the sequence.
var buttonColors = ["red", "blue", "green", "yellow"];

// At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

// Boolean flag
var gameStarted = false;

// Create a new variable called level and start at level 0.
var level = 0;

//Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).on("keypress", function() {
  if(!gameStarted){
    $("h1").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
})

//Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  //Play sounds and animate
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);

});

// create a new function called nextSequence()
function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  // Inside nextSequence(), update the h1 with this change in the value of level.
  $("h1").text("Level " + level);

  // inside the function generate a random sequence between 0 and 3.
  var randomNumber = Math.floor(Math.random() * 4);

  // Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColors[randomNumber];

  // Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // Use jQuery to select the button with the same id as the randomChosenColour and animate.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sounds
  playSound(randomChosenColour);
}

// Create a new function called playSound()
//  that takes a single input parameter called name
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
// Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else {
    var audio = new Audio("sounds/boo.mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 500);

    $("h1").text("WOOO WOO Retard Alert, you fucking retard! Press any key to continue");

    startOver();
  }
}

// Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
