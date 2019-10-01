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
  width: 850,
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

const rowNumbers = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6
};

let spotsOccupied = {
  a: [0, 0, 0, 0, 0, 0],
  b: [0, 0, 0, 0, 0, 0],
  c: [0, 0, 0, 0, 0, 0],
  d: [0, 0, 0, 0, 0, 0],
  e: [0, 0, 0, 0, 0, 0],
  f: [0, 0, 0, 0, 0, 0]
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

  let playerOneShips = distributeShips();
  let playerTwoShips = distributeShips();
  playerTwoShips[0].sunk = true;
  playerTwoShips[1].sunk = true;
  playerTwoShips[2].sunk = true;
  playerTwoShips[3].sunk = true;
  playerTwoShips[4].sunk = true;

  renderShips(this, 'playerBoard', playerOneShips);

  renderShips(this, 'opponentBoard', playerTwoShips);

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

  explode(this, 'playerBoard', 'a', 1);
  explode(this, 'playerBoard', 'a', 2);
  explode(this, 'playerBoard', 'b', 2);
  explode(this, 'playerBoard', 'c', 3);
  explode(this, 'playerBoard', 'd', 4);
  explode(this, 'playerBoard', 'e', 5);
  explode(this, 'playerBoard', 'f', 6);

  explode(this, 'opponentBoard', 'd', 4);
  explode(this, 'opponentBoard', 'e', 5);
  explode(this, 'opponentBoard', 'f', 6);
}

const renderShips = function(game, board, shipsArray) {
  let adjustmentx = 440; // hardcoded to align with opponent board
  let adjustmenty = 50;
  let frame = 0;
  if (board === 'playerBoard') {
    adjustmentx = -10;
  }
  // filter for only non-sunk ships? …
  shipsArray.forEach((ship, index) => {
    boats[index] = game.add.sprite(
      ship.col * gridDimensions.singleSquareLength + adjustmentx,
      rowNumbers[ship.row] * gridDimensions.singleSquareLength + adjustmenty,
      'greenBoat',
      ship.sunk ? (frame = 3) : (frame = 0)
    );
    if (ship.horizontal) {
      boats[index].angle = 90;
      boats[index].x += gridDimensions.singleSquareLength / 2;
      boats[index].y -= gridDimensions.singleSquareLength / 2;
    }
  });
};

const explode = function(game, board, row, col) {
  let adjustmentx = 440;
  let adjustmenty = 20;
  if (board === 'playerBoard') {
    adjustmentx = -10;
  }
  const xcoord = gridDimensions.singleSquareLength * col + adjustmentx;
  const ycoord =
    gridDimensions.singleSquareLength * rowNumbers[row] + adjustmenty;
  const boom = game.add.sprite(xcoord, ycoord, 'boom');
  boom.anims.play('explode');
};

const distributeShips = function() {
  let shipsArray = [];

  while (shipsArray.length < 5) {
    let ship = {
      // assign random spot
      row: Object.keys(rowNumbers)[
        Math.floor(Math.random() * Object.keys(rowNumbers).length)
      ],
      col:
        rowNumbers[
          Object.keys(rowNumbers)[
            Math.floor(Math.random() * Object.keys(rowNumbers).length)
          ]
        ],
      size: 2,
      sunk: false,
      horizontal: Math.random() >= 0.5 // true or false
    };
    if (ShipLocationIsValid(ship, spotsOccupied)) {
      // now verify that the proposed location is in fact valid, AND NOT OVERLAPPING EXISTING SHIP!
      shipsArray.push(ship);
      occupySpots(ship, spotsOccupied);
    }
  }
  return shipsArray;
};

const ShipLocationIsValid = function(ship, spotsOccupiedObj) {
  if (ship.col === 6 && ship.horizontal === true) {
    return false;
  }
  // ship cannot start in 6th row and be vertical
  if (ship.row === 'f' && ship.horizontal === false) {
    return false;
  }
  if (ship.horizontal) {
    if (
      spotsOccupiedObj[ship.row][ship.col - 1] === 1 ||
      spotsOccupiedObj[ship.row][ship.col] === 1
    ) {
      return false; // ship cannot overlap an existing boat
    }
  } else {
    // ship is vertical
    if (
      spotsOccupiedObj[ship.row][ship.col - 1] === 1 ||
      spotsOccupiedObj[nextChar(ship.row)][ship.col - 1] === 1
    ) {
      return false; // ship cannot overlap an existing boat
    }
  }
  return true;
};

const occupySpots = function(ship, spotsOccupiedObj) {
  if (ship.horizontal) {
    spotsOccupiedObj[ship.row][ship.col - 1] = 1;
    spotsOccupiedObj[ship.row][ship.col] = 1;
  } else {
    //if ship is vertical
    spotsOccupiedObj[ship.row][ship.col - 1] = 1;
    spotsOccupiedObj[nextChar(ship.row)][ship.col - 1] = 1;
  }
};

const nextChar = function(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
};

ReactDOM.render(<App />, document.getElementById('root'));
