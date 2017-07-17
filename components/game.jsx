import React from 'react';

import * as commander_keen from '../commander_keen';
import * as LevelDetails from './level_details';

import Board from './board';
import GameboyController from './gameboy_controller';
import KeyList from './objects/key_list.jsx';

import { BOARD_WIDTH, BOARD_LENGTH } from './level_details';
import { merge } from 'lodash';

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
    this.handleButtonCoverage = this.handleButtonCoverage.bind(this);

    this.level = 1;
    this.state = LevelDetails.level_1();
    this.impassables = this.state.wallLoc;
    this.impassables.push(this.state.yellowDoorLoc);
    this.impassables.push(this.state.redDoorLoc);

    this.remainingJunkFood = this.state.junkLoc.length;

    this.foodNotification = false;
    this.winNotification = false;
    this.winner = false;
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
    document.addEventListener("keyup", this.handleButtonCoverage.bind(this));
    document.addEventListener("keyup", this.handleLevelCompletion.bind(this));

    this.level = 1;
    this.setState( () => {
        return LevelDetails.level_1();
      }
    );

  }

  handleLevelCompletion(e){
    let exitLoc = this.state.exitLoc;
    let buttonsCovered = this.state.allButtonsCovered;
    if (this.validateKeenLoc(exitLoc) && this.remainingJunkFood === 0 && buttonsCovered) {
      if (this.level === 3){
        this.setState( () => {
            return {winner: true};
          }
        );
      } else {
        this.level += 1;
        this.resetEvent();
        setTimeout(this.levelSwitch, 1000);
        this.levelSwitch();
      }
    } else if (this.validateKeenLoc(exitLoc) && this.remainingJunkFood > 0) {
      this.foodNotification = true;
      this.setState( () => {
          return {keenLoc: {x: 6, y: 1}};
        }
      );
    }
  }

  buttonsCovered(){
    let buttonLoc = this.state.buttonLoc;
    let blockLoc = this.state.blockLoc;
    let boolArray = [];
    let finalBool = true;
    buttonLoc.forEach( (button) => {
      let myBool = blockLoc.some( (block) => {
        return ((button['x'] == block['x']) && (button['y'] == block['y']));
      });
      if (myBool === false){
        finalBool = false;
      }
    });
    return finalBool;
  }

  handleButtonCoverage(){
    if (this.buttonsCovered()){
      this.setState( () => {
          return {allButtonsCovered: true};
        }
      );
    } else {
      this.setState( () => {
          return {allButtonsCovered: false};
        }
      );
    }
  }


  handleResetGame(e){
    if (e.keyCode === 82) {
      this.levelSwitch();
    }
  }

  resetEvent(e){
    this.levelSwitch();
  }

  levelSwitch(e){
    this.impassables = this.state.wallLoc.slice();
    this.impassables.push(this.state.yellowDoorLoc);
    this.impassables.push(this.state.redDoorLoc);
    this.impassables.concat(this.state.junkLoc);
    this.foodNotification = false;
    switch (this.level){
      case 1:
        this.setState( () => {
            return LevelDetails.level_1();
          });
        break;
      case 2:
        this.setState( () => {
            return LevelDetails.level_2();
          });
        break;
      case 3:
        this.setState( () => {
            return LevelDetails.level_3();
          });
        break;
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
      });
      elementsToDelete.forEach( (el) => {
        this.impassables.splice(el, 1);
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
      });
      elementsToDelete.forEach( (el) => {
        this.impassables.splice(el, 1);
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


  moveBlocks(e){
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

      if (this.state.junkLoc){
        this.state.junkLoc.forEach((junk) => {
          immovableDoubles.push(junk);
        });
      }

      let leftImmovables = immovableDoubles.filter( (el) => (this.validateKeenLoc(el, {xAdj: -1})));
      let rightImmovables = immovableDoubles.filter( (el) => (this.validateKeenLoc(el, {xAdj: 1})));
      let downImmovables = immovableDoubles.filter( (el) => (this.validateKeenLoc(el, {yAdj: 1})));
      let upImmovables = immovableDoubles.filter( (el) => (this.validateKeenLoc(el, {yAdj: -1})));

      let blockLocOutput = this.state.blockLoc.map( (blockObj, id) => {
        if ( this.validateKeenLoc(blockObj)) {
              if ( (e.keyCode === 65 || e.keyCode === 37) && leftImmovables.length === 0 && blockObj['x'] > 0){
                return {x: keenLoc['x']-1, y: prevLoc['y']};
              } else if ( (e.keyCode === 65 || e.keyCode === 37) && leftImmovables.length > 0  && blockObj['x'] > 0) {
                this.setState( () => {
                  return { keenLoc: {x: prevLoc['x']+1, y: prevLoc['y']} };
                });
                return prevState.blockLoc[id];
              }
              else if ((e.keyCode === 68 || e.keyCode === 39) && rightImmovables.length === 0 && blockObj['x'] < BOARD_WIDTH-1){
                return {x: keenLoc['x']+1, y: prevLoc['y']};
              } else if ((e.keyCode === 68 || e.keyCode === 39) && rightImmovables.length > 0 && blockObj['x'] < BOARD_WIDTH-1){
                this.setState( () => {
                  return { keenLoc: {x: prevLoc['x']-1, y: prevLoc['y']} };
                });
                return prevState.blockLoc[id];
              }
              else if ((e.keyCode === 83 || e.keyCode === 40) && downImmovables.length === 0 && blockObj['y'] < BOARD_WIDTH-1) {
                return {x: keenLoc['x'], y: prevLoc['y']+1};
              } else if ((e.keyCode === 83 || e.keyCode === 40) && downImmovables.length > 0) {
                this.setState( () => {
                  return { keenLoc: {x: prevLoc['x'], y: prevLoc['y']-1} };
                });
                return prevState.blockLoc[id];
              }
              else if ((e.keyCode === 87 || e.keyCode === 38) && upImmovables.length === 0 && blockObj['y'] > 0){
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
            && ( keenLoc['x']+1 < BOARD_WIDTH )){
            this.setState( (prevState, props) => {
              let prev_loc = prevState.keenLoc;
              return { keenLoc: {x: prev_loc['x']+1, y: prev_loc['y']} };
            });
        }
      }

      if (e.keyCode === 83 || e.keyCode === 40){
        let keenLoc = this.state.keenLoc
        if ( (this.impassables.filter( (el) => (this.validateKeenLoc(el, {yAdj: 1}))).length === 0)
          && ( keenLoc['y']+1 < BOARD_LENGTH )){
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


  leftButton(){
    console.log("left button firing from gameboy");
  }

  render() {
    let winnerBubble = this.state.winner ? (<img id="pixel-bubble" src="assets/pixel-bubble.gif"/>) : "";
    let level =
    <div className="level-text">
      <p> Level {this.level} of 3 </p>
    </div>




    let foodModal =
    this.foodNotification ?
    (<div className="food-modal">
      Need to collect more food!
    </div>) : (<div className="food-modal">

              </div>);

    return (
      <div className="game-wrapper">
        <Board state={ this.state } board={this.state.board} allButtonsCovered={this.state.allButtonsCovered} />
        <section className="key-list-wrapper">
          <div className="key-list-title"> Keys: </div>
          <KeyList hasRedKey={this.state.hasRedKey} hasYellowKey={this.state.hasYellowKey} />
          <div className="spacer"> </div>
        </section>
        <img id="background-body" src="http://i.imgur.com/HLqzt6p.png" />
        <div className="remaining-food-title"> Food Needed: {this.remainingJunkFood} </div>
        <div className="level-title"> {level} </div>
        {foodModal}
        {winnerBubble}
        {/* <GameboyController leftButton={this.leftButton} /> */}
      </div>
    );
  }
}

export default Game;
