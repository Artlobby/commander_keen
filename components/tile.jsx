import React from 'react';
import Keen from './keen';
import YellowKey from './objects/yellow_key';
import Wall from './objects/wall';
import Block from './objects/block';
import YellowDoor from './objects/yellow_door';
import RedDoor from './objects/red_door';

// import background from './components/ground_sprite.png';

class Tile extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e) {
    const flagged = e.altKey ? true : false;
    this.props.updateGame(this.props.tile, flagged);
  }

  keenRender(e){

  }

  render() {
    let klass = 'unexplored';
    klass = `tile ${klass}`;
    let renderOutput = this.props.state.wallLoc ?
    (<section className="back-image">

        <div className={klass} onClick={this.handleClick}>

          <Keen tileXLoc={this.props['x_loc']}
            tileYLoc={this.props['y_loc']}
            keenXLoc={this.props.state.keenLoc['x']}
            keenYLoc={this.props.state.keenLoc['y']}
          />


          <Block
            tileXLoc={this.props['x_loc']}
            tileYLoc={this.props['y_loc']}
            // blockXLoc={this.props.state.blockLoc.map( (el) => el['x'] )}
            // blockYLoc={this.props.state.blockLoc.map( (el) => el['y'] )}
            blockLoc={this.props.state.blockLoc}
          />

          <YellowKey tileXLoc={this.props['x_loc']}
            tileYLoc={this.props['y_loc']}
            yellowXLoc={this.props.state.yellowKeyLoc['x']}
            yellowYLoc={this.props.state.yellowKeyLoc['y']}
          />

          <Wall
            tileXLoc={this.props['x_loc']}
            tileYLoc={this.props['y_loc']}
            // wallXLoc={this.props.state.wallLoc.map( (el) => el['x'] )}
            // wallYLoc={this.props.state.wallLoc.map( (el) => el['y'] )}
            wallLoc={this.props.state.wallLoc}
          />

          <YellowDoor
            tileXLoc={this.props['x_loc']}

            tileYLoc={this.props['y_loc']}
            yellowXLoc={this.props.state.yellowDoorLoc['x']}
            yellowYLoc={this.props.state.yellowDoorLoc['y']}
          />

          <RedDoor
            tileXLoc={this.props['x_loc']}

            tileYLoc={this.props['y_loc']}
            redXLoc={this.props.state.redDoorLoc['x']}
            redYLoc={this.props.state.redDoorLoc['y']}
          />

        </div>
    </section>) : ("");
    return (
      <div>
        {renderOutput}
      </div>
    );
  }
}

export default Tile;
