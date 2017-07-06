import Tile from './tile';
import React from 'react';

class Board extends React.Component{
  constructor(props){
    super(props);
    this.renderRows = this.renderRows.bind(this);
    this.renderTiles = this.renderTiles.bind(this);
  }

  render() {
    const board = this.props.board;
    const that = this;
    return(
      <div id="board">
        {this.renderRows()}
      </div>
    );
  }

  renderRows() {
    const board = this.props.board;
    return board.grid.map( (row, i) => {
      return (
        <div className="row" key={`row-${i}`}>
          {this.renderTiles(row, i)}
        </div>
      );
    });
  }

  renderTiles(row, i){
    const board = this.props.board;
    return row.map( (tile, j) => {
      return (
        <Tile
          x_loc={j}
          y_loc={i}
          state={this.props.state}
          tile={tile}
          updateGame={this.props.updateGame}
          key={i * board.gridSize + j} />
      );
    });
  }

}

export default Board;
