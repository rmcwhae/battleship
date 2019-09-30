import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import greenBoatImg from './assets/green_battleship_sprite.png';
import explosionImg from './assets/explosion.png';
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
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  }
};
const game = new Phaser.Game(config);
function preload() {
  // this.load.image('splash', splashImg);
  this.load.spritesheet('greenBoat', greenBoatImg, {
    frameWidth: 66,
    frameHeight: 113
  });
  this.load.spritesheet('boom', explosionImg, {
    frameWidth: 64,
    frameHeight: 64,
    endFrame: 23
  });
}
function create() {
  this.add.text(200 - 320 / 2, 0, 'Your Ships', {
    font: '24pt "Inconsolata"',
    fill: 'green'
  });
  this.add.text(600 - 320 / 2, 0, 'Opponent', {
    font: '24pt "Inconsolata"',
    fill: 'green'
  });

  const playerBoard = this.add.grid(200, 200, 320, 320, 40, 40, 0x057605);
  const opponentBoard = this.add.grid(600, 200, 320, 320, 40, 40, 0x057605);

  const boat = this.add.sprite(100, 200, 'greenBoat');
  var config = {
    key: 'explode',
    frames: this.anims.generateFrameNumbers('boom', {
      start: 0,
      end: 23,
      first: 23
    }),
    frameRate: 20
  };

  this.anims.create(config);

  const boom = this.add.sprite(100, 300, 'boom');

  boom.anims.play('explode');
}

ReactDOM.render(<App />, document.getElementById('root'));
