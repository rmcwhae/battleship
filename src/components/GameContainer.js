import * as React from 'react';
import Game from './Game';
// import App from './App.jsx';

class GameContainer extends React.Component {
  // game;

  constructor(props) {
    super(props);
    this.state = props.state;
    this.setState = props.setState;
    console.log("Conatiner constructor", props);
  }

  componentDidMount() {
    console.log("Game Container's create Game has", this.state.count, "clicks");
    new Game({state: this.state, setState: this.setState});
    console.log("Game Container's render");
  }

  render() {
    return (
      <section className="phaser-container" id="battleship" />
    );
  }
}

export default GameContainer;