console.log('hey hey it works');

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var score = 0;
var life = 3;

function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, 'sky');

  // Making group of platforms
  platforms = game.add.physicsGroup();
  platforms.enableBody = true;

  // Ground
  var ground = platforms.create(0, game.world.height - 50, 'ground');
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;

  // Ledges
  var ledge = platforms.create(400, 400, 'ground');
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 250, 'ground');
  ledge.body.immovable = true;

  // Player
  player = game.add.sprite(32, game.world.height - 220, 'dude');
    // player animations using spritesheet and applies game physics
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    game.physics.arcade.enable(player);
    // Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

  // Enemies
  enemy1 = game.add.sprite(760, 20, 'baddie')
    // Enemy animations using spritesheet and applies game physics
    enemy1.animations.add('left', [0, 1], 10, true);
    enemy1.animations.add('right', [2, 3], 10, true);
    game.physics.arcade.enable(enemy1);
    // Enemy physics properties.
    enemy1.body.bounce.y = 0.2;
    enemy1.body.gravity.y = 500;
    enemy1.body.collideWorldBounds = true;

  enemy2 = game.add.sprite(10, 20, 'baddie')
    // Enemy animations using spritesheet and applies game physics
    enemy2.animations.add('left', [0, 1], 10, true);
    enemy2.animations.add('right', [2, 3], 10, true);
    game.physics.arcade.enable(enemy2);
    // Enemy physics properties.
    enemy2.body.bounce.y = 0.2;
    enemy2.body.gravity.y = 500;
    enemy2.body.collideWorldBounds = true;

  enemy3 = game.add.sprite(200, 20, 'baddie')
    // Enemy animations using spritesheet and applies game physics
    enemy3.animations.add('left', [0, 1], 10, true);
    enemy3.animations.add('right', [2, 3], 10, true);
    game.physics.arcade.enable(enemy3);
    // Enemy physics properties.
    enemy3.body.bounce.y = 0.2;
    enemy3.body.gravity.y = 500;
    enemy3.body.collideWorldBounds = true;

  // Creating keyboard entry
  cursors = game.input.keyboard.createCursorKeys();

  // Creating stars
  stars = game.add.physicsGroup();
  stars.enableBody = true;
  //  Here we'll create 12 of them evenly spaced apart
  for (var i = 0; i < 12; i++){
    //  Create a star inside of the 'stars' group
    var star = stars.create(i * 70, 0, 'star');
    //  Let gravity do its thing
    star.body.gravity.y = 200;
    //  This just gives each star a slightly random bounce value
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  // Setting style for text
  var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    //  The Text is positioned at these coordinates within textbound
    scorelabel = game.add.text(-60, 0, "Your score is: ", style);
    scoretext = game.add.text(70, 0, score, style);
    scorelabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    scoretext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    //  We'll set the bounds to be from x0, y520 (top down) and be 800px wide by 100px high
    scorelabel.setTextBounds(0, 520, 800, 100);
    scoretext.setTextBounds(0, 520, 800, 100);
    //  Doing the same for lives count
    lifelabel = game.add.text(-300, 0, "Lives: ", style);
    lifetext = game.add.text(-240, 0, life, style);
    lifelabel.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    lifetext.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    //  We'll set the bounds to be from x0, y520 (top down) and be 800px wide by 100px high
    lifelabel.setTextBounds(0, 0, 800, 100);
    lifetext.setTextBounds(0, 0, 800, 100);
}

function update() {
  // Collide the player and the stars with the platforms
  game.physics.arcade.collide(player, platforms);
  // Collide the enemies and the stars with the platforms
  game.physics.arcade.collide(enemy1, platforms);
  game.physics.arcade.collide(enemy2, platforms);
  game.physics.arcade.collide(enemy3, platforms);
  // Reset the player’s velocity (movement) if no events
  player.body.velocity.x = 0;

  // Left key pressed
  if (cursors.left.isDown){
        // Move to the left
        player.body.velocity.x = -150;
        // Play animation
        player.animations.play('left');
    } else if (cursors.right.isDown) {
      	player.body.velocity.x = 150;
      	player.animations.play('right');
  	} else {
      //  Stand still
      player.animations.stop();
      player.frame = 4;
    }
  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && player.body.touching.down){
    player.body.velocity.y = -300;
  }

  // Enemy AI
  if (enemy1.x > 759){
    enemy1.animations.play('left');
    enemy1.body.velocity.x = -120;
  } else if (enemy1.x < 405) {
    enemy1.animations.play('right');
    enemy1.body.velocity.x = 120;
  }
  if (enemy2.x > 200){
    enemy2.animations.play('left');
    enemy2.body.velocity.x = -80;
  } else if (enemy2.x < 21) {
    enemy2.animations.play('right');
    enemy2.body.velocity.x = 80;
  }
  if (enemy3.x > 759){
    enemy3.animations.play('left');
    enemy3.body.velocity.x = -150;
  } else if (enemy3.x < 201) {
    enemy3.animations.play('right');
    enemy3.body.velocity.x = 150;
  }

  // Collide with stars
  game.physics.arcade.collide(stars, platforms);
  // Calls collectStar function when overlaps
  game.physics.arcade.overlap(player, stars, collectStar, null, this);
  // Stars collide with platforms
  game.physics.arcade.collide(stars, platforms);
  // Player triggers loseLife when contact with enemies
  game.physics.arcade.overlap(player, enemy1, loseLife, null, this)
  game.physics.arcade.overlap(player, enemy2, loseLifeLeft, null, this)
  game.physics.arcade.overlap(player, enemy3, loseLife, null, this)
}

// Defining collectStar function
function collectStar (player, star) {
  // Removes the star from the screen
  star.kill();
  // Updating score variable
  score = score + 1;
  // Reflecting in the text
  scoretext.setText(score);

  // Create new star
  star = stars.create(Math.floor(Math.random() * 750), 0, 'star');
  star.body.gravity.y = 200;
  star.body.bounce.y = 0.7 + Math.random() * 0.2;
}


// Defining loseLife
function loseLife (player, enemy) {
  console.log('loselife working again');
  enemy.kill();
  life = life - 1;
  lifetext.setText(life);
  enemy.reset(760, 20);
}

function loseLifeLeft (player, enemy) {
  console.log('loselife working again');
  enemy.kill();
  life = life - 1;
  lifetext.setText(life);
  enemy.reset(10, 20);
}
