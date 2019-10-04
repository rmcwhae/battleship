import { useEffect, useReducer, useState } from "react";
import reducer, { SENT_GAME, RECEIVED_GAME, CONTAINER, SERVER, INCREMENT, DECREASE, TOGGLE, SCENE } from "./gameReducers";
import io from 'socket.io-client';
import config from '../config';
import sample0 from '../sample0';
import sample1 from '../sample1';
// console.log("Config", config);
const socket = io(config.API_PATH);
let staticGame = true;

export default function useApplicationData () {

  
  const [ state, dispatch ] = useReducer(reducer,
    { gameState: sample0,
      count: 0,
      serverState: '',
      containerState: 'LEVEL',
      board_render: 'true',
      randomShots: [],
      knownShots: []
    });

    useEffect(() => {
      socket.on('connect', () => {
        dispatch({ type: SERVER, serverState: 'CONNECTED' });

        // Create a confirmation to server this is a player
        socket.emit('player', socket.id, function ({ gameState, clientId, serverId, randomShots, knownShots, ...rest }) {
          if (socket.id === serverId) {
            dispatch({ type: RECEIVED_GAME, serverState: 'RECEIVED', containerState: 'IN_PROGRESS', gameState, randomShots, knownShots });
            console.log("confirmed player after reducer:", gameState, clientId, serverId, randomShots, knownShots, rest, " is now", state);
          }
        });
        socket.on('serverFeed', feed => {
          console.log("Received data", feed);
          dispatch({ type: RECEIVED_GAME, gameState: feed, serverState: 'RECEIVED'});
        });
        socket.on('error', (error) => {
          dispatch({ type: SERVER, serverState: 'ERROR'});
          socket.emit('disconnect');
        });
        // socket.on('disconnect', (error) => {
        //   dispatch({ type: SERVER, serverState: 'GAME OVER'});
        //   alert('Server socket disconnected');
        // });  

      })
    }, []);
  
  function sentGame(newGameState) {
    // console.log("Before emit to server:", socket.id, " with ",state.serverState);
    // if (socket.id !== undefined && state.serverState === 'RECEIVED') {
      socket.emit('gameFeed', newGameState, (feed) => {
        console.log("Sucessful sent", feed);
        dispatch({ type: SENT_GAME, gameState: newGameState, serverState: 'SENT'});
      });
    // }
  };

  function setScene() {
    dispatch({ type: SCENE, board_render: !state.board_render });
  };

  function gameOver() {
    dispatch({ type: SERVER, serverState: 'GAME OVER'});
    socket.emit('disconnect');
  };

  function socketID() {
    return socket && socket.id;
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

  return { state, dispatch, sentGame, setScene, gameOver, socketID, setContainer, add, minus, toggle };
};