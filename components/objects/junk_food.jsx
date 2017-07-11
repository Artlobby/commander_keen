import React from 'react';

class JunkFood extends React.Component{
  constructor(props){
    super(props)
    this.imgOutputArray = [(<img className="food" src="assets/candy_apple.png"/>), (<img className="wall" src="assets/candy_bar.png"/>), (<img className="wall" src="assets/birthday_cake.png"/>)];
    this.imgOutput = this.imgOutputArray[Math.floor(Math.random()*3)];

  }

  render(){
    let blockSprite = "";

    // let imgOutput = (<img className="wall" src="assets/candy_apple.png"/>)

    if (this.props.junkLoc){
       blockSprite = (this.props.junkLoc.filter( (el) =>
       ( el['x'] === this.props.tileXLoc && el['y'] === this.props.tileYLoc ) ).length > 0)
      ? (this.imgOutput) : "";
    }

    return(
      <div>
        { blockSprite }
      </div>
    );
  }

}

export default JunkFood;
