import * as commander_keen from '../commander_keen';
import Board from './board';

export const BOARD_WIDTH = 8;
export const BOARD_LENGTH = 8;

const board = new commander_keen.Board(BOARD_WIDTH, BOARD_LENGTH);


export const level_1 = () => {
  return {
      level: 1,
      board: board,
      keenLoc: {x: 6, y: 1},
      exitLoc: {x: 4, y: 0},
      blockLoc: [{x: 5, y: 4},

                {x: 6, y: 3},
                {x: 4, y: 6},
                {x: 6, y: 4},
                {x: 4, y: 5},
                ],

      yellowDoorLoc: {x: 1, y: 5},
      yellowDoorOpen: false,
      yellowKeyLoc: {x: 6, y: 6},
      hasYellowKey: false,

      redDoorLoc: { x: 4, y: 1 },
      redDoorOpen: false,
      redKeyLoc: {x: 1, y: 6},
      hasRedKey: false,

      junkLoc: [{x: 1, y: 1},
                {x: 2, y: 1},
                {x: 1, y: 2}],

      wallLoc: [{x: 3, y: 1},
                {x: 5, y: 1},
                {x: 2, y: 5},
                {x: 2, y: 6},
                {x: 0, y: 0},
                {x: 0, y: 1},
                {x: 0, y: 2},
                {x: 0, y: 3},
                {x: 0, y: 4},
                {x: 0, y: 5},
                {x: 0, y: 6},
                {x: 0, y: 7},
                {x: 1, y: 7},
                {x: 2, y: 7},
                {x: 3, y: 7},
                {x: 4, y: 7},
                {x: 5, y: 7},
                {x: 6, y: 7},
                {x: 7, y: 7},
                {x: 7, y: 7},
                {x: 7, y: 0},
                {x: 7, y: 1},
                {x: 7, y: 2},
                {x: 7, y: 3},
                {x: 7, y: 4},
                {x: 7, y: 5},
                {x: 7, y: 6},
                {x: 1, y: 0},
                {x: 2, y: 0},
                {x: 3, y: 0},

                {x: 5, y: 0},
                {x: 6, y: 0},
                {x: 7, y: 0}],


  };
};
