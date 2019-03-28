// Business logic
var newPlayer = new Player();
var compPlayer = new Player();

function Player() {
  this.score = 0;
  this.tempScore = 0;
}

Player.prototype.rollDice = function() {
  var rollScore = Math.floor(Math.random() * 6);
  // console.log(rollScore);
  if (rollScore === 1) {
    rollScore = 0;
    }
  return rollScore;
}

// Computer business logic
Player.prototype.turnCompScore = function() {
  this.tempScore = 0;
  this.compScore();
  this.score += this.tempScore;
}

Player.prototype.compScore = function() {
  var newRoll = this.rollDice();
  console.log('current roll is ' + newRoll);
  if (newRoll === 0) {
    return this.tempScore = 0;
  } if (this.tempScore < 12) {
    this.tempScore += newRoll;
    console.log('turntotal = ' + this.tempScore);
    this.compScore();
  } else {
    console.log('turntotal = ' + this.tempScore);
    return this.tempScore;
  }
  console.log('finaltotal = ' + this.tempScore);
}



$(document).ready(function(){

  $('#player-score').text(newPlayer.score);
  $('#comp-score').text(compPlayer.score);

  $("sub-btn").click(function(event){
    var playerRoll = newPlayer.rollDice();
    if (playerRoll === 0) {
      compPlayer.turnCompScore();
    }
  });

  $("hold-btn").click(function(event){

  });
});
