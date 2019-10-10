import * as React from 'react';
import Game from './Game';
// import App from './App.jsx';
// let visibleBoats;

export default function GameContainer(props) {
  // console.log("Game Container's create Game has", props.state.count, "clicks");
  let bootScene = undefined;

  const [game, setGame] = React.useState();

  React.useEffect(() => {
    // console.log("Before game:", props);
    setGame(
      new Game({
        appState: props.state,
        sentGame: props.sentGame
      })
    );
  }, []);

  React.useEffect(() => {
    // console.log("in container", props.state);
    // visibleBoats = null;

    game && game.setProps(props);
    if (bootScene) {
      // console.log('Checking scene in Container:', props);
      // console.log('Game is now ->', game, " with state", props.state.gameState);
      bootScene.displayGrid(
        50,
        80,
        props.state.gameState.boards.own,
        props.state.gameState.shots.own,
        false
      );
      // visibleBoats = 
      bootScene.renderShips(
        'playerBoard',
        props.state.gameState.ships.own,
        false,
        false
      );
      bootScene.explode(
        'playerBoard',
        props.state.gameState.turn.shot.row,
        props.state.gameState.turn.shot.col,
        !props.state.gameState.turn.shot.hit
      ); // give animation of red or blue explosion

      if (props.state.gameState.endGame.gameOver) {
        bootScene.gameOverSequence(
          props.state.gameState.endGame.winner === 'player'
          );
        props.gameOver();
        // game.destroy(bootScene, true);
        props.setClean({ game, bootScene });
      } // check if game is over then change state to render reset
    }      
  }, [props.state.gameState, props.state.level]);

  bootScene = game && game.scene.getScene('Boot');

  return <section className="phaser-container" id="battleship" />;
}
