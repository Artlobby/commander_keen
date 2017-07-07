import React from 'react';

class RedKey extends React.Component{

  render(){
    let redKeySprite = (this.props.tileXLoc === this.props.redXLoc && this.props.tileYLoc === this.props.redYLoc && !this.props.hasRedKey)
    ? (<img className="keys" src="assets/red_key.png"/>) : "";
    return(
      <div>
        { redKeySprite }
      </div>
    );
  }

}

export default RedKey;
