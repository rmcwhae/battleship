import { useEffect, useReducer, useState } from "react";
import reducer, { SENT_GAME, RECEIVED_GAME, CONTAINER, SERVER, RESET } from "./gameReducers";
import io from 'socket.io-client';
import config from '../config';
import sample0 from '../sample0';
import sample1 from '../sample1';
// console.log("Config", config);
let socket = io(config.API_PATH);

const IN_PROGRESS = 'IN_PROGRESS';
const LEVEL = 'LEVEL';
const GAME_OVER = 'GAME_OVER';
const CONNECTED = 'CONNECTED';
const LOADING = 'LOADING';
const RECEIVED = 'RECEIVED';
const SENT = 'SENT';

export default function useApplicationData() {
  
  const [ state, dispatch ] = useReducer(reducer,
    { gameState: sample0.gameState,
      level: undefined,
      serverState: '',
      containerState: LOADING,
      reset: false,
      turn: {},
      clean: undefined
    });

    useEffect(() => {
      if (state.reset) {
        console.log("Reset?", state.reset, "level:", state.level, " for ", state);

        dispatch({ type: RESET, 
          gameState: sample0.gameState,
          serverState: '',
          containerState: LOADING,
          turn: {}
        });
      }
      console.log("Reset?", state.reset, "level:", state.level, " for ", state);

      if (state.level) {
        if (state.serverState === '' || socket.connected) {
          socket.disconnect();
          socket.connect();
          console.log('Game level is ', state.level);
        };
        socket.on('connect', () => {
          console.log('Connect ', socket.id);

          if (state.clean !== undefined) {
                    // game.destroy(bootScene, true);
            state.clean.game.destroy(state.clean.bootScene, true);
            dispatch({ type: CONTAINER, clean: undefined });
          }

          dispatch({ type: SERVER, serverState: CONNECTED, containerState: LEVEL, reset: false });

          // Create a confirmation to server this is a player
          socket.emit('player', socket.id, state.level, function ({ gameState, clientId, serverId, ...rest }) {
            if (socket.id === serverId) {
              dispatch({ type: RECEIVED_GAME, serverState: RECEIVED, containerState: IN_PROGRESS, gameState });

              console.log("confirmed player after reducer:", gameState, clientId, serverId, rest, " is now", state);
            }
          });
        });

        socket.on('error', (error) => {
          dispatch({ type: SERVER, serverState: 'ERROR'});
          socket.emit('disconnect');
          alert('Server socket disconnected');
        });
      }
    }, [state.level]);

  function gameOver(destroyGameFn) {
    dispatch({ type: CONTAINER, containerState: GAME_OVER});
  };

  function reset() {
    console.log("Before reset:", state);

    dispatch({ type: RESET, 
      reset: true,
      level: undefined
    });
  };
    
  function sentGame(newGameState) {
    // console.log("Before emit to server and dispatch:", state);
    dispatch({ type: SENT_GAME, serverState: SENT });

    socket.emit('gameFeed', newGameState, ({ gameState }) => {
      // console.log("Sent shots and received callback before dispatch", state);

      dispatch({ type: RECEIVED_GAME, gameState, serverState: RECEIVED});
      // console.log("Sent shots and received callback", gameState);
    });
  };

  function setClean ({game, bootScene }) {
    dispatch({ type: CONTAINER, clean: { game, bootScene}  });
  };

  function setLevel (level) {
    dispatch({ type: CONTAINER, level });
  };

  function socketReady() {
    return (socket === undefined ? 'Gmae in progress…' : 'Select difficulty:');
  };

  return { state, dispatch, sentGame, gameOver, reset, socketReady, setClean, setLevel
  };
};