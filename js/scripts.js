// Business logic
function Player() {
  this.score = 0;
}

Player.prototype.rollDice = function() {
  var rollScore = Math.floor(Math.random() * 6);
  // console.log(rollScore);
  return rollScore;
}





var newPlayer = new Player();


$(document).ready(function(){

});
