import React from 'react';

class RedDoor extends React.Component{

  // render(){
  //   let redDoor = (this.props.tileXLoc === this.props.redXLoc && this.props.tileYLoc === this.props.redYLoc)
  //   ? (<img className="keys" src="assets/red_door_keen.png"/>) : "";
  //   return(
  //     <div>
  //       { redDoor }
  //     </div>
  //   );
  // }

  render(){

    let redDoorSprite = "";
    if (this.props.tileXLoc === this.props.redXLoc && this.props.tileYLoc === this.props.redYLoc && !this.props.redDoorOpen){
      redDoorSprite = (<img className="keys" src="assets/red_door_keen.png"/>);
    }
    if (this.props.tileXLoc === this.props.redXLoc && this.props.tileYLoc === this.props.redYLoc && this.props.redDoorOpen){
      redDoorSprite = ("");
    }

    if (this.props.tileXLoc === this.props.keenLoc['x'] && this.props.tileYLoc === this.props.keenLoc['y']){
      redDoorSprite = "";
    }

    return(
      <div>
        { redDoorSprite }
      </div>
    );
  }


}

export default RedDoor;
