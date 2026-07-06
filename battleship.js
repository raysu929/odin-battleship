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