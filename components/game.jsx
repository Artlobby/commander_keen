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
    this.restartGame = this.restartGame.bind(this);
    this.updateGame = this.updateGame.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
    this.moveBlocks = this.moveBlocks.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.handleKeyPickup = this.handleKeyPickup.bind(this);
    this.handleDoorOpening = this.handleDoorOpening.bind(this);
    this.validateKeenLoc = this.validateKeenLoc.bind(this);
    this.generalValidation = this.generalValidation.bind(this);
    this.handleJunkFoodPickup = this.handleJunkFoodPickup.bind(this);
    this.handleLevelCompletion = this.handleLevelCompletion.bind(this);

    this.level = 1;
    this.state = LevelDetails.level_1();
    this.impassables = this.state.wallLoc;
    this.impassables.push(this.state.yellowDoorLoc);
    this.impassables.push(this.state.redDoorLoc);
    this.remainingJunkFood = this.state.junkLoc.length;
  }

  restartGame() {

  }

  updateGame(tile, flagged) {

  }

  illegalMoveObjects(e){


  }

  componentDidMount(){
    document.addEventListener("keyup", this.handleJunkFoodPickup.bind(this));
    document.addEventListener("keyup", this.handleInputs.bind(this));
    document.addEventListener("keyup", this.moveBlocks.bind(this));
    document.addEventListener("keydown", this.handleResetGame.bind(this));
    document.addEventListener("keyup", this.handleKeyPickup.bind(this));
    document.addEventListener("keyup", this.handleDoorOpening.bind(this));
    document.addEventListener("keyup", this.handleDoorOpening.bind(this));
    document.addEventListener("keyup", this.handleLevelCompletion.bind(this));

    if (this.level === 1){
      this.setState( () => {
        return LevelDetails.level_1();
      })
    }
  }

  handleLevelCompletion(){
    

  }

  handleResetGame(e){
    if (e.keyCode === 82) {
      this.impassables = this.state.wallLoc;
      this.impassables.push(this.state.yellowDoorLoc);
      this.impassables.push(this.state.redDoorLoc);
      this.impassables.concat(this.state.junkLoc);



      switch (this.level ){
        case 1:
        this.setState( () => {
          return LevelDetails.level_1();
        });
        default:
        this.setState( () => {
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
    let elementsToDelete = [];
    if ( this.validateKeenLoc(yellowKeyLoc) ){
      this.impassables.forEach( (impassable, idx) => {
        if (this.generalValidation(impassable, yellowDoorLoc)){
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
    if ( this.validateKeenLoc(redKeyLoc) ){
      this.impassables.forEach( (impassable, idx) => {
        if (this.generalValidation(impassable, redDoorLoc)){
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

  handleJunkFoodPickup(keenLocX, keenLocY){
    let junkLoc = this.state.junkLoc;
      junkLoc.forEach( (junkFoodEl, idx) => {
        if (keenLocX === junkFoodEl['x'] && keenLocY === junkFoodEl['y']){
          junkLoc.splice(idx, 1);
        }
      });
    this.setState( () => {
      return {junkLoc: junkLoc};
    });
    this.remainingJunkFood = this.state.junkLoc.length;

  }

  validateKeenLoc(objLoc, optionsHash){
    let defaultOptions = {xAdj: 0, yAdj: 0};
    let finalOptions = merge({}, defaultOptions, optionsHash);
    let keenLoc = this.state.keenLoc;
    if((keenLoc['x'] + finalOptions['xAdj'] === objLoc['x'])
    && (keenLoc['y'] + finalOptions['yAdj'] === objLoc['y'])){
      this.handleJunkFoodPickup(keenLoc['x'], keenLoc['y']);
      return true;
    } else {
      return false;
    }
  }

  generalValidation(locObj1, locObj2){
      if( (locObj1['x'] === locObj2['x']) && (locObj1['y'] === locObj2['y'])){
        return true;
      } else {
        return false;
      }
  }

  handleDoorOpening(){
    let keenLoc = this.state.keenLoc;
    let yellowDoorLoc = this.state.yellowDoorLoc;
    let redDoorLoc = this.state.redDoorLoc;
    let hasRedKey = this.state.hasRedKey;
    let hasYellowKey = this.state.hasYellowKey;
    if ( this.validateKeenLoc(yellowDoorLoc) && hasYellowKey ){
      this.setState( () => {
        return {yellowDoorOpen: true};
      });
    }

    if ( this.validateKeenLoc(redDoorLoc) && hasRedKey ){
      this.setState( () => {
        return {redDoorOpen: true};
      });
    }
  }

  componentDidUpdate(){
    // document.addEventListener("keyup", this.moveBlocks.bind(this));

  }

  moveBlocks(e){
    console.log(this.state)

    let keenLoc = this.state.keenLoc;

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
      console.log(this.state.junkLoc);
      immovableDoubles.concat(this.state.junkLoc);
      console.log(immovableDoubles);

      let leftImmovables = immovableDoubles.filter( (el) => (this.validateKeenLoc(el, {xAdj: -1})));
      let rightImmovables = immovableDoubles.filter( (el) => (this.validateKeenLoc(el, {xAdj: 1})));
      let downImmovables = immovableDoubles.filter( (el) => (this.validateKeenLoc(el, {yAdj: 1})));
      let upImmovables = immovableDoubles.filter( (el) => (this.validateKeenLoc(el, {yAdj: -1})));

      let blockLocOutput = this.state.blockLoc.map( (blockObj, id) => {
        if ( this.validateKeenLoc(blockObj) && blockObj['x'] > 0) {
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
        if ( (this.impassables.filter((el) => (this.validateKeenLoc(el, {xAdj: -1}))).length === 0)
          && ( keenLoc['x']-1 >= 0 ) ) {
          this.setState( (prevState, props) => {
            let prev_loc = prevState.keenLoc;
            return { keenLoc: {x: prev_loc['x']-1, y: prev_loc['y']} };
          });


        }
      }

      if (e.keyCode === 68 || e.keyCode === 39){
        let keenLoc = merge({}, this.state.keenLoc);
        if ( (this.impassables.filter( (el) => (this.validateKeenLoc(el, {xAdj: 1}))).length === 0)
            && ( keenLoc['x']+1 <= BOARD_WIDTH )){
            this.setState( (prevState, props) => {
              let prev_loc = prevState.keenLoc;
              return { keenLoc: {x: prev_loc['x']+1, y: prev_loc['y']} };
            });
        }
      }

      if (e.keyCode === 83 || e.keyCode === 40){
        let keenLoc = this.state.keenLoc
        if ( (this.impassables.filter( (el) => (this.validateKeenLoc(el, {yAdj: 1}))).length === 0)
          && ( keenLoc['y']+1 <= BOARD_LENGTH )){
          this.setState( (prevState, props) => {
            let prev_loc = prevState.keenLoc;
            return { keenLoc: {x: prev_loc['x'], y: prev_loc['y']+1} }
          });
        }
      }

      if (e.keyCode === 87 || e.keyCode === 38){
        let keenLoc = this.state.keenLoc
        if ( (this.impassables.filter( (el) => (this.validateKeenLoc(el, {yAdj: -1}))).length === 0 )
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
          <div className="key-list-title"> Keys: </div>
          <KeyList hasRedKey={this.state.hasRedKey} hasYellowKey={this.state.hasYellowKey} />
          <div className="spacer"> </div>
        </section>
        <div className="remaining-food-title"> Food Needed: {this.remainingJunkFood} </div>

      </div>
    );
  }
}

export default Game;
