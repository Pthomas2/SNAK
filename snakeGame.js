class Point {
  constructor(x,y){
    this.x_ = x;
    this.y_ = y;
  };
  get x(){
    return this.x_;
  };
  get y(){
    return this.y_;
  };
  equals(p){
    if((p.x == this.x)&&(p.y == this.y)){
      return true;
    }
    else return false;
  }
};

class Snake {
    constructor(s) {
    this.direction_ = "right";
    this.startPosition_ = new Point(2,0);
    this.size_ = s;
    this.parts_ = [this.startPosition_];
    let x = this.size_ - 1;
    for(i=1; i < x; i++){
    this.parts_.push(new Point(2,i));
  };    
};

  hiss() {
    console.log("The snake goes hisss....");
  };
  get location(){
    return this.parts_[0]; 
  };
  get direction(){
    return this.direction_; 
  };
  move(steps){
    for(x = this.parts_.length - 1; x > 0; x - 1){
      this.parts_[x-1] = this.parts_[x];
    };
    if (this.direction_ == "right"){
      this.parts_[0] = new Point(this.parts_[0].x + steps, this.parts_[0].y);
    }    
    else if(this.direction_ == "left"){
      this.parts_[0] = new Point(this.parts_[0].x - steps, this.parts_[0].y);
    }
    else if(this.direction_ == "up"){
      this.parts_[0] = new Point(this.parts_[0].x, this.parts_[0].y - steps);
    }
    else {
      this.parts_[0] = new Point(this.parts_[0].x, this.parts_[0].y + steps);
    };
  };
  didCollide(s){
    if(this.parts_[0].equals(s.parts_[0])){
      return true;
    };
    if(this.parts_[0].equals(this.parts_.slice(1))){
      return true;
    };
  };
  turnRight(){
      if(this.direction_ == "up"){
          this.direction_ = "right";
      }
      else if(this.direction_ == "right"){
          this.direction_ = "down";
      }
      else if(this.direction_ == "down"){
          this.direction_ = "left";
      }
      else{
          this.direction_ = "up";
      };
    };
    turnLeft(){
      if(this.direction_ == "up"){
          this.direction_ = "left";
      }
      else if(this.direction_ == "right"){
          this.direction_ = "up";
      }
      else if(this.direction_ == "down"){
          this.direction_ = "right";
      }
      else {
          this.direction_ = "down";
      }
    };
};

class WorldModel {
  constructor(h,w){
    this.width_ = w;
    this.height_= h;
    this.snakes_ = [];
    this.views_ = [];
    this.view_ = null;
  };
  addSnake(s){
    this.snakes_ = this.snakes_ + [s];
  };
  addView(v){
    this.views_.push(v);
  };
  update(steps){
    while(i < this.snakes_.length){
    this.snakes_[i].move(steps);
    i++
    };
    while(i < this.views_.length){
    this.views_[i].display(this);
    i++
    };
  };
  get snakes(){
    return this.snakes_;
  };
  get width(){
    return this.width_;
  };
  get height(){
    return this.height_;
  };
};

class SnakeController{
  constructor(world, snake){
    this.snakeWorld_ = world;
    this.slithereer_ = snake;
  };
  get worldWidth(){
    return this.snakeWorld_.width;
  };
  get worldHeight(){
    return this.snakeWorld_.height;
  };
  get snakePosition(){
    return this.slitherer.location;
  };
  turnSnakeLeft(){
    this.slithereer_.turnLeft();
  };
  turnSnakeRight(){
    this.slithereer_.turnRight();
  };
  get snakeDirection(){
    return this.slitherer.direction;
  };
};
class Player {
  constructor(snakeControls){
    this.sc_ = snakeControls;
    if(this.constructor === Player) throw new Error("Cannot instantiate a Player, which is an abstract base class"); 
    else if(!(this.turnSnakeLeft instanceof Function)) throw new Error("Base class must implement turn left method");
  };
};
class  AvoidsWallPlayer extends Player {
  constructor(){
    super(snakeControls);
  };
  makeTurn(){
    if ((sc_.direction == "left")&&(sc_.snakePosition.x == 0)&&(sc_.snakePosition.y >= ((sc_.worldHeight)/2))) {
      sc_.turnSnakeLeft()
    }
    else if((sc_.direction == "left")&&(sc_.snakePosition.x == 0)&&(sc_.snakePosition.y <= ((sc_.worldHeight)/2))) {
      sc_.turnSnakeRight()
    }
    else if ((sc_.direction == "right")&&(sc_.snakePosition.x == sc_.worldWidth-1)&&(sc_.snakePosition.y <= ((sc_.worldHeight)/2))) {
      sc_.turnSnakeLeft()
    }
    else if ((sc_.direction == "right")&&(sc_.snakePosition.x == sc_.worldWidth-1)&&(sc_.snakePosition.y <= ((sc_.worldHeight)/2))) {
      sc_.turnSnakeRight()
    }
    else if ((sc_.direction == "up")&&(sc_.snakePosition.y == 0)&&(sc_.snakePosition.x >= ((sc_.worldWidth)/2))) {
      sc_.turnSnakeLeft()
    }
    else if ((sc_.direction == "up")&&(sc_.snakePosition.y == 0)&&(sc_.snakePosition.x <= ((sc_.worldWidth)/2))) {
      sc_.turnSnakeRight()
    }
    else if ((sc_.direction == "down")&&(sc_.snakePosition.y == sc_.worldHeight-1)&&(sc_.snakePosition.x <= ((sc_.worldWidth)/2))) {
      sc_.turnSnakeLeftt()
    }
    else {
      sc_.turnSnakeRight()
    };
  };
};
class View {
  constructor(){
    if(this.constructor === View) throw new Error("Cannot instantiate a View, which is an abstract base class"); 
    else if(!(this.display instanceof Function)) throw new Error("Base class must implement display method"); 
  };
};
class CanvasView extends View{
  constructor(sF){
    super();
    this.sf_ = sF;
    this.canvas_ = document.createElement("canvas");
    document.body.appendChild(this.canvas_);
    this.context_ = this.canvas_.getContext("2d");
  };
  display(world){
    this.canvas_.height = (world.worldHeight*this.sf_);
    this.canvas_.width = (world.worldWidth*this.sf_);
    this.context_.fillStyle = 'ff0000';
    this.context_.fillRect(5, 10, 50, 20);
  };
};
class InputHandler {
  constructor(){
  if(!(this.madeLeftMove instanceof Function)) throw new Error("Base class must implement made left move method"); 
  if(!(this.madeRightMove instanceof Function)) throw new Error("Base class must implement made Right move method");
  if(!(this.resetLeftMove instanceof Function)) throw new Error("Base class must implement Reset left move method");
  if(!(this.resetRightMove instanceof Function)) throw new Error("Base class must implement reset Right move method");
  };
};

class LRKeyInputHandler extends InputHandler{
  constructor(){
    super();
    this.wasLeftArrowPushed_ = false;
    this.wasRightArrowPushed_ = false;
    let arrowPush = event => {
      if (event.keycode == 37){this.wasLeftArrowPushed_ = !(this.wasLeftArrowPushed_)}
      if (event.keycode == 39){this.wasRightArrowPushed_ = !(this.wasRightArrowPushed_)}
    };
    window.addEventListener("keydown", arrowPush);
  };
  

  madeLeftMove(){
    return this.wasLeftArrowPushed_;
  };
  madeRightMove(){
    return this.wasRightArrowPushed_;
  };
  resetLeftMove(){
    return this.wasLeftArrowPushed_ = false;
  };
  resetRightMove(){
    return this.wasRightArrowPushed_ = false;
  };

};
class HumanPlayer extends Player {
  constructor(con, hand){
    super();
    this.hand_ = hand;
    this.control_ = con;
  };
  makeTurn(){
    if(hand.madeLeftmove()){
      con.turnSnakeLeft();
      hand.resetLeftMove();
    };
    if(hand.madeRightMove()){
      con.turnSnakeRight();
      hand.resetRightMove();
    };
  };
};

class GameController {
  constructor(world){
    this.world_ = world;
    this.player1_ = null;
    this.player2_ = null;
    this.lastTime = 0;
  }
  set player1(e) {
    if (e instanceof Player){
    this.player1_ = e;
    }
  }
  set player2(e) {
    if (e instanceof Player){
    this.player2_ = e;
    }
  }
  run(){
    let lastTime = 0;
  let updateFrame =  => {
    player1_.makeTurn();
    player2_.makeTurn();
    if ((lastTime - milliseconds) > 250){
      this.lastTime = this.lastTime + 250;
      this.world_.update(1); 
      }
      requestAnimationFrame(updateFrame);
    }
    requestAnimationFrame(updateFrame);
  }
};