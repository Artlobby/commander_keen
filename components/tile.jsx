import React from 'react';
import Keen from './keen';
import YellowKey from './objects/yellow_key';
import Wall from './objects/wall';
import Block from './objects/block';
import YellowDoor from './objects/yellow_door';
import RedDoor from './objects/red_door';
import RedKey from './objects/red_key';
import Exit from './objects/exit';
import JunkFood from './objects/junk_food';


// import background from './components/ground_sprite.png';

class Tile extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    let tileXLoc = this.props['x_loc'];
    let tileYLoc = this.props['y_loc'];

    let keenXLoc = this.props.state.keenLoc['x'];
    let keenYLoc = this.props.state.keenLoc['y'];
    // let buttonXLoc = this.props.state.buttonLoc['x'];
    // let buttonYLoc = this.props.state.buttonLoc['y'];
    let klass = `tile unexplored`;
    if (this.props.state.buttonLoc){
      let filterSet = this.props.state.buttonLoc.filter( (loc) => {
        return ((loc['x'] === tileXLoc) && (loc['y'] === tileYLoc));
      });
      if ( filterSet.length > 0){
        klass = `tile button-tile`;
      }
    }

    let renderOutput = this.props.state.wallLoc ?
    (<section className="back-image">

        <div className={klass}>

          <Keen
            tileXLoc={tileXLoc}
            tileYLoc={tileYLoc}
            keenXLoc={keenXLoc}
            keenYLoc={keenYLoc}
          />


          <Block
            tileXLoc={tileXLoc}
            tileYLoc={tileYLoc}
            // blockXLoc={this.props.state.blockLoc.map( (el) => el['x'] )}
            // blockYLoc={this.props.state.blockLoc.map( (el) => el['y'] )}
            blockLoc={this.props.state.blockLoc}
          />

          <YellowKey
            tileXLoc={tileXLoc}
            tileYLoc={tileYLoc}
            yellowXLoc={this.props.state.yellowKeyLoc['x']}
            yellowYLoc={this.props.state.yellowKeyLoc['y']}
            hasYellowKey={this.props.state.hasYellowKey}

          />

          <RedKey
            tileXLoc={tileXLoc}
            tileYLoc={tileYLoc}
            redXLoc={this.props.state.redKeyLoc['x']}
            redYLoc={this.props.state.redKeyLoc['y']}
            hasRedKey={this.props.state.hasRedKey}
          />

          <Wall
            tileXLoc={tileXLoc}
            tileYLoc={tileYLoc}
            // wallXLoc={this.props.state.wallLoc.map( (el) => el['x'] )}
            // wallYLoc={this.props.state.wallLoc.map( (el) => el['y'] )}
            wallLoc={this.props.state.wallLoc}
          />

          <YellowDoor
            keenLoc={this.props.state.keenLoc}
            tileXLoc={tileXLoc}
            tileYLoc={tileYLoc}
            yellowXLoc={this.props.state.yellowDoorLoc['x']}
            yellowYLoc={this.props.state.yellowDoorLoc['y']}
            yellowDoorOpen={this.props.state.yellowDoorOpen}
          />

          <RedDoor
            keenLoc={this.props.state.keenLoc}
            tileXLoc={tileXLoc}
            tileYLoc={tileYLoc}
            redXLoc={this.props.state.redDoorLoc['x']}
            redYLoc={this.props.state.redDoorLoc['y']}
            redDoorOpen={this.props.state.redDoorOpen}
          />

          <Exit
            allButtonsCovered={this.props.allButtonsCovered}
            tileXLoc={tileXLoc}
            tileYLoc={tileYLoc}
            exitXLoc={this.props.state.exitLoc['x']}
            exitYLoc={this.props.state.exitLoc['y']}
          />

          <JunkFood
            tileXLoc={tileXLoc}
            tileYLoc={tileYLoc}
            junkLoc={this.props.state.junkLoc}
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
