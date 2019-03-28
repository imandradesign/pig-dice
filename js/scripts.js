// Business logic
function Player() {
  this.score = 0;
}

Player.prototype.rollDice = function() {
  var rollScore = Math.floor(Math.random() * 6);
  console.log(rollScore);
  if (rollScore === 1) {
    rollScore = 0;
    }
  return rollScore;
}

/* Player.prototype.scoreCheck = function() {
  var newRoll = this.rollDice();
  if newRoll === 0 {

  }
} */



var newPlayer = new Player();

var compPlayer = new Player();

$(document).ready(function(){

  $('#player-score').text(newPlayer.score);
  $('#comp-score').text(compPlayer.score);
});
