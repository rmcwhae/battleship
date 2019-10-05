import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 850,
  height: 600,
  scale: {
    // mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  }
};

export default class Game extends Phaser.Game {
  // constructor (gameConfig) {
  constructor (props) {
    // console.log("Before super", props);
    super(config);
    this.sentGame = props.sentGame;
    this.gameOver = props.gameOver;
    this.setScene = props.setScene;
    this.appState = props.appState;

    this.scene.add('Boot', BootScene);
    this.scene.start('Boot');

      console.log("Successful constructor:", this, props);
  }

  getGame() {
    return this;
  }

  setProps(props) {
    this.appState = props.state;
    // this.scene.resume('Boot');

    // console.log("in setProps:", this, 'and', props);
  }
};
 
