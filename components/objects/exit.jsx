import React from 'react';

class Exit extends React.Component{
  
  render(){
    let redDoor = (this.props.tileXLoc === this.props.exitXLoc
      && this.props.tileYLoc === this.props.exitYLoc
      && this.props.allButtonsCovered)
    ? (<img className="exit-loc" src="assets/done.png"/>) : "";
    return(
      <div>
        { redDoor }
      </div>
    );
  }

}

export default Exit;
