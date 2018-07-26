// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var width = 790;
var height = 400;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);

var score =0;
var labelScore;
var player;
var pipes = [];
var enemy = [];
var enemy2 = [];
var gameSpeed = 100;
var splashDisplay;
function preload() {

 game.load.image("playerImg", "./assets/Mario.png");
 game.load.audio("score", "./assets/point.ogg");
 game.load.image("pipeBlock", "./assets/pipe_mint.png");
  // game.load.image("bg", "../assets/myBackground.jpg");
   game.load.image("bg", "../assets/background.png");
   game.load.image("bg-win", "../assets/background-win.png");
   game.load.image("enemy", "../assets/bowser.jpg");
   game.load.image("enemy2", "../assets/barrel.png");
}
/*
 * Initialises the game. This function is only called once.
 */
function create() {
  //var background = game.add.image(0,0,"bg");


  var backgroungVelocity = gameSpeed / 10;
var backgroundSprite = game.add.tileSprite(0, 0, width, height, "bg");
backgroundSprite.autoScroll(-backgroungVelocity, 0);
//    game.stage.setBackgroundColor("#ff0066");
    game.add.text(70, 20, "0", {font: "30px Arial", fill: "#FFFFFF"});

    game.input.onDown.add(clickHandler);
    player = game.add.sprite(100, 200, "playerImg");
    player.width=50;
    player.height=50;
    player.x = 100;
    player.y = 100;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);
    labelScore = game.add.text(20,20, "0", {font: "30px Arial", fill: "#FFFFFF"});
    changeScore();
    changeScore();
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);
    game.input.keyboard.addKey(Phaser.Keyboard.D)
    .onDown.add(moveTopRight);
    generatePipe();
    game.input.keyboard.addKey(Phaser.Keyboard.G)
    .onDown.add(addPoints);
    game.input.keyboard.addKey(Phaser.Keyboard.S)
    .onDown.add(moveTopLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.C)
    .onDown.add(moveBottomRight);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(changeScore)
    player.body.velocity.x = 0;


 game.input.keyboard
.addKey(Phaser.Keyboard.ENTER)
.onDown.add(start);

splashDisplay = game.add.text(100,200, "Press ENTER to start, SPACEBAR to jump",{font: "30px Arial", fill: "#FFFFFF"});
}

function start(){
  game.input.keyboard
.addKey(Phaser.Keyboard.SPACEBAR)
.onDown.add(playerJump);
   player.body.gravity.y = 100;
   var pipeInterval = 3.00 * Phaser.Timer.SECOND;
  game.time.events.loop(
  pipeInterval,
  generate
  );
   splashDisplay.destroy();
   game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);
}
/*
 * This function updates the scene. It is called for every new frame
 */
function update(){
  game.physics.arcade.overlap(
  player,
  pipes,
  gameOver);

  game.physics.arcade.overlap(
  player,
  enemy,
  gameOver);

  game.physics.arcade.overlap(
  player,
  enemy2,
  gameOver);

  if (score > 5) {player.body.volocity = 2}
  if (player.y > 400) {game.state.restart();}
  if (player.y < 0) {game.state.restart();}
  if (score > 3141592) {win();}
  }

  function gameOver(){
  location.reload();
  }
  function  win(){
    game.add.tileSprite(0, 0, "bg-win");
  //location.reload();
  }

function clickHandler(event) {
//game.add.sprite(event.x, event.y, "playerImg");
alert("The position is: " + event.x + "," + event.y);

}

function spaceHandler() {
  game.sound.play("score");
}

function changeScore() {
  score = score + 80073;
  labelScore.setText(score.toString());
}
function moveRight() {
player.x = player.x + 35;
}
function moveLeft(){
  player.x = player.x - 35;
}
function moveUp() {
player.y = player.y - 35;
}

function moveDown() {
player.y = player.y + 35;
}

function moveTopRight() {
player.x = player.x + 35;
player.y = player.y - 35;
}

function moveTopLeft() {
player.x = player.x - 35;
player.y = player.y - 35;
}

function moveBottomRight(){
player.x = player.x + 35;
player.y = player.y + 35;
}

function addPoints(){
score = score + 8000;
}



function generatePipe() {
// calculate a random position for the gap
var gap = game.rnd.integerInRange(1 ,5);
// generate the pipes, except where the gap should be
for (var count=0; count<8; count++) {
if (count != gap && count != gap+1) {
addPipeBlock(760, count*50);
}
}
}


function addPipeBlock(x, y) {
var pipeBlock = game.add.sprite(x,y,"pipeBlock");
pipes.push(pipeBlock);
game.physics.arcade.enable(pipeBlock);
pipeBlock.body.velocity.x = -100;
}

function playerJump() {
player.body.velocity.y = -150;
}

function generateEnemy(){
var bonus = game.add.sprite(790, 400, "enemy");
bonus.width = 100;
bonus.height = 100;
enemy.push(bonus);
game.physics.arcade.enable(bonus);
bonus.body.velocity.x = -200;
bonus.body.velocity.y =  -game.rnd.integerInRange(60, 100);
}

function generateEnemy2(){
var bonus = game.add.sprite(790, 0, "enemy2");
bonus.width = 60;
bonus.height = 60;
enemy.push(bonus);
game.physics.arcade.enable(bonus);
bonus.body.velocity.x = -200;
bonus.body.velocity.y =  game.rnd.integerInRange(60, 100);
}


function generate() {
var diceRoll = game.rnd.integerInRange(1, 3);
if(diceRoll==1) {
generateEnemy();
} else if(diceRoll==2) {
generateEnemy2();
} else {
generatePipe();
}
}
