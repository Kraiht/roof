var game = new Phaser.Game('400','200', Phaser.AUTO, '', { preload: preload, create: create, update: update});

function preload() {
    this.game.load.audio('music','assets/main.mp3');
    this.game.load.image('bgImg', 'assets/background.png');
    this.game.load.spritesheet('dude', 'assets/dude22.png', 32, 48);
    this.game.load.image('roof', 'assets/rooftop.png');
    this.game.load.image('obstacle', 'assets/obstacle.png');
}

var cursors;

function create() {


    this.bgImg = this.game.add.tileSprite(0,0, 400,400, 'bgImg');
    this.music = this.game.add.audio('music');
   this.music.play('');

    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.game.add.group();

    //  We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    var roof = this.platforms.create(0, this.game.world.height - 15, 'roof');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    roof.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    roof.body.immovable = true;


    // The player and its settings
    this.player = this.game.add.sprite(120, this.game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(this.player);

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.body.gravity.y = 1000;
    this.player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    this.player.animations.add('right', [0,1,2,3],11, true);

    cursors = this.game.input.keyboard.createCursorKeys();



}


function update(){

    //player.body.velocity.x = 50;
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.player.animations.play('right');
    this.bgImg.tilePosition.x -= 4;

    if (/*this.cursors.up.isDown && this.player.body.touching.down ||*/ this.game.input.pointer1.isDown && this.player.body.touching.down)
    {
        this.player.body.velocity.y = -600;
    }
}

