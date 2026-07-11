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
createBoard(opponent)