// Business logic
var newPlayer = new Player();
var compPlayer = new Player();

function Player() {
  this.score = 0;
  this.tempScore = 0;
}

Player.prototype.rollDice = function() {
  var rollScore = Math.floor(Math.random() * 6) + 1;
  //console.log('Roll score: ' + rollScore);
  if (rollScore === 1) {
    rollScore = 0;
    this.tempScore = 0;
    //console.log("Rolled a 1");
  }

  return rollScore;
}


Player.prototype.turnCompScore = function() {
  this.tempScore = 0;
  this.compScore();
  // Show computer's final score for the auto-roll
  $("#comp-temp-score").text(this.tempScore);
  return this.score;
}


Player.prototype.compScore = function() {
  var newRoll = this.rollDice();

  //console.log('Computer current roll is: ' + newRoll);

  if (newRoll === 0) {
    return this.tempScore = 0;
  } else if (this.score + this.tempScore > 100 || this.score + this.tempScore === 100) {
    this.score += this.tempScore;
  } else if (this.tempScore < 16 && newRoll > 0) {
    this.tempScore += newRoll;
    //console.log('Computer turntotal = ' + this.tempScore);
    this.compScore();
  } else if (this.tempScore > 15 && newRoll > 0) {
    this.score += this.tempScore;
  }

  //console.log('Computer finaltotal = ' + this.score);
}

var hideDice = function() {
  $("#one").hide();
  $("#two").hide();
  $("#three").hide();
  $("#four").hide();
  $("#five").hide();
  $("#six").hide();
}

function remove_styles(){
  $("link[href='css/comp-role.css']").remove();
}

function show_comp_roll() {
  // Get HTML head element
  var head = document.getElementsByTagName('HEAD')[0];
  // Create new link Element
  var link = document.createElement('link');
  // set the attributes for link element
  link.href = 'css/comp-role.css';
  link.rel = 'stylesheet';
  link.type = 'text/css';
  // Append link element to HTML head
  head.insertBefore(link, head.firstChild);

  // Wait 2 seconds and remove CSS stylehseet from head
  setTimeout(remove_styles, 1000);
}



$(document).ready(function(){
  // Hide the winner and loser banners to start
  $("#winner").hide();
  $("#loser").hide();

  // Display the default scores on the page for the user
  $('#player-score').text(newPlayer.score);
  $('#comp-score').text(compPlayer.score);

  // Add text row to HTML for each computer roll to show computer logic to user
  let comp_current = document.createElement('div');
  let temp_id = document.getElementById('temp-text');
  console.log(temp_id);
  comp_current.innerHTML = "<p id='comp-roll-text' style='display:none'>The computer rolled \
  <span id='comp-temp-score'></span> this turn</p>";
  temp_id.appendChild(comp_current);

  // Function for the user roll die button
  $("#roll-btn").click(function(event){
    event.preventDefault();

    var playerRoll = newPlayer.rollDice();

    // If the user rolls a 1 it clears the user temporary score and displays information letting them know their turn ended
    if (playerRoll === 0) {
      $('#score').text("You rolled a 1! The computer has rolled.");
      newPlayer.tempScore = 0;
      compPlayer.turnCompScore();
      $('#comp-score').text(compPlayer.score);
      show_comp_roll();
    } else {
      $("#score").show();
      newPlayer.tempScore += playerRoll;
      $('#score').text(newPlayer.tempScore);
    }
    // Depending on the user's current role it shows the proper die image on the page
    if (playerRoll === 0){
      $("#one").show()
      $("#two").hide();
      $("#three").hide();
      $("#four").hide();
      $("#five").hide();
      $("#six").hide();
    }

    if (playerRoll === 2){
      $("#two").show()
      $("#one").hide();
      $("#three").hide();
      $("#four").hide();
      $("#five").hide();
      $("#six").hide();
    }

    if (playerRoll === 3){
      $("#three").show()
      $("#two").hide();
      $("#one").hide();
      $("#four").hide();
      $("#five").hide();
      $("#six").hide();
    }

    if (playerRoll === 4){
      $("#four").show()
      $("#two").hide();
      $("#three").hide();
      $("#one").hide();
      $("#five").hide();
      $("#six").hide();
    }

    if (playerRoll === 5){
      $("#five").show()
      $("#two").hide();
      $("#three").hide();
      $("#four").hide();
      $("#one").hide();
      $("#six").hide();
    }

    if (playerRoll === 6){
      $("#six").show()
      $("#two").hide();
      $("#three").hide();
      $("#four").hide();
      $("#five").hide();
      $("#one").hide();
    }
    // If the user's score is over 100 it hides the game and displays a winner banner
    if (newPlayer.score >= 100){
      $("#winner").show();
      $(".game").hide();
    }
    // If the computer's score is over 100 it hides the game and displays a loser banner
    if (compPlayer.score >= 100){
      $("#loser").show();
      $(".game").hide();
    }
  });

  // Function for the user hold button
  $("#hold-btn").click(function(event){
    event.preventDefault();

    var compScoreDisplay = document.querySelector("#comp-score");

    // If the user's temporary score is more than 0 it adds that amount to their total score and resets the current roll details and images, then the computer rolls automatically
    if (newPlayer.tempScore !== 0){
      newPlayer.score += newPlayer.tempScore;
      $("#player-score").text(newPlayer.score);
      newPlayer.tempScore = 0;
      hideDice();
      $("#score").hide();
      $('#score').text(newPlayer.tempScore);
      if (newPlayer.score < 100){
        compPlayer.turnCompScore();
        $('#comp-score').text(compPlayer.score);
        show_comp_roll();
      }
    }

    if (newPlayer.score >= 100){
      $("#winner").show();
      $(".game").hide();
    }

    if (compPlayer.score >= 100){
      $("#loser").show();
      $(".game").hide();
    }
  });


  $("#reload-win").click(function(event){
    event.preventDefault();

    $("#winner").hide();
    $("#loser").hide();
    $(".game").show();
    $("#score").empty();
    hideDice();

    newPlayer.tempScore = 0;
    newPlayer.score = 0;
    compPlayer.tempScore = 0;
    compPlayer.score = 0;

    $('#player-score').text(newPlayer.score);
    $('#comp-score').text(compPlayer.score);

  });
  $("#reload-lose").click(function(event){
    event.preventDefault();

    $("#winner").hide();
    $("#loser").hide();
    $(".game").show();
    $("#score").empty();
    hideDice();

    newPlayer.tempScore = 0;
    newPlayer.score = 0;
    compPlayer.tempScore = 0;
    compPlayer.score = 0;

    $('#player-score').text(newPlayer.score);
    $('#comp-score').text(compPlayer.score);

  });
});
