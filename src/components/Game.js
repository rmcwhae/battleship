import Phaser from 'phaser';
import BootScene from '../scenes/BootScene';

const config = {
  type: Phaser.AUTO,
  parent: 'battleship',
  width: 800,
  height: 600,
};

export default class Game extends Phaser.Game {
  // constructor (gameConfig) {
  constructor (props) {
    console.log("Before super", props);
    super(config);

    this.setState = props.setState;
    // this.scene.add('Boot', new BootScene({state: props.state, setState: props.setState}));
    this.scene.add('Boot', BootScene);
    this.scene.start('Boot');
      console.log("Successful constructor:", this);
  }

  getGame() {
    return this;
  }

  setProps(props) {
    this.state = props.state;
  }
};
 
