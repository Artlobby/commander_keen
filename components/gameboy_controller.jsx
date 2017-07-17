import React from 'react';

class GameboyController extends React.Component{

  render(){
    return (
      <div onClick={this.props.leftButton} className="blue-square"> HELLO </div>
    )

  }

}

export default GameboyController;
