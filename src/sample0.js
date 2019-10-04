// Data structure
module.exports = {
  gameState: {
    player_id: '123qwe456rty789uio',
    boards: {
      own: {
        a: [1, 1, 0, 0, 0, 0],
        b: [0, 1, 1, 0, 0, 0],
        c: [0, 0, 1, 0, 0, 0],
        d: [0, 0, 1, 0, 0, 0],
        e: [0, 0, 0, 1, 1, 0],
        f: [0, 0, 0, 0, 1, 1]
      },
      opponent: {
        a: [0, 0, 0, 1, 1, 0],
        b: [0, 0, 1, 1, 0, 0],
        c: [0, 0, 1, 0, 0, 0],
        d: [0, 0, 1, 0, 0, 0],
        e: [0, 1, 1, 0, 0, 0],
        f: [1, 1, 0, 0, 0, 0]
      }
    },
    shots: {
      own: {
        a: [0, 0, 0, 0, 0, 0],
        b: [0, 0, 0, 0, 0, 0],
        c: [0, 0, 0, 0, 0, 0],
        d: [0, 0, 0, 0, 0, 0],
        e: [0, 0, 0, 0, 0, 0],
        f: [0, 0, 0, 0, 0, 0]
      },
      opponent: {
        a: [1, 0, 0, 0, 0, 0],
        b: [0, 0, 0, 0, 0, 0],
        c: [0, 0, 0, 0, 0, 0],
        d: [0, 0, 0, 0, 0, 0],
        e: [0, 0, 0, 0, 0, 0],
        f: [0, 0, 0, 0, 0, 0]
      }
    },
    ships: {
      own: [
        { row: 'a', col: 1, size: 2, sunk: false, horizontal: true },
        { row: 'b', col: 2, size: 2, sunk: false, horizontal: true },
        { row: 'c', col: 3, size: 2, sunk: false, horizontal: false },
        { row: 'e', col: 4, size: 2, sunk: false, horizontal: true },
        { row: 'f', col: 5, size: 2, sunk: false, horizontal: true }
      ],
      opponent: [
        { row: 'a', col: 4, size: 2, sunk: false, horizontal: true },
        { row: 'b', col: 3, size: 2, sunk: false, horizontal: true },
        { row: 'c', col: 3, size: 2, sunk: false, horizontal: false },
        { row: 'e', col: 2, size: 2, sunk: false, horizontal: true },
        { row: 'f', col: 1, size: 2, sunk: false, horizontal: true }
      ]
    },
    turn: { player: 'player', row: '', col: '' }
  }
};
