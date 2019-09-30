import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';

const config = {
  type: Phaser.AUTO,
  parent: 'battleship',
  width: 800,
  height: 600,
  // scene: {
  //   preload: preload,
  //   create: create
  // ,update: update
  // }
};

export default class Game extends Phaser.Game {
  // constructor (gameConfig) {
  constructor (props) {
    console.log("Before super", props);
    super(config);
    this.state = props.state;
    this.setState = props.setState;

    this.scene.add('Boot', new BootScene({state: this.state, setState: this.setState}));
    this.scene.start('Boot');
      console.log("Successful constructor:", this);
  }

  getGame() {
    return this;
  }

  
  // preload() {
  //   console.log("In GameConfig");

  //   this.load.image('logo', logoImg);
  // }

  // create() {
  //   const logo = this.add.image(400, 150, 'logo');
  //   this.tweens.add({
  //     targets: logo,
  //     y: 450,
  //     duration: 2000,
  //     ease: 'Power2',
  //     yoyo: true,
  //     loop: -1
  //   });
  //   this.logo.setInteractive({ useHandCursor: true });
  //   console.log("Created the phaser");
  //   this.logo.on("pointerup", () => {
  //     console.log("Hello");
  //   });
  // }

  // update() {

  // }
};
 
