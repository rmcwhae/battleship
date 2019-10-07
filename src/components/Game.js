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
    this.appState = props.appState;
    console.log("Constructor before add scene", this);

    this.scene.add('Boot', new BootScene());
    this.scene.start('Boot');
    console.log("Constructor after add/start scene:", this);
  }

  destroy(bootScene, canvas, noReturn = false) {
    // console.log("Destroy current game", this);

    // bootScene.destroyGame();
    console.log("Destroy current game", this);
    return super.destroy(canvas, noReturn);
  }

  getGame() {
    return this;
  }

  setProps(props) {
    this.appState = props.state;
  }
};
 
