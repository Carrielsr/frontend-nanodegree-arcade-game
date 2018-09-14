
 // Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};


 // Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x += this.speed * dt;
    } else {
        this.x = -5;
    }
};


 // Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


 // Our player
var Player = function(x, y) {
    // Variables applied to each of our instances
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-princess-girl.png';
};


 // Update the player's position, required method for game
Player.prototype.update = function() {

    // Did the player touch the bug?
    for (let enemy of allEnemies) {
        let a = this.x - enemy.x - 25;
        let b = this.y - enemy.y - 25;
        let c = Math.sqrt(a * a + b * b);
            if (c < 45 ) {
                window.location.reload();
            }
    }

    // Did the player reach the water to meet the winning condition?
    if (this.y < 1) {
        allEnemies = [];
        gemOne.render();
    }
         // After the game is won, and the gem has appeared, reset and restart the game
        if (gemOne.x > 500) {
            window.location.reload();
        }
};


// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Gem that appears after our player wins
var Gemstone = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/Gem Blue.png';
};


// The gem's "victory lap"
Gemstone.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.speed * dt;
    }
};


// Draw the gem on the screen
Gemstone.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


 // Boundaries and controls for Player
 Player.prototype.handleInput = function(key) {

    if (key === 'left' && this.x > 0) {
        this.x -= 25;
    }
    else if (key === 'up' && this.y > 0) {
        this.y -= 25;
    }
    else if (key === 'right' && this.x < 400) {
        this.x += 25;
    }
    else if (key === 'down' && this.y < 428) {
        this.y += 25;
    }
};


 // Now instantiate your objects.
let enemyOne = new Enemy (5, 60, 200); // Slow Bug
let enemyTwo = new Enemy (5, 145, 400); // Medium Speed Bug
let enemyThree = new Enemy (5, 225, 600); // Fast Bug


 // Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy()];
allEnemies.push(enemyOne, enemyTwo, enemyThree);


 // Place the player object in a variable called player
let player = new Player(200, 428);


 // Gem object
let gemOne = new Gemstone (5, 145, 50);


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
