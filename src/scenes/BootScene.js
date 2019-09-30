
import 'phaser';
import logoImg from '../assets/logo.png';
import buttonImg from '../assets/download.png';
 
export default class BootScene extends Phaser.Scene {
  constructor (props) {
    super('Boot');
    // this.state = props.state;
    // this.setState = props.setState;
  }
 
  // set props(props) {
  //   this.state = props.state;
  //   this.setState = props.setState;
  // }

  preload() {
    this.load.image('logo', logoImg);
    this.load.image('button', buttonImg );
    console.log("In GameConfig", this);

  }

  create() {
    // const button = this.add.button(this.world.centerX, this.world.centerY, 'button', this.actionOnClick, 1, 0, 2);

    const logo = this.add.image(400, 150, 'logo');
    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: 'Power2',
    //   yoyo: true,
    //   loop: -1
    // });

    logo.setInteractive({ useHandCursor: true });
    logo.on("pointerup", () => {
      console.log("Bootscene ", this.game.state.count);
      this.game.setState({count: this.game.state.count - 1});
    });

    console.log("Created the phaser");

    // button.anchor.setTo(0.5, 0.5);

}

// function up() {
//     console.log('button up', arguments);
// }

// function over() {
//     console.log('button over');
// }

// function out() {
//     console.log('button out');
// }

// actionOnClick () {
//     console.log("CLick");
// }

  // update() {

  // }
};