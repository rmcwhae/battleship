import 'phaser';
import greenBoatImg from '../assets/green_battleship_sprite.png';
import waterImg from '../assets/battleship_sprite_water.png';
import explosionImg from '../assets/explosion.png';

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

let playerSpotsOccupied = {
  a: [0, 0, 0, 0, 0, 0],
  b: [0, 0, 0, 0, 0, 0],
  c: [0, 0, 0, 0, 0, 0],
  d: [0, 0, 0, 0, 0, 0],
  e: [0, 0, 0, 0, 0, 0],
  f: [0, 0, 0, 0, 0, 0]
};

let opponentSpotsOccupied = {
  a: [0, 0, 0, 0, 0, 0],
  b: [0, 0, 0, 0, 0, 0],
  c: [0, 0, 0, 0, 0, 0],
  d: [0, 0, 0, 0, 0, 0],
  e: [0, 0, 0, 0, 0, 0],
  f: [0, 0, 0, 0, 0, 0]
};

const getKeyByValue = function(object, value) {
  return Object.keys(object).find(key => object[key] === value);
};

export default class BootScene extends Phaser.Scene {
  constructor(props) {
    super('Boot');
  }

  // set props(props) {
  //   this.state = props.state;
  //   this.setState = props.setState;
  // }

  preload() {
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
    this.load.spritesheet('water', waterImg, {
      frameWidth: 60,
      frameHeight: 60
    });
  }

  create() {
    const leftTitle = this.add.text(200 - 360 / 2, 0, 'Your Ships', {
      font: '24pt "Inconsolata"',
      fill: 'green'
    });
    leftTitle.setInteractive({ useHandCursor: true });
    leftTitle.on('pointerup', () => {
      console.log('Bootscene ', this.game.state.count);
      this.game.setState({ count: this.game.state.count - 1 });
    });
    const rightTitle = this.add.text(650 - 360 / 2, 0, 'Opponent', {
      font: '24pt "Inconsolata"',
      fill: 'green'
    });

    const boardLength =
      gridDimensions.gridRows * gridDimensions.singleSquareLength;

    // const playerBoard = this.add.grid(
    //   200,
    //   230,
    //   boardLength,
    //   boardLength,
    //   gridDimensions.singleSquareLength,
    //   gridDimensions.singleSquareLength,
    //   0x057605
    // );

    const playerBoard = this.displayGrid(50, 80);
    const opponentBoard = this.displayGrid(500, 80);

    // const opponentBoard = this.add.grid(
    //   650,
    //   230,
    //   boardLength,
    //   boardLength,
    //   gridDimensions.singleSquareLength,
    //   gridDimensions.singleSquareLength,
    //   0x057605
    // );

    let playerOneShips = this.distributeShips(playerSpotsOccupied);
    let playerTwoShips = this.distributeShips(opponentSpotsOccupied);
    playerTwoShips[0].sunk = true;
    playerTwoShips[1].sunk = true;
    playerTwoShips[2].sunk = false;
    playerTwoShips[3].sunk = false;
    playerTwoShips[4].sunk = true;

    this.renderShips(this, 'playerBoard', playerOneShips, false);

    // console.log('after render', this);

    this.renderShips(this, 'opponentBoard', playerTwoShips, true);

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

    // this.input.onDown.add(this.clickHandler, this);
    // try to get a console.log like 'you clicked A3'

    // this.explode(this, 'playerBoard', 'a', 1);
    // this.explode(this, 'playerBoard', 'a', 2);
    // this.explode(this, 'playerBoard', 'b', 2);
    // this.explode(this, 'playerBoard', 'c', 3);
    // this.explode(this, 'playerBoard', 'd', 4);
    // this.explode(this, 'playerBoard', 'e', 5);
    // this.explode(this, 'playerBoard', 'f', 6);

    // this.explode(this, 'opponentBoard', 'e', 5);
    // this.explode(this, 'opponentBoard', 'f', 6);
  }
  // update() {

  // }

  renderShips = function(game, board, shipsArray, onlySunk) {
    let adjustmentx = 440; // hardcoded to align with opponent board
    let adjustmenty = 50;
    let frame = 0;
    if (board === 'playerBoard') {
      adjustmentx = -10;
    }
    // filter for only non-sunk ships if onlySunk flag tripped
    if (onlySunk) {
      shipsArray = shipsArray.filter(ship => ship.sunk === true);
    }
    // now display them
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

  explode = function(board, row, col) {
    let adjustmentx = 440;
    let adjustmenty = 20;
    if (board === 'playerBoard') {
      adjustmentx = -10;
    }
    const xcoord = gridDimensions.singleSquareLength * col + adjustmentx;
    const ycoord =
      gridDimensions.singleSquareLength * rowNumbers[row] + adjustmenty;
    const boom = this.add.sprite(xcoord, ycoord, 'boom');
    boom.anims.play('explode');
  };

  distributeShips = function(spotsOccupiedObj) {
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
      if (this.ShipLocationIsValid(ship, spotsOccupiedObj)) {
        // now verify that the proposed location is in fact valid, AND NOT OVERLAPPING EXISTING SHIP!
        shipsArray.push(ship);
        this.occupySpots(ship, spotsOccupiedObj);
      }
    }
    return shipsArray;
  };

  ShipLocationIsValid = function(ship, spotsOccupiedObj) {
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
        spotsOccupiedObj[this.nextChar(ship.row)][ship.col - 1] === 1
      ) {
        return false; // ship cannot overlap an existing boat
      }
    }
    return true;
  };

  occupySpots = function(ship, spotsOccupiedObj) {
    if (ship.horizontal) {
      spotsOccupiedObj[ship.row][ship.col - 1] = 1;
      spotsOccupiedObj[ship.row][ship.col] = 1;
    } else {
      //if ship is vertical
      spotsOccupiedObj[ship.row][ship.col - 1] = 1;
      spotsOccupiedObj[this.nextChar(ship.row)][ship.col - 1] = 1;
    }
  };

  nextChar = function(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  };

  onClick = function(item) {};

  displayGrid = function(xoffset, yoffset) {
    for (let i = 0; i < 6; i++) {
      for (let k = 0; k < 6; k++) {
        let tile = this.add
          .sprite(60 * i + xoffset, 60 * k + yoffset, 'water')
          .setInteractive();
        tile.on('pointerdown', function(pointer) {
          // console.log('clicked', i, k);
          // console.log('clicked', getKeyByValue(rowNumbers, k + 1), i + 1);
          // now send socket message to server…
          console.log('inside displayGrid', this);
        });
        // this.explode('opponentBoard', 'd', 4);
        // tile.anchor.setTo(0.5, 0.5);
      }
    }
  };
}
