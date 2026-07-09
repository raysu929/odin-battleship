class Ship{
  constructor(length){
this.length = length;
this.hit = 0;
this.sunk = false;
  }
  hit(){
this.hit++
  }
  isSunk(){
    if(this.hit >= this.length){
       return true;
    }else{
      return false;
    }
  }
}
class Gameboard{
  constructor(){
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
  }
  placeShip(ship, row, col, direction){
if(direction === "horizontal"){

for (let i = 0; i < ship.length; i++) {
this.board[row][col + i] = ship;
}

}else if(direction === "vertical"){

for (let i = 0; i < ship.length; i++) {
  this.board[row + i][col] = ship;
}
}else{
  throw new Error("Invalid");
}

  }receiveAttack(row, col){
if(this.board[row][col]){
  this.board[row][col].hit();
}else{
  this.missed.push([row][col]);
}
  }
}


