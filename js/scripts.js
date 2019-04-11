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
    this.tempScore = 0;
    }

  return rollScore;
}


Player.prototype.turnCompScore = function() {
  this.tempScore = 0;
  this.compScore();
  this.score += this.tempScore;
  return this.score;
}


Player.prototype.compScore = function() {
  var newRoll = this.rollDice();

  console.log('current roll is: ' + newRoll);

  if (newRoll === 0) {
    return this.tempScore = 0;
    $('#comp-score').text(this.tempScore)
  } else if (this.tempScore < 10) {
    this.tempScore += newRoll;
    console.log('turntotal = ' + this.tempScore);
    this.compScore();
  } else {
    return this.tempScore;
    $('#comp-score').text(this.tempScore);
  }

  console.log('finaltotal = ' + this.tempScore);
}



$(document).ready(function(){

  $('#player-score').text(newPlayer.score);
  $('#comp-score').text(compPlayer.score);

  $("#roll-btn").click(function(event){
    event.preventDefault();

    var playerRoll = newPlayer.rollDice();
    if (playerRoll === 0) {
      $('#score').text("You rolled a zero! The computer has rolled.")
      compPlayer.turnCompScore();
    } else {
      newPlayer.tempScore += playerRoll;
      $('#score').text(newPlayer.tempScore);
      console.log('Player score is: ' + playerRoll)
    }
  });

  $("hold-btn").click(function(event){

  });
});
