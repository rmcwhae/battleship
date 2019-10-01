
import 'phaser';
import logoImg from '../assets/logo.png'; 
export default class BootScene extends Phaser.Scene {
  constructor (props) {
    super('Boot');
  }
 
  // set props(props) {
  //   this.state = props.state;
  //   this.setState = props.setState;
  // }

  preload() {
    this.load.image('logo', logoImg);
    console.log("In GameConfig", this);
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

    logo.setInteractive({ useHandCursor: true });
    logo.on("pointerup", () => {
      console.log("Bootscene ", this.game.state.count);
      this.game.setState({count: this.game.state.count - 1});
    });

    console.log("Created the phaser");

}
  // update() {

  // }
};