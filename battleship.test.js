import { Ship, Gameboard } from "./battleship";
 
let board;
let ship;

beforeEach(() => {
  board = new Gameboard();
  ship = new Ship(3);
  board.placeShip(ship, 5, 2, "horizontal");
});

test("place ship horizontally", () => {
  expect(board.board[5][2]).toBe(ship);
    expect(board.board[5][3]).toBe(ship);
  expect(board.board[5][4]).toBe(ship);

})

test("place ship vertically", () => {
  board.placeShip(ship, 5, 2, "vertical");
  expect(board.board[5][2]).toBe(ship);
  expect(board.board[6][2]).toBe(ship);
  expect(board.board[7][2]).toBe(ship);
});

test("receive Attack to hit ship", () => {
  board.receiveAttack(5, 2);
  expect(ship.hits).toBe(1);
});


test("receive Attack to miss ship", () => {
  board.receiveAttack(2, 1);
  expect(board.missed).toEqual([[2, 1]])
});

