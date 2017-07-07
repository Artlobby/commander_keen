import React from 'react';

class YellowKey extends React.Component{

  render(){
    let yellowKeySprite = (this.props.tileXLoc === this.props.yellowXLoc && this.props.tileYLoc === this.props.yellowYLoc && !this.props.hasYellowKey)
    ? (<img className="keys" src="assets/yellow_key.png"/>) : "";
    return(
      <div>
        { yellowKeySprite }
      </div>
    );
  }

}

export default YellowKey;
