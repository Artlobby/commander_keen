import React from 'react';

class KeyList extends React.Component{

  render(){
    let redKeySprite = (this.props['hasRedKey'])
    ? (<img className="label-key-1" src="assets/red_key.png"/>) : (<img className="label-key-1" src="assets/empty_key.png"/>);

    let yellowKeySprite = (this.props['hasYellowKey'])
    ? (<img className="label-key-2" src="assets/yellow_key.png"/>) : (<img className="label-key-2" src="assets/empty_key.png"/>);

    return(
      <div className="key-list-div-return">
        { yellowKeySprite }
        { redKeySprite }
      </div>
    );
  }

}

export default KeyList;



// let keyList = {yellowKey: "", redKey: ""};
// if (this.props.hasYellowKey === true){
//   keyList.push( <img className="keys" src="assets/yellow_key.png"/> );
// }
// if (this.props.hasYellowKey === true){
//   keyList.push( <img className="keys" src="assets/yellow_key.png"/> );
// }
