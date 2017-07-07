import React from 'react';

class YellowDoor extends React.Component{

  render(){
    let yellowDoor = (this.props.tileXLoc === this.props.yellowXLoc && this.props.tileYLoc === this.props.yellowYLoc)
    ? (<img className="keys" src="assets/yellow_door_keen.png"/>) : "";
    return(
      <div>
        { yellowDoor }
      </div>
    );
  }

}

export default YellowDoor;
