import Phaser from 'phaser';
import logoImg from '../assets/logo.png';

export default class GameScene extends Phaser.Scene {

  // const game = new Phaser.Game(config);
  constructor () {
    super('Game');
  }
  
  preload() {
    this.load.image('logo', logoImg);
  }

  create() {
    const logo = this.add.image(400, 150, 'logo');
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    });
    this.logo.setInteractive({ useHandCursor: true });

    this.logo.on("pointerup", () => {
      console.log("Hello");
    });
  }

  // update() {

  // }
};