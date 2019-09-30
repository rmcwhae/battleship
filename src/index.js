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
  // this.load.image('splash', splashImg);
}
function create() {
  // const logo = this.add.image(500, 300, 'splash');
  var graphics = this.add.graphics();

  this.add.text(200 - 320 / 2, 0, 'Your Ships', { font: '24pt "Inconsolata"', fill: 'green' });
  this.add.text(600 - 320 / 2, 0, 'Opponent', { font: '24pt "Inconsolata"', fill: 'green' });

  const playerBoard = this.add.grid(200, 200, 320, 320, 40, 40, 0x057605);
  const opponentBoard = this.add.grid(600, 200, 320, 320, 40, 40, 0x057605);
}

ReactDOM.render(<App />, document.getElementById('root'));
