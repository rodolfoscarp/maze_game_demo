export default class Player {
  constructor(x, y, width, height, name, spritesheet) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.name = name;
    this.spritesheet = spritesheet;
  }

  speed = 50;
  right = false;
  left = false;
  up = false;
  down = false;

  velocityX = 0;
  velocityY = 0;
  dir = "right";

  preload(scene) {
    scene.load.spritesheet(this.name, this.spritesheet, {
      frameWidth: this.width,
      frameHeight: this.height,
    });
  }

  create(scene) {
    const player = (this._player = scene.physics.add
      .sprite(this.x * this.width, this.y * this.height, this.name)
      .setOrigin(0, 0));

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    scene.anims.create({
      key: "left",
      frames: scene.anims.generateFrameNumbers(this.name, { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "right",
      frames: scene.anims.generateFrameNumbers(this.name, { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "up",
      frames: scene.anims.generateFrameNumbers(this.name, {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: "down",
      frames: scene.anims.generateFrameNumbers(this.name, {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    return player;
  }

  update() {
    this.velocityX = 0;
    this.velocityY = 0;
    let moving = false;

    if (this.left) {
      this.velocityX -= 1;
      moving = true;
      this.dir = "left";
    }

    if (this.right) {
      this.velocityX += 1;
      moving = true;
      this.dir = "right";
    }

    if (this.up) {
      this.velocityY -= 1;
      moving = true;
      this.dir = "up";
    }

    if (this.down) {
      this.velocityY += 1;
      moving = true;
      this.dir = "down";
    }

    if (moving) {
      this._player.anims.play(this.dir, true);
    } else {
      this._player.anims.play(this.dir, false);
    }

    let alpha = Math.atan2(this.velocityY, this.velocityX);

    let vX = this.velocityX * Math.abs(Math.cos(alpha)) * this.speed;

    let vY = this.velocityY * Math.abs(Math.sin(alpha)) * this.speed;

    this._player.setVelocity(vX, vY);
  }
}
