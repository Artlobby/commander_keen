import React from 'react';

class Keen extends React.Component{

  render(){
    let keenSprite = (this.props.tileXLoc === this.props.keenXLoc && this.props.tileYLoc === this.props.keenYLoc)
    ? (<img className="keen" src="assets/keen_sprite_2.png"/>) : "";
    return(
      <div>
        { keenSprite }
      </div>
    );
  }

}

export default Keen;
