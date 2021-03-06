import 'phaser';
import greenBoatImg from '../assets/green_battleship_sprite.png';
import waterImg from '../assets/battleship_sprite_water.png';
import explosionImg from '../assets/explosion.png';
import explosionImgBlue from '../assets/explosion_blue.png';
import krakenImg from '../assets/kraken_sprite.png';
import config from '../config';
import io from 'socket.io-client';
// import data from '../sample0';
import { SENT_GAME } from '../hooks/gameReducers';

// const sample = data.gameState;
const socket = io(config.API_PATH);

const gridDimensions = {
  singleSquareLength: 60,
  gridRows: 6
}; // e.g. we have a <gridRows> x <gridRows> square grid where each square has a width and height of <singleSquareLength>

let boats = {};
let rightTiles = [];
let playerOneShips = [];
let playerTwoShips = [];
let shotsOnPlayerOne = [];
let shotsOnOpponent = [];
let playerSpotsOccupied = [];
let opponentSpotsOccupied = [];
let krakenSprite;
let finalBoat1, finalBoat2, finalBoat3;
let boom, boomBlue;
let eKey;
let qKey;
const creditsMessage =
  'Created by Mike Chui and Russell McWhae in October 2019.';

const emptyBoard = {
  a: [1, 1, 0, 0, 0, 0],
  b: [0, 1, 1, 0, 0, 0],
  c: [0, 0, 1, 0, 0, 0],
  d: [0, 0, 1, 0, 0, 0],
  e: [0, 0, 0, 1, 1, 0],
  f: [0, 0, 0, 0, 1, 1]
};

const rowNumbers = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6
};

const getKeyByValue = function(object, value) {
  return Object.keys(object).find(key => object[key] === value);
};

const getRowLetterByNumber = function(rowNumber) {
  // rowNumber is 0-5, this will return a-f
  return getKeyByValue(rowNumbers, rowNumber + 1);
};

const nextChar = function(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
};

export default class BootScene extends Phaser.Scene {
  constructor(props) {
    super('Boot');
  }

  // reset these when new game starts
  rightTiles = [];
  shotsOnPlayerOne = emptyBoard;
  shotsOnOpponent = emptyBoard;
  playerSpotsOccupied = emptyBoard;
  opponentSpotsOccupied = emptyBoard;

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
    this.load.spritesheet('boomBlue', explosionImgBlue, {
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 23
    });
    this.load.spritesheet('water', waterImg, {
      frameWidth: 60,
      frameHeight: 60
    });
    this.load.spritesheet('kraken', krakenImg, {
      frameWidth: 96,
      frameHeight: 128
    });
  }

  create() {
    //  Input Events
    eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    const leftTitle = this.add.text(200 - 360 / 2, 0, 'Your Ships', {
      font: '24pt "Inconsolata"',
      fill: 'lime'
    });
    const rightTitle = this.add.text(650 - 360 / 2, 0, 'Kraken', {
      font: '24pt "Inconsolata"',
      fill: 'lime'
    });

    // set these from the server
    playerSpotsOccupied = this.game.appState.gameState.boards.own;
    shotsOnPlayerOne = this.game.appState.gameState.shots.own;
    opponentSpotsOccupied = this.game.appState.gameState.boards.opponent;
    shotsOnOpponent = this.game.appState.gameState.shots.opponent;

    const playerBoard = this.displayGrid(
      50,
      80,
      playerSpotsOccupied,
      shotsOnPlayerOne,
      false
    );
    const opponentBoard = this.displayGrid(
      500,
      80,
      opponentSpotsOccupied,
      shotsOnOpponent,
      true
    );

    console.log('In create():', playerOneShips);

    playerOneShips = this.game.appState.gameState.ships.own;
    playerTwoShips = this.game.appState.gameState.ships.opponent;
    this.renderShips('playerBoard', playerOneShips, false, true);
    this.renderShips('opponentBoard', playerTwoShips, true, true);

    const explodeconfig = {
      key: 'explode',
      frames: this.anims.generateFrameNumbers('boom', {
        start: 0,
        end: 23,
        first: 23
      }),
      frameRate: 20
    };

    const explodeconfigBlue = {
      key: 'explodeBlue',
      frames: this.anims.generateFrameNumbers('boomBlue', {
        start: 0,
        end: 23,
        first: 23
      }),
      frameRate: 20
    };

    this.anims.create(explodeconfig);
    this.anims.create(explodeconfigBlue);

    this.anims.create({
      key: 'krakenWalkLeft',
      frames: this.anims.generateFrameNumbers('kraken', { start: 7, end: 12 }),
      frameRate: 10,
      repeat: -1
    });

    this.waitForServer = false;

    // console.log('In create:', this.game.appState);
  }

  update() {

    if (Phaser.Input.Keyboard.JustDown(qKey)) {
      this.explodeAll('playerBoard', false);
    }
    if (Phaser.Input.Keyboard.JustDown(eKey)) {
      this.explodeAll('opponentBoard', true);
    }
    // if (this.game.appState.serverState === 'RECEIVED' && this.game.appState.board_render && this.count < 100) {
    if (this.waitForServer) {
      console.log(
        'in Phaser Update():',
        this,
        'status',
        this.game.appState.board_render,
        ' and ',
        this.game.appState,
        this.count
      );
      this.count += 1;
      this.game.setScene();
    }
  }

  addKraken = function(startx = 800, starty = 300, endx = -100, endy = 300) {
    krakenSprite = this.add.sprite(startx, starty, 'kraken', 7);
    krakenSprite.setDepth(100);
    krakenSprite.anims.play('krakenWalkLeft');
    this.tweens.add({
      targets: krakenSprite,
      x: endx,
      duration: 8800,
      ease: 'Linear'
    });
  };

  victoryBoats = function(startx = -100, starty = 300, endx = 950, endy = 300) {
    finalBoat1 = this.add.sprite(startx - 100, starty + 80, 'greenBoat', 0);
    finalBoat2 = this.add.sprite(startx, starty, 'greenBoat', 0);
    finalBoat3 = this.add.sprite(startx - 100, starty - 80, 'greenBoat', 0);
    finalBoat1.angle = 90;
    finalBoat1.setDepth(100);
    finalBoat2.angle = 90;
    finalBoat2.setDepth(100);
    finalBoat3.angle = 90;
    finalBoat3.setDepth(100);
    this.tweens.add({
      targets: [finalBoat1, finalBoat2, finalBoat3],
      x: endx,
      duration: 6000,
      ease: 'Linear'
    });
  };

  gameOverSequence = function(win) {
    let winmsg = 'You Lose';
    if (win) {
      winmsg = 'You Win';
    }
    const endGameMsg = this.add.text(100, 0, winmsg, {
      font: '120pt "Inconsolata"',
      fill: 'lime',
      stroke: '#000000',
      strokeThickness: 12
    });
    endGameMsg.setDepth(100);
    rightTiles.forEach(tile => tile.removeInteractive()); // disable further clicking on tiles
    rightTiles = [];
    const tween = this.tweens.add({
      // let's make it look pretty
      targets: endGameMsg,
      alpha: { from: 0, to: 1 },
      ease: 'Ease',
      duration: 1500,
      repeat: 0, // -1: infinity
      yoyo: false
    });
    if (!win) {
      this.explodeAll('playerBoard', false);
      const walkingKraken = this.addKraken();
    } else {
      this.explodeAll('opponentBoard', true);
      const victoryAnimation = this.victoryBoats();
    }
    const credits = this.add.text(130, 420, creditsMessage, {
      font: '16pt "Inconsolata"',
      fill: 'lime'
    });
    const creditsTween = this.tweens.add({
      // let's make it look pretty
      targets: credits,
      alpha: { from: 0, to: 1 },
      duration: 5000,
      repeat: 0, // -1: infinity
      yoyo: false
    });
    //reset all global variables to null
    boats = {};
    rightTiles = [];
    playerOneShips = [];
    playerTwoShips = [];
    shotsOnPlayerOne = [];
    shotsOnOpponent = [];
    playerSpotsOccupied = [];
    opponentSpotsOccupied = [];
  };

  renderShips = function(board, shipsArray, onlySunk, tweenMe) {
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
      let frame = 0;
      if (ship.hit && !ship.sunk) {
        frame = 1;
      }
      if (ship.sunk) {
        frame = 2;
      }
      boats[index] = this.add
        .sprite(
          ship.col * gridDimensions.singleSquareLength + adjustmentx,
          rowNumbers[ship.row] * gridDimensions.singleSquareLength +
            adjustmenty,
          'greenBoat',
          (frame = frame)
        )
        .setDepth(50);
      if (ship.horizontal) {
        boats[index].angle = 90;
        boats[index].x += gridDimensions.singleSquareLength / 2;
        boats[index].y -= gridDimensions.singleSquareLength / 2;
      }
      if (tweenMe) {
        const tween = this.tweens.add({
          // let's make it look pretty
          targets: boats[index],
          alpha: { from: 0, to: 1 },
          // alpha: { start: 0, to: 1 },
          // alpha: 1,
          // alpha: '+=1',
          ease: 'Back', // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 2000,
          repeat: 0, // -1: infinity
          yoyo: false
        });
      }
    });
  };

  explode = function(board, row, col, blue = false, offsetOverride = false) {
    let adjustmentx = 500;
    let adjustmenty = 20;
    if (board === 'playerBoard') {
      adjustmentx = -10;
    }
    if (offsetOverride) {
      adjustmentx = 500 - 60;
    }
    const xcoord = gridDimensions.singleSquareLength * col + adjustmentx;
    const ycoord =
      gridDimensions.singleSquareLength * rowNumbers[row] + adjustmenty;
    if (!blue) {
      boom = this.add.sprite(xcoord, ycoord, 'boom').setDepth(60);
      boom.angle = Phaser.Math.Between(-90, 90);
      boom.anims.play('explode');
    } else {
      boomBlue = this.add.sprite(xcoord, ycoord, 'boomBlue').setDepth(60);
      boomBlue.anims.play('explodeBlue');
      boomBlue.angle = Phaser.Math.Between(-90, 90);
    }
  };

  explodeAll = function(board, offsetOverride = false) {
    for (let i = 0; i < 3; i++) {
      Object.keys(rowNumbers).forEach(row => {
        for (let k = 1; k < 7; k++) {
          this.time.addEvent({
            delay:
              i * 2000 + (rowNumbers[row] + k) * 200 - 200,
            callback: () => {
              this.explode(board, row, k, false, offsetOverride);
            },
            loop: false
          });
        }
      });
    }
  };

  isHit = function(row, col, board) {
    return board[row][col] === 1;
  };

  areShipsSunk = function(shotsObj, shipsArray) {
    shipsArray.forEach(ship => {
      if (ship.horizontal) {
        if (
          shotsObj[ship.row][ship.col - 1] === 1 &&
          shotsObj[ship.row][ship.col] === 1
        ) {
          ship.sunk = true;
        }
      } else {
        if (
          shotsObj[ship.row][ship.col - 1] === 1 &&
          shotsObj[nextChar(ship.row)][ship.col - 1] === 1
        ) {
          ship.sunk = true;
        }
      }
    });
  };

  displayGrid = function(
    xoffset,
    yoffset,
    spotsOccupiedObj,
    shotsObj,
    opponentBoardFlag
  ) {
    for (let i = 0; i < 6; i++) {
      for (let k = 0; k < 6; k++) {
        let tile = this.add.sprite(60 * i + xoffset, 60 * k + yoffset, 'water');
        rightTiles.push(tile);

        const row = getRowLetterByNumber(k);
        const col = i;
        if (spotsOccupiedObj[row][col] === 1 && shotsObj[row][col] === 1) {
          tile.setFrame(3); // it's a hit!
        } else if (
          spotsOccupiedObj[row][col] === 0 &&
          shotsObj[row][col] === 1
        ) {
          tile.setFrame(2); // it's a miss!
        } else if (opponentBoardFlag) {
          // && turn?
          tile.setInteractive({
            useHandCursor: true
          }); // let's blow stuff up!
        }

        if (opponentBoardFlag) {
          tile.on('pointerover', function(pointer) {
            tile.setFrame(1);
          });
          tile.on('pointerout', function(pointer) {
            tile.setFrame(0);
          });
          tile.on('pointerdown', function(pointer) {
            shotsObj[row][col] = 1; // update the hit
            this.scene.game.sentGame({
              row: getRowLetterByNumber(k),
              col: i + 1
            });
            if (spotsOccupiedObj[row][col] === 1) {
              // It's a hit!
              this.scene.explode('opponentBoard', row, col);
              tile.setFrame(3);
              tile.removeInteractive();
              // now check if any boats are sunk
              this.scene.areShipsSunk(shotsObj, playerTwoShips);
              // and add these boats to the scene
              this.scene.renderShips(
                'opponentBoard',
                playerTwoShips,
                true,
                true
              ); // render any sunken ships
            }
            if (spotsOccupiedObj[row][col] === 0) {
              // It's a miss!
              this.scene.explode('opponentBoard', row, col, 1);
              tile.setFrame(2);
              tile.removeInteractive();
            }
          });
        }
      }
    }
  };
}
