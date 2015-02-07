//set the base coordinates for the enemy
var ENEMY_X_COORDINATES = [-150];
var ENEMY_Y_COORDINATES = [70, 160, 250];
var ENEMY_SPEEDS = [200, 300, 400];

//image size for bugs
var ENEMY_IMAGE_WIDTH = 100;
var ENEMY_IMAGE_HEIGHT = 150;

//set the base coordinates for the player
var PLAYER_ORIGINAL_X = 220;
var PLAYER_ORIGINAL_Y = 350;

//image size for player
var PLAYER_IMAGE_WIDTH = 80;
var PLAYER_IMAGE_HEIGHT = 150;

var MOVE_STEP = 50;

// Enemies our player must avoid
var Enemy = function() {
     this.setCoordinates();
     this.sprite = 'images/enemy-bug.png';
};

//grabs random values from corresponding arrays defined above
Enemy.prototype.setCoordinates = function() {
    this.x = ENEMY_X_COORDINATES[Math.floor(Math.random()*ENEMY_X_COORDINATES.length)];
    this.y = ENEMY_Y_COORDINATES[Math.floor(Math.random()*ENEMY_Y_COORDINATES.length)];
    this.speed = ENEMY_SPEEDS[Math.floor(Math.random()*ENEMY_SPEEDS.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
      //when moving off the screen, trigger coordinates reset.  canvas width set up at 505, thus comparing x-coordinate to 505
      if (this.x > 505) {
        this.setCoordinates();
      };
 };

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, ENEMY_IMAGE_WIDTH, ENEMY_IMAGE_HEIGHT);
};

var allEnemies = [new Enemy(), new Enemy(), new Enemy()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

//defines image to be used for a player and sets to default coordinates
var Player = function() {
    this.setPlayerCoordinates();
    this.sprite = 'images/char-boy.png';
};

//player coordinates
Player.prototype.setPlayerCoordinates = function() {
  this.x = PLAYER_ORIGINAL_X;
  this.y = PLAYER_ORIGINAL_Y;
};

// Update the player position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
    this.checkCollisions();
};

//draw player
Player.prototype.render = function(){
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y,PLAYER_IMAGE_WIDTH,PLAYER_IMAGE_HEIGHT);
};

//catch key press and make sure player doesn't fall off the screen by
//checking x/y coordinates
Player.prototype.handleInput = function(key) {
    if (key == 'left' && this.x > 48) {
        this.x -= MOVE_STEP;
    }else if (key == 'right' && this.x < 400) {
        this.x += MOVE_STEP;
    }else if (key == 'up' &&  this.y > 48) {
        this.y -= MOVE_STEP;
    }else if (key == 'down' && this.y < 400) {
        this.y += MOVE_STEP;
    }
};

var player = new Player();

Player.prototype.checkCollisions = function() {
    //water is reached, reset
    if (this.y < 40) {
        player.setPlayerCoordinates();
    }
    //in the danger zone
    if (this.y >= 50 && this.y <= 300) {
         allEnemies.forEach(function(enemy) {
            if (player.x < enemy.x + 80 && player.x + 80> enemy.x &&
                player.y < enemy.y + 50 && player.y + 50 > enemy.y ){
                     player.setPlayerCoordinates();
            }
        });
    }
};

//Disable arrow keys from scrolling window in game.
document.addEventListener("keydown", function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


