console.log('Yang is amazing');

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});
var score = 0;
var life = 3;

function preload(){
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
}

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // Create the sky
  game.add.sprite(0, 0, 'sky');
  // Create group of platforms
  platforms = game.add.physicsGroup();
  platforms.enableBody = true;
  // Create the ground
  var ground = platforms.create(0, 550, 'ground');
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;
  // Create the ledges
  var ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;
  // Creating the player sprite
  player = game.add.sprite(32, 400, 'dude');
    // Animating the player sprite
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
  // Create the enemies
  enemy1 = game.add.sprite(760, 20, 'baddie');
    // Animate the enemy1
    enemy1.animations.add('left', [0,1], 10, true);
    enemy1.animations.add('right', [2,3], 10, true);
    game.physics.arcade.enable(enemy1);
    enemy1.body.bounce.y = 0.2;
    enemy1.body.gravity.y = 500;
    enemy1.body.collideWorldBounds = true;

  enemy2 = game.add.sprite(10, 20, 'baddie');
    // Animate the enemy2
    enemy2.animations.add('left', [0,1], 10, true);
    enemy2.animations.add('right', [2,3], 10, true);
    game.physics.arcade.enable(enemy2);
    enemy2.body.bounce.y = 0.2;
    enemy2.body.gravity.y = 500;
    enemy2.body.collideWorldBounds = true;

  enemy3 = game.add.sprite(200, 20, 'baddie');
    // Animate the enemy3
    enemy3.animations.add('left', [0,1], 10, true);
    enemy3.animations.add('right', [2,3], 10, true);
    game.physics.arcade.enable(enemy3);
    enemy3.body.bounce.y = 0.2;
    enemy3.body.gravity.y = 500;
    enemy3.body.collideWorldBounds = true;

  // Create keyboard entries
  cursors = game.input.keyboard.createCursorKeys();

  // Create the stars
  stars = game.add.physicsGroup():
  stars.enableBody = true;
  // We will create 12 stars evenly spaced
  for(var i = 0; i < 12; i++){
    var star = stars.create(i * 70, 0, 'star');
    star.body.gravity.y = 200;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }
}

function update(){

}
