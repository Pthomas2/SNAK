class snake {
    constructor() {
    this.location_ = 0;
    this.direction_ = "forward";
  }
  hiss() {
    console.log("The snake goes hisss....");
  }
  location(){
    this.snake.location_
  }
  move(n){
    if (this.direction_ == "forward"){
      this.location_ = this.location_ + n;
    }
    else  this.location_ = this.location_ - n;
  }
  turn(){
    if(this.direction_ == "forward"){
      this.direction_ = "back";
    }
    else this.direction_ = "forward";
  }
}
redNblackSnake = new snake();
redNblackSnake.hiss();
redNblackSnake.move(4);
redNblackSnake.turn();
redNblackSnake.move(15);
console.log(redNblackSnake);