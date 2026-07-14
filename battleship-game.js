import { Ship, Gameboard, Player } from "./battleship.js";

const player1 = new Player("real");
const player2 = new Player("computer");
const ship1 = new Ship(3);
const ship2 = new Ship(2);
const ship3 = new Ship(4);
const ship4 = new Ship(1)
const ships = [ship1, ship2, ship3, ship4];
player1.gameboard.placeShip(ship1, 5, 2, "horizontal");
player2.gameboard.placeShip(ship2, 3, 1, "vertical");

const player = document.querySelector(".player");
const opponent = document.querySelector(".opponent");
let currentPlayer = player1;
let gameEnded = false;

function renderBoard(gameboard, container, clickable) {
  container.innerHTML = "";
  gameboard.board.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      const wasHit = gameboard.hits.some((hit) => {
        return hit[0] === rowIndex && hit[1] === colIndex;
      });
      const wasMissed = gameboard.missed.some((miss) => {
        return miss[0] === rowIndex && miss[1] === colIndex;
      });
      
          if (square !== null && clickable === false) {
            cell.style.backgroundColor = "grey";
          }
      if (wasHit) {
        cell.style.backgroundColor = "red";
      } else if (wasMissed) {
        cell.style.backgroundColor = "blue";
      }
      if (clickable) {
        cell.addEventListener("click", () => {
          if (gameEnded) {
            return;
          }
          const alreadyAttacked = wasHit || wasMissed;

          if (alreadyAttacked) {
            return;
          } 
           const hit = gameboard.receiveAttack(rowIndex, colIndex);
          if(hit){
            renderGame();
           if (gameOver()) {
            gameEnded = true;
             return;
           }
          }else if (!hit) {
            switchPlayer();
          }
          if(currentPlayer === player2){
            computer();
          }
          
        });
      }
      container.appendChild(cell);
    });
  });
}
function renderGame() {
  renderBoard(player1.gameboard, player, false);
  renderBoard(player2.gameboard, opponent, true);
}

function switchPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else if (currentPlayer === player2) {
    currentPlayer = player1;
  }
}
renderGame();

function computer(){
  if(gameEnded){
    return;
  }
  const randomRow = Math.floor(Math.random() * player1.gameboard.board.length);
  const randomCol = Math.floor(
    Math.random() * player1.gameboard.board[randomRow].length,
  );

      const wasHit = player1.gameboard.hits.some((hit) => {
        return hit[0] === randomRow && hit[1] === randomCol;
      });
      const wasMissed = player1.gameboard.missed.some((miss) => {
        return miss[0] === randomRow && miss[1] === randomCol;
      });
      const alreadyAttacked = wasHit || wasMissed;

  if(alreadyAttacked){
computer();
return;
  }
const hit = player1.gameboard.receiveAttack(randomRow, randomCol);
if(hit){
  renderGame();
    if (gameOver()) {
      gameEnded = true;
      return;
    }
      computer();
}else if (!hit){
switchPlayer();
renderGame();
}
  }

  function gameOver(){
    const winner = document.getElementById("winner");
    if(player1.gameboard.ships.every(ship => ship.isSunk())){
      winner.innerText = "Computer Wins!";
      return true;
    }
    if(player2.gameboard.ships.every(ship => ship.isSunk())){
      winner.innerText = "Player Wins!"; 
      return true;
    }
    return false;
    }
  
const random = document.getElementById("random");
function placeRandom(){
random.addEventListener("click", () => {
  player.innerHTML = "";
  player1.gameboard.board = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
  ];
  player1.gameboard.ships = [];
    player1.gameboard.hits = [];
  player1.gameboard.missed = [];


  ships.forEach((ship) => {
   let placed = false;
    while(!placed){
      const randomRow = Math.floor(
        Math.random() * player1.gameboard.board.length,
      );
      const randomCol = Math.floor(
        Math.random() * player1.gameboard.board[randomRow].length,
      );
      const directions = ["horizontal", "vertical"];
      const randomDirection =
        directions[Math.floor(Math.random() * directions.length)];
      
placed = player1.gameboard.placeShip(ship, randomRow, randomCol, randomDirection);
    }
  });
 renderGame();
})
}
    
placeRandom();

// Future me todo:
// Add board labels a-h, 0-7
//replace computer move with loop
//make computer and ship have different ship objects
//stop gameplay after ships sunk
//add finishing touches if i visit this project