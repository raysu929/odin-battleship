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
      const wasMissed = gameboard.missed.some((hit) => {
        return hit[0] === rowIndex && hit[1] === colIndex;
      })
if(wasHit){
cell.style.backgroundColor = "red";
}else if(wasMissed){
  cell.style.backgroundColor = "blue";
}
      if (clickable) {
        cell.addEventListener("click", () => {
        gameboard.receiveAttack(rowIndex, colIndex);
        switchPlayer();
renderGame();
        });
        
      }
          container.appendChild(cell);
    });
  });
}
function renderGame(){
renderBoard(player1.gameboard, player, false);
renderBoard(player2.gameboard, opponent, true);
}

function switchPlayer(){
  if(currentPlayer === player1){
let currentPlayer = player2
  }else if(currentPlayer === player2){
   let currentPlayer = player1
  }
}