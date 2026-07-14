export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    if (this.hits >= this.length) {
      this.sunk = true;
    } else {
       this.sunk = false;
    }
  }
}
export class Gameboard {
  constructor() {
    this.board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
    ];
    this.ships = [];
    this.missed = [];
    this.hits = [];
  }
  placeShip(ship, row, col, direction) {
    this.ships.push(ship);
    if (direction === "horizontal") {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][col + i] = ship;
      }
    } else if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][col] = ship;
      }
    } else {
      throw new Error("Invalid");
    }
  }
  receiveAttack(row, col) {
    if (this.board[row][col]) {
      this.board[row][col].hit();
      this.hits.push([row, col]);
      this.board[row][col].isSunk();
      return true;
    } else {
      this.missed.push([row, col]);
      return false;
    }
  }
}

export class Player{
  constructor(type){
    this.type = type;
    this.gameboard = new Gameboard();
  }
}