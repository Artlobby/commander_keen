import React from 'react';

class Wall extends React.Component{

  render(){
    let wallSprite = "";
    if (this.props.wallLoc){
       wallSprite = (this.props.wallLoc.filter( (el) =>
       ( el['x'] === this.props.tileXLoc && el['y'] === this.props.tileYLoc ) ).length > 0)
      ? (<img className="wall" src="assets/wall.png"/>) : "";
    }
    return(
      <div>
        { wallSprite }
      </div>
    );
  }

}

export default Wall;
