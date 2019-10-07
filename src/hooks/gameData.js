import { useEffect, useReducer, useState } from "react";
import reducer, { SENT_GAME, RECEIVED_GAME, CONTAINER, SERVER, INCREMENT, DECREASE, RESET } from "./gameReducers";
import io from 'socket.io-client';
import config from '../config';
import sample0 from '../sample0';
import sample1 from '../sample1';
// console.log("Config", config);
const socket = io(config.API_PATH);
let staticGame = true;

export default function useApplicationData () {

  
  const [ state, dispatch ] = useReducer(reducer,
    { gameState: sample0.gameState,
      count: 0,
      serverState: '',
      containerState: 'LEVEL',
      reset: false,
      turn: {}
    });

    useEffect(() => {
          console.log("Reset?", state.reset, " for ", socket);
          if (state.reset) {
            socket.connect();
          }

      socket.on('connect', () => {
        dispatch({ type: SERVER, serverState: 'CONNECTED', reset: false });

        // Create a confirmation to server this is a player
        socket.emit('player', socket.id, function ({ gameState, clientId, serverId, ...rest }) {
          if (socket.id === serverId) {
            // console.log("Before emit to server and dispatch:", state.serverState);

            dispatch({ type: RECEIVED_GAME, serverState: 'RECEIVED', containerState: 'IN_PROGRESS', gameState });

            // console.log("confirmed player after reducer:", gameState, clientId, serverId, randomShots, knownShots, rest, " is now", state);
          }
        });
        // socket.on('serverFeed', feed => {
        //   console.log("Received data", feed);
        //   dispatch({ type: RECEIVED_GAME, gameState: feed, serverState: 'RECEIVED'});
        // });
        socket.on('error', (error) => {
          dispatch({ type: SERVER, serverState: 'ERROR'});
          socket.emit('disconnect');
          alert('Server socket disconnected');
        });
      })
    }, [state.reset]);
  
  function sentGame(newGameState) {
      // console.log("Before emit to server and dispatch:", state);
      dispatch({ type: SENT_GAME, serverState: 'SENT' });
  
      socket.emit('gameFeed', newGameState, ({ gameState }) => {
        // console.log("Sent shots and received callback before dispatch", state);

        dispatch({ type: RECEIVED_GAME, gameState, serverState: 'RECEIVED'});
        // console.log("Sent shots and received callback", gameState);
      });
  };

  function gameOver() {
    dispatch({ type: CONTAINER, containerState: 'GAME_OVER'});
  };

  function reset() {
    console.log("Before disconnect", socket);
    socket.disconnect();
    console.log("In after disconnect", socket);
    dispatch({ type: RESET, gameState: sample0.gameState,
      serverState: '',
      containerState: 'LEVEL',
      reset: true,
      turn: {}
    });

  };

  function socketID() {
    return socket && socket.id;
  };

  function setContainer(newContainerState) {
    dispatch({ type: CONTAINER, containerState: newContainerState});
  };

  const minus = () => dispatch({ type: DECREASE});

  const add = () => dispatch({ type: INCREMENT });

  return { state, dispatch, sentGame, gameOver, reset, socketID, setContainer, add, minus
    // , toggle
  };
};