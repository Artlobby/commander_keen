import * as commander_keen from '../commander_keen';
import Board from './board';

const board = new commander_keen.Board(7, 7);

export const level_1 = () => {
  return {
      level: 1,
      board: board,
      keenLoc: {x: 5, y: 3},
      yellowKeyLoc: {x: 1, y: 2},
      wallLoc: [{x: 4, y: 5},
                {x: 4, y: 4},
                {x: 4, y: 3},
                {x: 5, y: 5}],
      blockLoc: [{x: 0, y: 0},
                {x: 2, y: 2},
                {x: 3, y: 3}],
  };
};
