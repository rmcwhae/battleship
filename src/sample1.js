// Data structure
module.exports = {
  gameState: {
    player_id: 'sample1',
    boards: {
      own: {
        a: [0, 0, 0, 0, 0, 1],
        b: [0, 0, 0, 0, 0, 0],
        c: [0, 0, 0, 0, 0, 0],
        d: [0, 0, 0, 0, 0, 0],
        e: [0, 0, 0, 0, 0, 0],
        f: [1, 0, 0, 0, 0, 0]
      },
      opponent: {
        a: [1, 0, 0, 0, 0, 0],
        b: [0, 0, 0, 0, 0, 0],
        c: [0, 0, 0, 0, 0, 0],
        d: [0, 0, 0, 0, 0, 0],
        e: [0, 0, 0, 0, 0, 0],
        f: [0, 0, 0, 0, 0, 1]
      }
    },
    ships: {
      own: {
        1: { row: 'a', col: 1, size: 2, sunk: false, horizontal: true },
        2: { row: 'b', col: 2, size: 2, sunk: false, horizontal: true },
        3: { row: 'c', col: 3, size: 2, sunk: false, horizontal: false },
        4: { row: 'e', col: 4, size: 2, sunk: false, horizontal: true },
        5: { row: 'f', col: 5, size: 2, sunk: false, horizontal: true }
      },
      opponent: {
        1: { row: 'a', col: 2, size: 2, sunk: false, horizontal: true },
        2: { row: 'b', col: 3, size: 2, sunk: false, horizontal: true },
        3: { row: 'c', col: 3, size: 2, sunk: false, horizontal: false },
        4: { row: 'e', col: 2, size: 2, sunk: false, horizontal: true },
        5: { row: 'f', col: 1, size: 2, sunk: false, horizontal: true }
      }
    },
    turn: { player: 'server', row: '', col: '' }
  }
};
