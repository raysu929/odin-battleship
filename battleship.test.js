import { Ship, Gameboard } from "./battleship";
 
test("placeship", () => {
  
 const board = new Gameboard();
 const ship = new Ship(3);
 board.placeShip(ship, 5, 2, "horizontal");
  expect(board.board[5][2]).toBe(ship);
    expect(board.board[5][3]).toBe(ship);
  expect(board.board[5][4]).toBe(ship);

})