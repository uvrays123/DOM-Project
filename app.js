/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var player1_score, player2_score, current1_score, current2_score, activePlayer, diceRoll;
var gamePlaying, winningScore;
winningScore = prompt("Please enter the winning score for the game", "");

function intialize() {
  player1_score = 0;
  player2_score = 0;
  current1_score = 0;
  current2_score = 0;
  activePlayer = 1;
  diceRoll = 0;
  gamePlaying = true;
  document.querySelector('.dice').style.display = "none";
  document.querySelector("#current-0").textContent = current1_score;
  document.querySelector("#current-1").textContent = current2_score;
  document.querySelector("#score-0").textContent = player1_score;
  document.getElementById("score-1").textContent = player2_score;
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
}

intialize();

document.querySelector(".btn-roll").addEventListener("click", button);
function button() {
  if(gamePlaying == true) {
    diceRoll = Math.floor(Math.random() * 6) + 1;
    console.log(diceRoll);
    document.querySelector(".dice").style.display = "block";
    document.querySelector(".dice").src = "dice-" +diceRoll+ ".jpg";
    //activeRoll(activePlayer, diceRoll);

    if(activePlayer === 1) {
      if(diceRoll != 1) {
        current1_score += diceRoll;
      }
      else {
        nextPlayer();
      }
    }
    else {
      if(diceRoll != 1) {
        current2_score += diceRoll;
      }
      else {
        nextPlayer();
      }
    }

    document.querySelector("#current-0").textContent = current1_score;
    document.getElementById("current-1").textContent = current2_score;
  }
}

function nextPlayer() {
  if(activePlayer == 1) {
    activePlayer = 2;
  }
  else {
    activePlayer = 1;
  }
  diceRoll = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  current1_score = 0;
  current2_score = 0;
  document.getElementById("current-0").textContent = current1_score;
  document.getElementById("current-1").textContent = current2_score;
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-hold").addEventListener("click", function() {
  if(gamePlaying == true){

    switch(activePlayer) {
      case 1:
        player1_score += current1_score;
        document.getElementById("score-0").textContent = player1_score;
        if(player1_score >= winningScore) {
          document.querySelector("#name-" +(activePlayer - 1)).textContent = "Winner!";
          document.querySelector(".player-"+(activePlayer - 1)+"-panel").classList.remove("active");
          document.querySelector(".player-"+(activePlayer - 1)+"-panel").classList.add("winner");
          document.querySelector(".dice").style.display = "none";
          gamePlaying = false;
        }
        else {
          //console.log("HI");
          nextPlayer();
        }
        break;

      case 2:
        player2_score += current2_score;
        document.getElementById("score-1").textContent = player2_score;
        if(player2_score >= winningScore) {
          document.querySelector("#name-" +(activePlayer - 1)).textContent = "Winner!";
          document.querySelector(".player-"+(activePlayer - 1)+"-panel").classList.remove("active");
          document.querySelector(".player-"+(activePlayer - 1)+"-panel").classList.add("winner");
          document.querySelector(".dice").style.display = "none";
          gamePlaying = false;
        }
        else {
          nextPlayer();
        }
        break;
    }
  }

});

document.querySelector(".btn-new").addEventListener("click", intialize);
