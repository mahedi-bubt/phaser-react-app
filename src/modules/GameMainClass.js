// import Phaser from 'phaser';

// export class GameMainClass extends Phaser.Scene {
//    constructor() {
//       super('ExampleScene');
//    }

//    preload() {
//       this.load.image('sky', 'assets/sky.png');
//       this.load.image('ground', 'assets/platform.png');
//       this.load.image('star', 'assets/star.png');
//       this.load.image('bomb', 'assets/bomb.png');
//       this.load.spritesheet('dude', 'assets/dude.png', {
//          frameWidth: 52,
//          frameHeight: 48,
//       });
//    }

//    create() {
//       // Background
//       this.add.image(400, 300, 'sky');

//       // Platforms
//       this.platforms = this.physics.add.staticGroup();
//       this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
//       this.platforms.create(600, 400, 'ground');
//       this.platforms.create(50, 250, 'ground');
//       this.platforms.create(750, 220, 'ground');

//       // Player
//       this.player = this.physics.add.sprite(100, 450, 'dude');
//       this.player.setBounce(0.2);
//       this.player.setCollideWorldBounds(true);

//       this.anims.create({
//          key: 'left',
//          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
//          frameRate: 10,
//          repeat: -1,
//       });

//       this.anims.create({
//          key: 'turn',
//          frames: [{ key: 'dude', frame: 4 }],
//          frameRate: 20,
//       });

//       this.anims.create({
//          key: 'right',
//          frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
//          frameRate: 10,
//          repeat: -1,
//       });

//       this.cursors = this.input.keyboard.createCursorKeys();

//       // Stars
//       this.stars = this.physics.add.group({
//          key: 'star',
//          repeat: 11,
//          setXY: { x: 12, y: 0, stepX: 70 },
//       });

//       this.stars.children.iterate(child => {
//          child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
//       });

//       // Bombs
//       this.bombs = this.physics.add.group();

//       // Score
//       this.score = 0;
//       this.gameOver = false;
//       this.scoreText = this.add.text(16, 16, 'Score: 0', {
//          fontSize: '32px',
//          fill: '#000',
//       });

//       // Colliders
//       this.physics.add.collider(this.player, this.platforms);
//       this.physics.add.collider(this.stars, this.platforms);
//       this.physics.add.collider(this.bombs, this.platforms);
//       this.physics.add.overlap(
//          this.player,
//          this.stars,
//          this.collectStar,
//          null,
//          this
//       );
//       this.physics.add.collider(
//          this.player,
//          this.bombs,
//          this.hitBomb,
//          null,
//          this
//       );
//    }

//    update() {
//       if (this.gameOver) return;

//       if (this.cursors.left.isDown) {
//          this.player.setVelocityX(-160);
//          this.player.anims.play('left', true);
//       } else if (this.cursors.right.isDown) {
//          this.player.setVelocityX(160);
//          this.player.anims.play('right', true);
//       } else {
//          this.player.setVelocityX(0);
//          this.player.anims.play('turn');
//       }

//       if (this.cursors.up.isDown && this.player.body.touching.down) {
//          this.player.setVelocityY(-330);
//       }
//    }

//    collectStar(player, star) {
//       star.disableBody(true, true);

//       this.score += 10;
//       this.scoreText.setText('Score: ' + this.score);

//       if (this.stars.countActive(true) === 0) {
//          this.stars.children.iterate(child => {
//             child.enableBody(true, child.x, 0, true, true);
//          });

//          const x =
//             player.x < 400
//                ? Phaser.Math.Between(400, 800)
//                : Phaser.Math.Between(0, 400);

//          const bomb = this.bombs.create(x, 16, 'bomb');
//          bomb.setBounce(1);
//          bomb.setCollideWorldBounds(true);
//          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
//          bomb.allowGravity = false;
//       }
//    }

//    hitBomb(player, bomb) {
//       this.physics.pause();
//       player.setTint(0xff0000);
//       player.anims.play('turn');
//       this.gameOver = true;
//    }
// }

import Phaser from 'phaser';

export class GameMainClass extends Phaser.Scene {
   constructor() {
      super('ExampleScene');
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
      const { width, height } = this.scale;

      // Background
      this.add
         .image(width / 2, height / 2, 'sky')
         .setDisplaySize(width, height);

      // Platforms
      this.platforms = this.physics.add.staticGroup();
      const groundHeight = height * 0.05;
      this.platforms
         .create(width / 2, height - groundHeight / 2, 'ground')
         .setScale(width / 400, groundHeight / 32)
         .refreshBody();

      this.platforms.create((3 * width) / 4, height / 2, 'ground');
      this.platforms.create(width / 8, height / 3, 'ground');
      this.platforms.create((7 * width) / 8, height / 2.5, 'ground');

      // Player
      this.player = this.physics.add.sprite(
         width / 10,
         height - groundHeight - 48,
         'dude'
      );
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

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
         repeat: 11,
         setXY: { x: width * 0.05, y: 0, stepX: width * 0.08 },
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
         fontSize: `${Math.round(width / 40)}px`,
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
            player.x < 400
               ? Phaser.Math.Between(400, 800)
               : Phaser.Math.Between(0, 400);

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

      this.events.emit('gameOver'); // Notify that the game is over
   }
}
