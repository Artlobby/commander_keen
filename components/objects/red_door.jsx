import React from 'react';

class RedDoor extends React.Component{

  render(){
    let redDoor = (this.props.tileXLoc === this.props.redXLoc && this.props.tileYLoc === this.props.redYLoc)
    ? (<img className="keys" src="assets/red_door_keen.png"/>) : "";
    return(
      <div>
        { redDoor }
      </div>
    );
  }

}

export default RedDoor;
