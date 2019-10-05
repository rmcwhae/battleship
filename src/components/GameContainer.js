import * as React from 'react';
import Game from './Game';
// import App from './App.jsx';
let bootScene = undefined;

export default function GameContainer(props) {
  // console.log("Game Container's create Game has", props.state.count, "clicks");

  const [game, setGame] = React.useState();

  React.useEffect(() => {
    // console.log("Before game:", props);
    setGame(
      new Game({
        appState: props.state,
        sentGame: props.sentGame,
        setScene: props.setScene,
        gameOver: props.gameOver
      })
    );
  }, []);

  React.useEffect(() => {
    game && game.setProps(props);
    if (bootScene) {
      console.log('Checking scene in Container:', props);
      console.log('Game is now ->', props.state.gameState);
      bootScene.displayGrid(
        50,
        80,
        props.state.gameState.boards.own,
        props.state.gameState.shots.own,
        false
      );
      bootScene.renderShips(
        'playerBoard',
        props.state.gameState.ships.own,
        false,
        false
      );
      bootScene.explode('playerBoard', props.state.gameState.turn.shot.row, props.state.gameState.turn.shot.col, !props.state.gameState.turn.shot.hit); // give animation of red or blue explosion
    }
  }, [props.state.gameState]);

  bootScene = game && game.scene.getScene('Boot');

  return <section className="phaser-container" id="battleship" />;
}
