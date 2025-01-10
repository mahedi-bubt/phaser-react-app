import Phaser from 'phaser';

class GameMainClass extends Phaser.Scene {
   constructor() {
      super({ key: 'GameMainClass' });
   }

   preload() {
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('dude', 'assets/dude.png', {
         frameWidth: 32,
         frameHeight: 48,
      });
   }

   create() {
      // Background
      this.add.image(360, 640, 'sky').setDisplaySize(720, 1280); // Adjusted for 720x1280

      // Platforms
      this.platforms = this.physics.add.staticGroup();
      this.platforms.create(360, 1260, 'ground').setScale(2).refreshBody(); // Bottom platform
      this.platforms.create(540, 1050, 'ground'); // Platform adjusted for new layout
      this.platforms.create(80, 700, 'ground');
      this.platforms.create(800, 550, 'ground');
      this.platforms.create(250, 850, 'ground'); // Center platform
      this.platforms.create(20, 400, 'ground'); // Left high platform

      // Player
      this.player = this.physics.add.sprite(100, 1150, 'dude'); // Adjusted for new layout
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      // Animations
      this.anims.create({
         key: 'left',
         frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
         frameRate: 10,
         repeat: -1,
      });

      this.anims.create({
         key: 'turn',
         frames: [{ key: 'dude', frame: 4 }],
         frameRate: 20,
      });

      this.anims.create({
         key: 'right',
         frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
         frameRate: 10,
         repeat: -1,
      });

      this.cursors = this.input.keyboard.createCursorKeys();

      // Stars
      this.stars = this.physics.add.group({
         key: 'star',
         repeat: 7,
         setXY: { x: 50, y: 0, stepX: 90 }, // Adjusted for 720x1280
      });

      this.stars.children.iterate(child => {
         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      // Bombs
      this.bombs = this.physics.add.group();

      // Score
      this.score = 0;
      this.gameOver = false;
      this.scoreText = this.add.text(16, 16, 'Score: 0', {
         fontSize: '28px',
         fill: '#000',
      });

      // Colliders
      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.stars, this.platforms);
      this.physics.add.collider(this.bombs, this.platforms);
      this.physics.add.overlap(
         this.player,
         this.stars,
         this.collectStar,
         null,
         this
      );
      this.physics.add.collider(
         this.player,
         this.bombs,
         this.hitBomb,
         null,
         this
      );

      // Add start button
      this.startButton = this.add.text(360, 640, 'Start', {
         fontSize: '40px',
         fill: '#fff',
      });
      this.startButton.setOrigin(0.5);
      this.startButton.setInteractive();
      this.startButton.on('pointerdown', () => this.startGame());

      // Hide game objects initially
      this.hideGameObjects();
   }

   hideGameObjects() {
      this.physics.pause();
      this.player.setActive(false).setVisible(false);
      this.stars.setActive(false).setVisible(false);
      this.bombs.setActive(false).setVisible(false);
      this.scoreText.setVisible(false);
   }

   showGameObjects() {
      this.physics.resume();
      this.player.setActive(true).setVisible(true);
      this.stars.setActive(true).setVisible(true);
      this.bombs.setActive(true).setVisible(true);
      this.scoreText.setVisible(true);
   }

   startGame() {
      this.gameOver = false;
      this.startButton.setVisible(false);
      this.startButton.disableInteractive();
      this.showGameObjects();
      this.player.clearTint();
      this.player.anims.play('turn');
      this.score = 0;
      this.scoreText.setText('Score: ' + this.score);

      // Reset stars
      this.stars.children.iterate(child => {
         child.enableBody(true, child.x, 0, true, true);
      });

      // Clear bombs
      this.bombs.clear(true, true);
   }

   update() {
      if (this.gameOver) return;

      if (this.cursors.left.isDown) {
         this.player.setVelocityX(-160);
         this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
         this.player.setVelocityX(160);
         this.player.anims.play('right', true);
      } else {
         this.player.setVelocityX(0);
         this.player.anims.play('turn');
      }

      if (this.cursors.up.isDown && this.player.body.touching.down) {
         this.player.setVelocityY(-330);
      }
   }

   collectStar(player, star) {
      star.disableBody(true, true);

      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);

      if (this.stars.countActive(true) === 0) {
         this.stars.children.iterate(child => {
            child.enableBody(true, child.x, 0, true, true);
         });

         const x =
            player.x < 360
               ? Phaser.Math.Between(360, 720)
               : Phaser.Math.Between(0, 360);

         const bomb = this.bombs.create(x, 16, 'bomb');
         bomb.setBounce(1);
         bomb.setCollideWorldBounds(true);
         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
         bomb.allowGravity = false;
      }
   }

   hitBomb(player, bomb) {
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      this.gameOver = true;

      // Show start button again
      this.startButton.setVisible(true);
      this.startButton.setInteractive();
   }
}

export default GameMainClass;
