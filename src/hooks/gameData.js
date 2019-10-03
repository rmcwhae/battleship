import { useEffect, useReducer } from "react";
import reducer, { SENT_GAME, RECEIVED_GAME, CONTAINER, SERVER, INCREMENT, DECREASE, TOGGLE } from "./gameReducers";
import io from 'socket.io-client';
import config from '../config';
import sample0 from '../sample0';
import sample1 from '../sample1';
// console.log("Config", config);

const socket = io(config.API_PATH);
let staticGame = true;

export default function useApplicationData () {
  console.log("Before initial state:", io.id, "and", socket.id);

  const [ state, dispatch ] = useReducer(reducer,
    { gameState: sample0,
      count: 0,
      serverState: '',
      containerState: 'SETUP'
    });

    useEffect(() => {
      socket.on('connect', () => {  
        dispatch({ type: SERVER, serverState: 'CONNECTED'});

        // Create a confirmation to server this is a player
        socket.emit('player', socket.id, function (initGameState) {
          console.log("confirmed player:", initGameState);
          // dispatch({ type: RECEIVED_GAME, initGameState, serverState: 'RECEIVED', containerState: 'IN_PROGRESS'});
        });
        socket.on('serverFeed', feed => {
          console.log("Received data");
          dispatch({ type: RECEIVED_GAME, gameState: feed, serverState: 'RECEIVED'});
        });
        socket.on('error', (error) => {
          dispatch({ type: SERVER, serverState: 'ERROR'});
          socket.emit('disconnect');
        });  
      })
    }, []);
  
  function sentGame(newGameState) {
    if (socket.id !== undefined && state.serverState === 'RECEIVED') {
      socket.emit('gameFeed', (req, res) => {
        console.log("Sucessful sent", req, " and ", res);
        dispatch({ type: SENT_GAME, gameState: newGameState, serverState: 'SENT'});
      });
    }
  };

  function gameOver() {
    dispatch({ type: SERVER, serverState: 'GAME OVER'});
    socket.emit('disconnect');
  };

  function socketID() {
    return socket.id;
  };
  
  function setServer(newServerState) {
    dispatch({ type: SERVER, serverState: newServerState});
  };

  function setContainer(newContainerState) {
    dispatch({ type: CONTAINER, containerState: newContainerState});
  };

  const minus = () => dispatch({ type: DECREASE});

  const add = () => dispatch({ type: INCREMENT });

  function toggle(){
    if (staticGame === true) {
      console.log()
      staticGame = false;
      dispatch({ type: TOGGLE, gameState: sample0 });
    } else {
      staticGame = true;
      dispatch({ type: TOGGLE, gameState: sample1  })
    }
  };

  return { state, dispatch, sentGame, gameOver, socketID, setContainer, add, minus, toggle };
};