import React from 'react';

class Block extends React.Component{

  render(){
    let blockSprite = "";
    if (this.props.blockLoc){
       blockSprite = (this.props.blockLoc.filter( (el) =>
       ( el['x'] === this.props.tileXLoc && el['y'] === this.props.tileYLoc ) ).length > 0)
      ? (<img className="wall" src="assets/block_keen.png"/>) : "";
    }
    return(
      <div>
        { blockSprite }
      </div>
    );
  }

}

export default Block;
