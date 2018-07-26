// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];

function preload() {
 game.load.image("playerImg", "../assets/mario.png");
 game.load.audio("score", "../assets/point.ogg");
 game.load.image("pipeBlock", "../assets/pipe.png");
  game.load.image("bg", "../assets/myBackground.jpg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    //game.stage.setBackgroundColor("#ff0066");

    var background = game.add.image(0,0,"bg");
    background.width = 790;
    background.height=400;
    game.add.text(70, 20, "0", {font: "3000px Helvetica,", fill: "#FFFFFF"});
    game.add.sprite(10, 270, "playerImg");
    game.input.onDown.add(clickHandler);
    player = game.add.sprite(100, 200, "playerImg");
    player.x = 0;
    player.y = 200;
    game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);
    labelScore = game.add.text(20,20, "0");
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
    game.input.keyboard.addKey(Phaser.Keyboard.S)
    .onDown.add(moveTopLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(addPoints);
    game.input.keyboard.addKey(Phaser.Keyboard.C)
    .onDown.add(moveBottomRight);
    game.input.keyboard.addKey(Phaser.Keyboard.X)
    .onDown.add(moveBottomLeft);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
     player.body.velocity.x = 1;
     player.body.gravity.y = 78;
     game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
 .onDown.add(playerJump);
 var pipeInterval = 3.00 * Phaser.Timer.SECOND;
game.time.events.loop(pipeInterval, generatePipe);
//game.time.events.loop(pipeInterval * Phaser.Timer.SECOND, generatePipe);
}

function gameOver(){
registerScore(score);
game.state.restart();
}

/*
 * This function updates the scene. It is called for every new frame
 */
function update(){
  game.physics.arcade.overlap(
  player,
  pipes,
  gameOver);
if (score > 5) {player.body.volocity = 2}
if (player.y > 400) {game.state.restart();}
if (player.y < 0) {game.state.restart();}
if (score > 4000500) {win();}
player.rotation += 1;
//player.rotation = Math.atan(player.body.velocity.y / 200);

}


function clickHandler(event) {
//game.add.sprite(event.x, event.y, "playerImg");
alert("The position is: " + event.x + "," + event.y);

}

function spaceHandler() {
  game.sound.play("score");
}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}
function moveRight() {
player.x = player.x + 35;
}
function addPoints(){
score = score + 8000;
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

function moveBottomLeft() {
player.x = player.x - 35;
player.y = player.y + 35
}

function win() {
  alert("you win");
  game.sound.play("score")
}


function generatePipe(){
var gapStart = game.rnd.integerInRange(1, 5);
for (var count=0; count<8; count=count+1) {
if(count != gapStart && count != gapStart + 1) {
game.add.sprite(200, count * 50, "pipeBlock");
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
