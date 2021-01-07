import Phaser from "phaser";
import playerSheet from "./assets/player.png";
import Player from "./entities/Player";
import tileMap from "./assets/tilemap.json";
import tiles from "./assets/tilemap.png";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  player = new Player(1, 1, 16, 16, "player", playerSheet);

  preload() {
    this.player.preload(this);
    this.load.image("tiles", tiles);
    this.load.tilemapTiledJSON("map", tileMap);
  }

  create() {
    this.cameras.main.setBounds(0, 0, 16 * 40, 16 * 40);
    this.physics.world.setBounds(0, 0, 16 * 40, 16 * 40);

    this.cursors = this.input.keyboard.createCursorKeys();

    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("tilemap", "tiles");

    const floorLayer = map.createLayer("floor", tileset, 0, 0);
    const wallLayer = map.createLayer("wall", tileset, 0, 0);

    const player = this.player.create(this);

    wallLayer.setCollisionByProperty({ collides: true });

    this.physics.add.collider(player, wallLayer);

    this.cameras.main.startFollow(player, true, 0.09, 0.09);
  }

  update() {
    this.player.update();

    this.player.left = this.cursors.left.isDown;
    this.player.right = this.cursors.right.isDown;
    this.player.up = this.cursors.up.isDown;
    this.player.down = this.cursors.down.isDown;
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 240,
  height: 160,
  scene: MyGame,
  pixelArt: true,
  scale: { zoom: 4 },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
