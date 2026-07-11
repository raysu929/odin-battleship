import { Ship, Gameboard, Player} from "./battleship.js";

const player = document.querySelector(".player");
const opponent = document.querySelector(".opponent");

function createBoard(board){
for (let i = 0; i < 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  board.appendChild(cell);
}
}

createBoard(player);
createBoard(opponent);

const player1 = new Player("real");
const player2 = new Player("computer");
const ship1 = new Ship(3);
const ship2 = new Ship(2);
player1.gameboard.placeShip(ship1, 5, 2, "horizontal");
player2.gameboard.placeShip(ship2, 3, 1, "vertical");

