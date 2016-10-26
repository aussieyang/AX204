// Declaring all variables at the top (Elevation of Scope)
var canvas;
var ctx;
// Starting position and radius of player sprite
var x = 300;
var y = 300;
var r = 20;
// Holding the speed in the x and y directions
var mx = 0;
var my = 0;
// Position of circle
var circleX
var circleY
// Positions of ghost
var ghostX;
var ghostY;
var ghostWidth = 50;
var ghostHeight = 50;
// Boolean to keep track of whether collision is occuring
var ghostCollision = false;
var circleCollision = false;
// Width and height of canvas
var WIDTH = 600;
var HEIGHT = 600;
var gameover = false;
var score = 0;

// Importing images onto canvas
function drawPacman(x, y, r) {
	ctx = document.getElementById('myCanvas').getContext('2d');
	var pacman = new Image();
	pacman.src = "pacman.gif";
	ctx.drawImage(pacman, x, y, r, r);
}

// Importing images onto canvas
function drawGhost() {
	ctx = document.getElementById('myCanvas').getContext('2d');
	var ghost = new Image();
	ghost.src = "ghost.gif";
	ctx.drawImage(ghost, ghostX, ghostY, 50, 50);
}

// Importing images onto canvas
function drawCircle() {
	ctx = document.getElementById('myCanvas').getContext('2d');
	var circle = new Image();
	circle.src = "circle.png";
	ctx.drawImage(circle, circleX, circleY, 50, 50);
}

// Wiping canvas
function clear () {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// Initialise our animation
function init() {
	// Grabbing and setting up our canvas
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	// Putting ghost in random position
	ghostX = Math.floor(Math.random() * 550);
	ghostY = Math.floor(Math.random() * 550);
	// Putting circle in random position
	circleX = Math.floor(Math.random() * 550);
	circleY = Math.floor(Math.random() * 550);
	// Waiting for user to press keyboard (behaviour coded in keydownControl)
	window.onkeydown = keydownControl;
	// Redraws our canvas every 10ms
	return setInterval(draw, 10);
}

// Draw scene function
function draw() {
	clear();
	// If the game is still ongoing
	if (gameover != true) {
		drawPacman(x, y, 50);
		drawGhost();
		drawCircle();
		// Tells our sprite to bounce off the walls and go in the opposite direction
		if (x + mx > WIDTH - r || x + mx < 0){
			mx = -mx
		} else if (y + my > WIDTH - r || y + my < 0) {
			my = -my
		}
		// Moves our sprite
		x += mx;  //means the same as x = x + mx
		y += my;
		// Ghost follows pacman
		followPacman();
		// Is there a collision?
		collisionCheck();
		collisionHandle();
	}
	// If game is over
	if (gameover == true) {
		ctx.font = "40px Impact";
		ctx.fillText("GAME OVER", 200, 300)
	}
}

// Ghost follows pacman
function followPacman() {
	if (ghostX < x) {
		ghostX += 1
	}
	if (ghostY < y) {
		ghostY += 1
	}
	if (ghostX > x) {
		ghostX -= 1
	}
	if (ghostY > y) {
		ghostY -= 1
	}
}

function collisionHandle() {
	// If there is a collision, resets position of fruit and changes the score
	if (ghostCollision == true) {
		gameover = true;
	}
	if (circleCollision == true) {
		circleX = Math.floor(Math.random() * 550);
		circleY = Math.floor(Math.random() * 550);
		score += 1;
		document.getElementById("score").innerHTML = score;
	}
}

function collisionCheck() {
	// Accounting for collision from the top left and the bottom right
	if( (x >= ghostX) && (x <= ghostX + ghostWidth) && (y >= ghostY) && (y <= ghostY + ghostHeight) ) {
		ghostCollision = true;
	} else {
		ghostCollision = false;
	}
	// Checking for collision with circle
	if( (x >= circleX) && (x <= circleX + 50) && (y >= circleY) && (y <= circleY + 50) ) {
		circleCollision = true;
	} else {
		circleCollision = false;
	}
}

function keydownControl(e) {
	// Change the speed depending on which button is pressed
	if(e.keyCode == 37) {
		mx = -4;
		my = 0
	} else if (e.keyCode == 38) {
		mx = 0;
		my = -4
	} else if (e.keyCode == 39) {
		mx = 4;
		my = 0
	} else if (e.keyCode == 40) {
		mx = 0;
		my = 4;
	}
}



init();
