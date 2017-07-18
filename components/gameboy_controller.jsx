import React from 'react';

class GameboyController extends React.Component{

  render(){
    return (
    <div>
      <div onMouseUp={this.props.moveUp} className="top-square">  </div>
      <div onMouseUp={this.props.moveLeft} className="left-square">  </div>
      <div onMouseUp={this.props.moveRight} className="right-square">  </div>
      <div onMouseUp={this.props.buttonDown} className="bottom-square">  </div>
    </div>
    )

  }

}

export default GameboyController;
