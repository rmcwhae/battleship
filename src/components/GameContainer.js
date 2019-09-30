import * as React from 'react';
import Game from './Game';
// import App from './App.jsx';


export default function GameContainer(props) {
  console.log("Game Container's create Game has", props.state.count, "clicks");

  const [game, setGame] = React.useState();
  React.useEffect(() => {
    setGame(new Game({state: props.state, setState: props.setState}));
  }, [])

  React.useEffect(() => {
    console.log("Game is now ->", typeof game, game);
    game && game.setProps(props);
  }, [props.state]);

    console.log("Game Container's render");

  return (
    <section className="phaser-container" id="battleship" />
  );
}