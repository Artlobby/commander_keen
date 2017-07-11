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
      allButtonsCovered: false,
      blockLoc: [
                  {x: 5, y: 4},
                  {x: 6, y: 3},
                  {x: 4, y: 6},
                  {x: 6, y: 4},
                  {x: 4, y: 5},
                ],
      buttonLoc: [{x: 3, y: 4}],
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

export const level_2 = () => {
  return {
      level: 2,
      board: board,
      keenLoc: {x: 6, y: 1},
      exitLoc: {x: 0, y: 6},
      allButtonsCovered: false,
      buttonLoc: [{x: 3, y: 1}, {x: 3, y: 4}, {x: 5, y: 4}],
      blockLoc: [
        {x: 5, y: 1},
        {x: 6, y: 6},
        {x: 6, y: 4},

        {x: 1, y: 2},
        {x: 1, y: 2},
        {x: 3, y: 2},
        {x: 4, y: 2},
        {x: 5, y: 2},
        {x: 4, y: 4},
        {x: 6, y: 2},
        {x: 2, y: 6},
        {x: 2, y: 4},
        {x: 4, y: 5},
        {x: 5, y: 5},
        ],

      yellowDoorLoc: {x: 1, y: 1},
      yellowDoorOpen: false,
      yellowKeyLoc: {x: 6, y: 5},
      hasYellowKey: false,

      redDoorLoc: { x: 1, y: 6 },
      redDoorOpen: false,
      redKeyLoc: {x: 0, y: 1},
      hasRedKey: false,

      junkLoc: [{x: 5, y: 7},
                {x: 2, y: 2},
                {x: 6, y: 3}],
      wallLoc: [

                {x: 0, y: 0},
                {x: 0, y: 2},
                {x: 0, y: 3},
                {x: 0, y: 4},
                {x: 0, y: 5},
                {x: 0, y: 7},
                {x: 1, y: 7},
                {x: 2, y: 7},
                {x: 3, y: 7},
                {x: 4, y: 7},
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
                {x: 3, y: 0},
                {x: 4, y: 0},
                {x: 5, y: 0},
                {x: 6, y: 0},
                {x: 7, y: 0}
              ],
  };
};
export const level_3 = () => {
  return {
      level: 3,
      board: board,
      keenLoc: {x: 7, y: 0},
      exitLoc: {x: 6, y: 6},
      allButtonsCovered: false,

      buttonLoc: [
        {x: 3, y: 2},
        {x: 4, y: 2},
        {x: 3, y: 3},
        {x: 4, y: 3},
        {x: 2, y: 3},
        {x: 5, y: 3},
        {x: 4, y: 3},
        {x: 4, y: 4},
        {x: 3, y: 4},
        {x: 0, y: 0},
        {x: 7, y: 7},


      ],
      blockLoc: [
        {x: 3, y: 1},
        {x: 4, y: 1},
        {x: 2, y: 2},
        {x: 5, y: 2},
        {x: 1, y: 3},
        {x: 6, y: 3},
        {x: 5, y: 4},
        {x: 2, y: 4},
        {x: 3, y: 5},
        {x: 4, y: 5},


      ],

      yellowDoorLoc: {x: 1, y: -1},
      yellowDoorOpen: false,
      yellowKeyLoc: {x: 6, y: -5},
      hasYellowKey: false,

      redDoorLoc: { x: 1, y: -6 },
      redDoorOpen: false,
      redKeyLoc: {x: 0, y: -1},
      hasRedKey: false,

      junkLoc: [],
      wallLoc: [],
  };
};
