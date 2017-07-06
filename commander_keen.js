export class Tile {
  constructor(board, pos) {
      this.board = board;
      this.pos = pos;
      this.explored = false;
      this.flagged = false;
  }

  adjacentBombCount() {

  }

  explore() {


  }

  neighbors() {

  }

  toggleFlag() {

  }

}

Tile.DELTAS = [[-1, -1], [-1,  0], [-1,  1], [ 0, -1],
             [ 0,  1], [ 1, -1], [ 1,  0], [ 1,  1]];

export class Board {
  constructor(gridSize, numBombs) {
    this.gridSize = gridSize;
    this.grid = [];
    this.generateBoard();
  }

  generateBoard() {
    for (let i = 0; i < this.gridSize; i++) {
      this.grid.push([]);
      for (let j = 0; j < this.gridSize; j++) {
        const tile = new Tile(this, [i, j]);
        this.grid[i].push(tile);
      }
    }
  }

  onBoard(pos) {
    return (
      pos[0] >= 0 && pos[0] < this.gridSize &&
        pos[1] >= 0 && pos[1] < this.gridSize
    );
  }

  plantBombs() {

  }

  lost() {

  }

  won() {

  }
}
