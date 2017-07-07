import Board from './board';
import React from 'react';
import * as commander_keen from '../commander_keen';
import * as LevelDetails from './level_details';
import { merge } from 'lodash';
import { BOARD_WIDTH, BOARD_LENGTH } from './level_details';
import KeyList from './objects/key_list.jsx';

class Game extends React.Component{
  constructor(props) {
    super(props);
    this.level = 1;
    this.state = LevelDetails.level_1();
    this.restartGame = this.restartGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.moveBlocks = this.moveBlocks.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.handleKeyPickup = this.handleKeyPickup.bind(this);
    this.handleDoorOpening = this.handleDoorOpening.bind(this);
    this.impassables = this.state.wallLoc;
    this.impassables.push(this.state.yellowDoorLoc);
    this.impassables.push(this.state.redDoorLoc);

  }

  restartGame() {

  }

  updateGame(tile, flagged) {

  }

  illegalMoveObjects(e){


  }

  componentDidMount(){
    document.addEventListener("keyup", this.handleInputs.bind(this));
    document.addEventListener("keyup", this.moveBlocks.bind(this));
    document.addEventListener("keydown", this.handleResetGame.bind(this));
    document.addEventListener("keyup", this.handleKeyPickup.bind(this));
    document.addEventListener("keyup", this.handleDoorOpening.bind(this));

    if (this.level === 1){
      this.setState( () => {
        return LevelDetails.level_1();
      })
    }
  }

  handleResetGame(e){
    console.log(e.keyCode);
    let that = this;
    if (e.keyCode === 82) {
      switch (this.level ){
        case 1:
        that.setState( () => {
          return LevelDetails.level_1();
        });
        default:
        that.setState( () => {
          return LevelDetails.level_1();
        });
      }
    }
  }

  handleKeyPickup(){
    let keenLoc = this.state.keenLoc;
    let yellowKeyLoc = this.state.yellowKeyLoc;
    let yellowDoorLoc = this.state.yellowDoorLoc;
    let redDoorLoc = this.state.redDoorLoc;
    let redKeyLoc = this.state.redKeyLoc;
    console.log(this.impassables);
    let elementsToDelete = [];
    if ( keenLoc['x'] === yellowKeyLoc['x'] && keenLoc['y'] === yellowKeyLoc['y'] ){
      this.impassables.forEach( (impassable, idx) => {
        if (impassable['x'] === yellowDoorLoc['x'] && impassable['y'] === yellowDoorLoc['y']){
          elementsToDelete.push(idx);
        }
      })
      elementsToDelete.forEach( (el) => {
        this.impassables.splice(el, 1)
      });

      this.setState( () => {
        return {hasYellowKey: true};
      });
    }
    if ( keenLoc['x'] === redKeyLoc['x'] && keenLoc['y'] === redKeyLoc['y'] ){
      this.impassables.forEach( (impassable, idx) => {
        if (impassable['x'] === redDoorLoc['x'] && impassable['y'] === redDoorLoc['y']){
          elementsToDelete.push(idx);
        }
      })
      elementsToDelete.forEach( (el) => {
        this.impassables.splice(el, 1)
      });


      this.setState( () => {
        return {hasRedKey: true};
      });
    }

  }

  handleDoorOpening(){
    let keenLoc = this.state.keenLoc;
    let yellowDoorLoc = this.state.yellowDoorLoc;
    let redDoorLoc = this.state.redDoorLoc;
    let hasRedKey = this.state.hasRedKey;
    let hasYellowKey = this.state.hasYellowKey;
    if ( keenLoc['x'] === yellowDoorLoc['x'] && keenLoc['y'] === yellowDoorLoc['y'] && hasYellowKey ){
      this.setState( () => {
        return {yellowDoorOpen: true};
      });
    }

    if ( keenLoc['x'] === redDoorLoc['x'] && keenLoc['y'] === redDoorLoc['y'] && hasRedKey ){
      this.setState( () => {
        return {redDoorOpen: true};
      });
    }



  }

  componentDidUpdate(){
    // document.addEventListener("keyup", this.moveBlocks.bind(this));

  }

  moveBlocks(e){
    let keenLoc = this.state.keenLoc;
    // let blockArray = this.state.blockLoc.filter((el) => (el.x === keenLoc['x']-1 && el.y === keenLoc['y']));
    // let wallArray = this.state.wallLoc.filter((el) => (el.x === keenLoc['x']-1 && el.y === keenLoc['y']));
    // console.log("my block array")
    // console.log(blockArray);
    // if (blockArray.length === 1){
      // if there's exactly one thing in the way, do the following
      //we check if there's nothing in the way by filtering for things of where Keen will be
    this.setState( (prevState, props) => {
      let prevLoc = prevState.keenLoc;
      let newLoc = this.state.keenLoc;

      let immovableDoubles = this.state.wallLoc.concat(this.state.blockLoc);
      if (!this.state.yellowDoorOpen){
        immovableDoubles.push(this.state.yellowDoorLoc);
      }
      if (!this.state.redDoorOpen){
        immovableDoubles.push(this.state.redDoorLoc);
      }

      if (!this.state.hasYellowKey){
        immovableDoubles.push(this.state.yellowKeyLoc);
      }
      if (!this.state.hasRedKey){
        immovableDoubles.push(this.state.redKeyLoc);
      }



      let leftImmovables = immovableDoubles.filter( (el) => (el['x'] === keenLoc['x']-1) && el['y'] === keenLoc['y']);
      let rightImmovables = immovableDoubles.filter( (el) => (el['x'] === keenLoc['x']+1) && el['y'] === keenLoc['y']);
      let downImmovables = immovableDoubles.filter( (el) => (el['x'] === keenLoc['x']) && el['y'] === keenLoc['y']+1);
      let upImmovables = immovableDoubles.filter( (el) => (el['x'] === keenLoc['x']) && el['y'] === keenLoc['y']-1);

      console.log(leftImmovables.length)
      let blockLocOutput = this.state.blockLoc.map( (blockObj, id) => {
        if ( blockObj['x'] === keenLoc['x'] && blockObj['y'] === keenLoc['y'] && blockObj['x'] > 0) {
              if ( (e.keyCode === 65 || e.keyCode === 37) && leftImmovables.length === 0){
                return {x: keenLoc['x']-1, y: prevLoc['y']};
              } else if ( (e.keyCode === 65 || e.keyCode === 37) && leftImmovables.length > 0) {
                this.setState( () => {
                  return { keenLoc: {x: prevLoc['x']+1, y: prevLoc['y']} };
                });
                return prevState.blockLoc[id];
              }
              else if ((e.keyCode === 68 || e.keyCode === 39) && rightImmovables.length === 0){
                return {x: keenLoc['x']+1, y: prevLoc['y']};
              } else if ((e.keyCode === 68 || e.keyCode === 39) && rightImmovables.length > 0){
                this.setState( () => {
                  return { keenLoc: {x: prevLoc['x']-1, y: prevLoc['y']} };
                });
                return prevState.blockLoc[id];
              }
              else if ((e.keyCode === 83 || e.keyCode === 40) && downImmovables.length === 0) {
                return {x: keenLoc['x'], y: prevLoc['y']+1};
              } else if ((e.keyCode === 83 || e.keyCode === 40) && downImmovables.length > 0) {
                this.setState( () => {
                  return { keenLoc: {x: prevLoc['x'], y: prevLoc['y']-1} };
                });
                return prevState.blockLoc[id];
              }
              else if ((e.keyCode === 87 || e.keyCode === 38) && upImmovables.length === 0){
                return {x: keenLoc['x'], y: prevLoc['y']-1};
              } else if ((e.keyCode === 87 || e.keyCode === 38) && upImmovables.length > 0){
                this.setState( () => {
                  return { keenLoc: {x: prevLoc['x'], y: prevLoc['y']+1} };
                });
                return prevState.blockLoc[id];
              }
              else {
                return prevState.blockLoc[id];
              }
          } else {
            return prevState.blockLoc[id];
          }
        });
      return { blockLoc: blockLocOutput };
    });
  }

  handleInputs(e){
      if (e.keyCode === 65 || e.keyCode === 37){
        let keenLoc = merge({}, this.state.keenLoc);
        if ( (this.impassables.filter((el) => (el.x === keenLoc['x']-1
          && el.y === keenLoc['y'])).length === 0)
          && ( keenLoc['x']-1 >= 0 ) ) {
          this.setState( (prevState, props) => {
            let prev_loc = prevState.keenLoc;
            return { keenLoc: {x: prev_loc['x']-1, y: prev_loc['y']} };
          });
        }
      }

      if (e.keyCode === 68 || e.keyCode === 39){
        let keenLoc = merge({}, this.state.keenLoc);
        if ( (this.impassables.filter( (el) => (el.x === keenLoc['x']+1
            && el.y === keenLoc['y'])).length === 0)
            && ( keenLoc['x']+1 <= BOARD_WIDTH )){
            this.setState( (prevState, props) => {
              let prev_loc = prevState.keenLoc;
              return { keenLoc: {x: prev_loc['x']+1, y: prev_loc['y']} };
            });
        }
      }

      if (e.keyCode === 83 || e.keyCode === 40){
        let keenLoc = this.state.keenLoc
        if ( (this.impassables.filter( (el) => (el.x === keenLoc['x']
          && el.y === keenLoc['y']+1)).length === 0)
          && ( keenLoc['y']+1 <= BOARD_LENGTH )){
          this.setState( (prevState, props) => {
            let prev_loc = prevState.keenLoc;
            return { keenLoc: {x: prev_loc['x'], y: prev_loc['y']+1} }
          });
        }
      }

      if (e.keyCode === 87 || e.keyCode === 38){
        let keenLoc = this.state.keenLoc
        if ( (this.impassables.filter( (el) => (el.x === keenLoc['x']
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
      <div className="game-wrapper">
        {modal}
        <Board state={ this.state } board={this.state.board} updateGame={this.updateGame} />
        <section className="key-list-wrapper">
          <div className="key-list-title"> Keys </div>
          <KeyList hasRedKey={this.state.hasRedKey} hasYellowKey={this.state.hasYellowKey} />
        </section>
      </div>
    );
  }
}

export default Game;
