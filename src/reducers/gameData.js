import { useEffect, useReducer } from "react";
import reducer, { SENT_GAME, RECEIVED_GAME, CONTAINER, SERVER, INCREMENT } from "./gameReducers";
import io from 'socket.io-client';
import config from '../config';
import sample from '../sample';
// console.log("Config", config);

const socket = io(config.API_PATH);

export default function useApplicationData () {
  console.log("Before initial state:", io.id, "and", socket.id);

  const [ state, dispatch ] = useReducer(reducer,
    { gameState: sample,
      count: 0,
      serverState: '',
      containerState: 'SETUP'
    });

    useEffect(() => {
      socket.on('connect', () => {  
        dispatch({ type: SERVER, serverState: 'CONNECTED'});

        // Create a confirmation to server this is a player
        socket.emit('player', socket.id, (initGameState) =>{
          console.log(initGameState);
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
        console.log("Sucessful sent");
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

  const add = status => dispatch({ type: INCREMENT });

  return { state, dispatch, sentGame, gameOver, socketID, setContainer, add };
};