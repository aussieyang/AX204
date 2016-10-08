console.log("AAAAAAA");
// Declaring all variables at the top (Elevation of Scope)
var canvas;
var ctx;
// Holding some coordinates
var x = 600;
var y = 300;
// Holding the magnitude of our movement
var mx = 2;
var my = 4;
// Holding width and height of canvas
var width = 600;
var height = 300;

// Initialise our animation
function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  return setInterval(draw, 10);
}

// Draw circle
function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2);
  ctx.fillStyle = "tomato";
  ctx.fill();
}

// Clear our canvas
function clear() {
  ctx.clearRect(0, 0, width, height);
}

// Draw function to create a frame
function draw() {
  clear();
  circle(x, y, 30);
  // Stay inside the canvas
  if(x + mx > width || x + mx < 0) {
    mx = -mx;
  }
  if(y + my > height || y + my < 0) {
    my = -my
  }
  // Move our shape by incrementing the position by the magnitude of the movement
  x += mx;   // means the same as x = x + mx
  y += my;
}

init();
