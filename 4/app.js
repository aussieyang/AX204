console.log("WORKING");
// Sprites Loading
var mario = new Image();
var tree = new Image();
var house = new Image();
var flower = new Image();
var bowser = new Image();
mario.src = "mario.png";
tree.src = "tree.png";
house.src = "house.png";
flower.src = "flower.png";
bowser.src = "bowser.png";

// Draw our sprite
mario.onload = function(){
	ctx5.drawImage(mario,150,300,50,100);
}
tree.onload = function(){
	ctx5.drawImage(tree,250,200,150,150);
}
house.onload = function(){
	ctx5.drawImage(house,500,200,250,250);
}
flower.onload = function(){
	ctx5.drawImage(flower,100,380,40,40);
}
bowser.onload = function(){
	ctx5.drawImage(bowser,320,280,130,130);
}

// ** Scenery **
var c5 = document.getElementById("scene");
var ctx5 = c5.getContext("2d");

// Skies and land
ctx5.fillStyle = "green";
ctx5.fillRect(0, 350, 800, 150);
ctx5.fillStyle = "cyan";
ctx5.fillRect(0, 0, 800, 350);

// Sun
ctx5.beginPath();
ctx5.arc(100,100,50,0, 6.28);
ctx5.closePath();
ctx5.stroke();
ctx5.fillStyle = "yellow";
ctx5.fill();

// Road
ctx5.beginPath()
ctx5.moveTo(300, 500);
ctx5.lineTo(350, 350);
ctx5.lineTo(400, 350);
ctx5.lineTo(450, 500);
ctx5.fillStyle = "grey"
ctx5.fill()
ctx5.stroke();
ctx5.closePath();
// Line in road
ctx5.moveTo(375, 500);
ctx5.strokeStyle = 'white'
ctx5.lineTo(375, 350);
ctx5.stroke();