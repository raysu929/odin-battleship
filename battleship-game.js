import { Ship, Gameboard, Player} from "./battleship.js";

const player1 = new Player("real");
const player2 = new Player("computer");
const ship1 = new Ship(3);
const ship2 = new Ship(2);
player1.gameboard.placeShip(ship1, 5, 2, "horizontal");
player2.gameboard.placeShip(ship2, 3, 1, "vertical");


const player = document.querySelector(".player");
const opponent = document.querySelector(".opponent");

function renderBoard(gameboard, container, clickable) {
  gameboard.board.forEach((row, rowIndex) => {
    row.forEach((square, colIndex) => {
 const cell = document.createElement("div");
 cell.classList.add("cell");
 if(clickable){
   cell.addEventListener("click", () => {
    const hit = gameboard.receiveAttack(rowIndex, colIndex);
    if(hit){
     cell.style.backgroundColor = "red";
    }else{
      cell.style.backgroundColor = "blue";
    }
   });
 }
 container.appendChild(cell);
    })
     });
    
  }

renderBoard(player1.gameboard, player, false);
renderBoard(player2.gameboard, opponent, true);
