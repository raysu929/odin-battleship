import { Ship, Gameboard, Player } from "./battleship.js";

const player1 = new Player("real");
const player2 = new Player("computer");
const ship1 = new Ship(3);
const ship2 = new Ship(2);
player1.gameboard.placeShip(ship1, 5, 2, "horizontal");
player2.gameboard.placeShip(ship2, 3, 1, "vertical");

const player = document.querySelector(".player");
const opponent = document.querySelector(".opponent");
let currentPlayer = player1;

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
      if (wasHit) {
        cell.style.backgroundColor = "red";
      } else if (wasMissed) {
        cell.style.backgroundColor = "blue";
      }
      if (clickable) {
        cell.addEventListener("click", () => {
          if(currentPlayer !== player1){
            return;
          }
          const alreadyAttacked = wasHit || wasMissed;

          if (alreadyAttacked) {
            return;
          } 
           const hit = gameboard.receiveAttack(rowIndex, colIndex);
          if(hit){
            renderGame();
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
  computer();
}else if (!hit){
switchPlayer();
renderGame();
}
  }
