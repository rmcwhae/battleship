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
const gridDimensions = {
  singleSquareLength: 60,
  gridRows: 6
}; // e.g. we have a <gridRows> x <gridRows> square grid where each square has a width and height of <singleSquareLength>
let boats = {};
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
  this.add.text(200 - 360 / 2, 0, 'Your Ships', {
    font: '24pt "Inconsolata"',
    fill: 'green'
  });
  this.add.text(650 - 360 / 2, 0, 'Opponent', {
    font: '24pt "Inconsolata"',
    fill: 'green'
  });

  const boardLength =
    gridDimensions.gridRows * gridDimensions.singleSquareLength;
  const playerBoard = this.add.grid(
    200,
    230,
    boardLength,
    boardLength,
    gridDimensions.singleSquareLength,
    gridDimensions.singleSquareLength,
    0x057605
  );
  const opponentBoard = this.add.grid(
    650,
    230,
    boardLength,
    boardLength,
    gridDimensions.singleSquareLength,
    gridDimensions.singleSquareLength,
    0x057605
  );


  let playerOneShips = [
    { x: 0, y: 0, size: 2, hits: 0, horizontal: false },
    { x: 5, y: 4, size: 2, hits: 0, horizontal: true },
    { x: 2, y: 3, size: 2, hits: 0, horizontal: true },
    { x: 4, y: 1, size: 2, hits: 0, horizontal: false },
    { x: 2, y: 5, size: 2, hits: 0, horizontal: true }
  ];

  renderShips(this, playerOneShips);

  // Phaser.Actions.GridAlign([boat1, boat2], {
  //   width: gridDimensions.gridRows,
  //   height: gridDimensions.gridRows,
  //   cellWidth: gridDimensions.singleSquareLength,
  //   cellHeight: gridDimensions.singleSquareLength,
  //   x: 100,
  //   y: 100
  // });

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

const renderShips = function(game, shipsArray) {
  shipsArray.forEach((ship, index) => {
    boats[index] = game.add.sprite(
      50 + ship.x * gridDimensions.singleSquareLength,
      110 + ship.y * gridDimensions.singleSquareLength,
      'greenBoat'
    );
    if (ship.horizontal) {
      boats[index].angle = 90;
      boats[index].y -= gridDimensions.singleSquareLength / 2;
      boats[index].x -= gridDimensions.singleSquareLength / 2;
    }
  });
};

ReactDOM.render(<App />, document.getElementById('root'));
