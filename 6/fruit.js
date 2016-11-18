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
// Positions of fruits
var goodX;
var goodY;
var badX;
var badY;
var fruitWidth = 50;
var fruitHeight = 50;
// Boolean to keep track of whether collision is occuring
var goodCollision = false;
var badCollision = false;
// Width and height of canvas
var WIDTH = 600;
var HEIGHT = 600;
var score = 0;

// Draw circle to denote player
function circle (x,y,r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 6.28);
	ctx.closePath();
	ctx.fillStyle = "magenta";
	ctx.fill();
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
	// Putting fruits in random positions
	badX = Math.floor(Math.random() * 550);
	badY = Math.floor(Math.random() * 550);
	goodX = Math.floor(Math.random() * 550);
	goodY = Math.floor(Math.random() * 550);
	// Waiting for user to press keyboard (behaviour coded in keydownControl)
	window.onkeydown = keydownControl;
	// Redraws our canvas every 10ms
	return setInterval(draw, 10);
}

// Draw scene function
function draw() {
	clear();
	circle(x, y, r);
	drawGoodFruit();
	drawBadFruit();
	// Tells our sprite to bounce off the walls and go in the opposite direction
	if (x + mx > WIDTH - r || x + mx < 0 + r){
		mx = -mx
	} else if (y + my > WIDTH - r || y + my < 0 + r) {
		my = -my
	}
	// Moves our sprite
	x += mx;  //means the same as x = x + mx
	y += my;

	// Is there a collision?
	collisionCheck();
	collisionHandle();
}

function collisionHandle() {
	// If there is a collision, resets position of fruit and changes the score
	if (badCollision == true) {
			badX = Math.floor(Math.random() * 550);
  		badY = Math.floor(Math.random() * 550);
  		score -= 1;
  		document.getElementById("score").innerHTML = score;
	}
	if (goodCollision == true) {
			goodX = Math.floor(Math.random() * 550);
  		goodY = Math.floor(Math.random() * 550);
  		score += 1;
  		document.getElementById("score").innerHTML = score;
	}
}

function collisionCheck() {
	// Accounting for collision from the top left and the bottom right
	if( (x >= badX) && (x <= badX + fruitWidth) && (y >= badY) && (y <= badY + fruitHeight) ) {
		badCollision = true;
	} else {
		badCollision = false;
	}

	if( (x >= goodX) && (x <= goodX + fruitWidth) && (y >= goodY) && (y <= goodY + fruitHeight) ) {
		goodCollision = true;
	} else {
		goodCollision = false;
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

// Importing images onto canvas
function drawBadFruit() {
	ctx = document.getElementById('myCanvas').getContext('2d');
	var bad = new Image();
	bad.src = "bad.png";
	ctx.drawImage(bad, badX, badY, 50, 50);
}

function drawGoodFruit() {
	ctx = document.getElementById('myCanvas').getContext('2d');
	var good = new Image();
	good.src = "good.png";
	ctx.drawImage(good, goodX, goodY, 50, 50);
}

init();
