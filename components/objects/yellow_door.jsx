import React from 'react';

class YellowDoor extends React.Component{

  render(){

    let yellowDoorSprite = "";
    if (this.props.tileXLoc === this.props.yellowXLoc && this.props.tileYLoc === this.props.yellowYLoc && !this.props.yellowDoorOpen){
      yellowDoorSprite = (<img className="keys" src="assets/yellow_door_keen.png"/>);
    }
    
    if (this.props.tileXLoc === this.props.yellowXLoc && this.props.tileYLoc === this.props.yellowYLoc && this.props.yellowDoorOpen){
      yellowDoorSprite = ("");
    }

    if (this.props.tileXLoc === this.props.keenLoc['x'] && this.props.tileYLoc === this.props.keenLoc['y']){
      yellowDoorSprite = "";
    }

    return(
      <div>
        { yellowDoorSprite }
      </div>
    );
  }

}

export default YellowDoor;
