import Board from './board';
import React from 'react';
import * as commander_keen from '../commander_keen';
import * as LevelDetails from './level_details';
import { merge } from 'lodash';


class Game extends React.Component{
  constructor(props) {
    super(props);
    this.level = 1;
    this.state = LevelDetails.level_1();
    this.restartGame = this.restartGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.moveBlocks = this.moveBlocks.bind(this);

  }

  restartGame() {

  }

  updateGame(tile, flagged) {

  }

  componentDidMount(){
    document.addEventListener("keyup", this.handleInputs.bind(this));
    document.addEventListener("keyup", this.moveBlocks.bind(this));


    if (this.level === 1){
      this.setState( () => {
        return LevelDetails.level_1();
      })
    }
  }

  moveBlocks(e){
    let keenLoc = this.state.keenLoc;
    let blockArray = this.state.blockLoc.filter((el) => (el.x === keenLoc['x']-1 && el.y === keenLoc['y']));
    console.log("my block array")
    console.log(blockArray);
    // if (blockArray.length === 1){
      // if there's exactly one thing in the way, do the following
      //we check if there's nothing in the way by filtering for things of where Keen will be
    this.setState( (prevState, props) => {
      let prev_loc = prevState.keenLoc;
      let blockLocOutput = this.state.blockLoc.map( (blockObj, id) => {
        if ( blockObj['x'] === keenLoc['x'] && keenLoc['x'] === prevState.keenLoc['x'] && blockObj['y'] === keenLoc['y']) {
          console.log("moving block once to left!");
          return {x: prev_loc['x']-1, y: prev_loc['y']};
        } else {
          console.log("everything is normal folks");
          return prevState.blockLoc[id];
        }
      });
      console.log("my block loc output");
      console.log(blockLocOutput);
      return { keenLoc: {x: prev_loc['x']-1, y: prev_loc['y']}, blockLoc: blockLocOutput };
      });
    // }
  }

  handleInputs(e){
      if (e.keyCode === 65 || e.keyCode === 37){
        let keenLoc = this.state.keenLoc;
        if ( (this.state.wallLoc.filter((el) => (el.x === keenLoc['x']-1
          && el.y === keenLoc['y'])).length === 0)
          && ( keenLoc['x']-1 >= 0 ) ) {
          this.setState( (prevState, props) => {
            let prev_loc = prevState.keenLoc;
            return { keenLoc: {x: prev_loc['x']-1, y: prev_loc['y']} };
          });
        }
      }

      if (e.keyCode === 68 || e.keyCode === 39){
        let keenLoc = this.state.keenLoc;
        if ( (this.state.wallLoc.filter( (el) => (el.x === keenLoc['x']+1
            && el.y === keenLoc['y'])).length === 0)
            && ( keenLoc['x']+1 <= 8 )){
            this.setState( (prevState, props) => {
              let prev_loc = prevState.keenLoc;
              return { keenLoc: {x: prev_loc['x']+1, y: prev_loc['y']} }
            });
        }
      }

      if (e.keyCode === 83 || e.keyCode === 40){
        let keenLoc = this.state.keenLoc
        if ( (this.state.wallLoc.filter( (el) => (el.x === keenLoc['x']
          && el.y === keenLoc['y']+1)).length === 0)
          && ( keenLoc['y']+1 <= 8 )){
          this.setState( (prevState, props) => {
            let prev_loc = prevState.keenLoc;
            return { keenLoc: {x: prev_loc['x'], y: prev_loc['y']+1} }
          });
        }
      }

      if (e.keyCode === 87 || e.keyCode === 38){
        let keenLoc = this.state.keenLoc
        if ( (this.state.wallLoc.filter( (el) => (el.x === keenLoc['x']
          && el.y === keenLoc['y']-1)).length === 0 )
          && ( keenLoc['y']-1 >= 0 )){
          this.setState( (prevState, props) => {
            let prev_loc = this.state.keenLoc;
            return { keenLoc: {x: prev_loc['x'], y: prev_loc['y']-1} }
          });
        }
      }
  }





  render() {
    let modal;
    if (this.state.board.lost() || this.state.board.won()) {
      const text = this.state.board.won() ? "You won!" : "You lost!";
      modal =
        <div className='modal-screen'>
          <div className='modal-content'>
            <p>{text}</p>
            <button onClick={this.restartGame}>Play Again</button>
          </div>
        </div>;
    }

    return (
      <div className="zoom">
        {modal}
        <Board state={ this.state } board={this.state.board} updateGame={this.updateGame} />
      </div>
    );
  }
}

export default Game;
