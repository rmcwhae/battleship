import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import splashImg from './assets/Preview.png';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1000,
  height: 600,
  scene: {
    preload: preload,
    create: create
  },
  scale: {
    // mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};
const game = new Phaser.Game(config);
function preload() {
  this.load.image('splash', splashImg);
}
function create() {
  const logo = this.add.image(500, 300, 'splash');
  // this.tweens.add({
  //   targets: logo,
  //   y: 450,
  //   duration: 2000
  //   // ease: 'Power2',
  //   // yoyo: true,
  //   // loop: -1
  // });
}
ReactDOM.render(<App />, document.getElementById('root'));
