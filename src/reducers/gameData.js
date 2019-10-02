import { useEffect, useReducer } from "react";
import reducer, { SENT_GAME, RECEIVED_GAME, CONTAINER, SERVER, INCREMENT } from "./gameReducers";
import io from 'socket.io-client';
import config from '../config';
import sample from '../sample';
// console.log("Config", config);

const socket = io(config.API_PATH);

export default function useApplicationData = () {

  const [ state, dispatch ] = useReducer(reducer,
    { gameState: sample,
      count: 0,
      serverState: '',
      containerState: 'SETUP'
    });

    useEffect(() => {
      socket.on('connect', () => {  
        console.log("Socket connected:", socket.id, "with data:", socket);
        dispatch(SERVER, 'CONNECTED');
        socket.emit('appFeed', { board: { A: [0, 0], B: [0, 0] }, shot: 'A1' });
        socket.on('serverFeed', feed => {
          dispatch(RECEIVED_GAME, { payload: { gameState: feed, serverState: 'RECEIVED'}});
        });  
      }
    }, []);
  
  function sentGame(newGameState) {
    if (state.socket.id !== undefined && state.serverState === 'RECEIVED') {
      state.socket.emit('gameFeed', (req, res) => {
        console.log("Sucessful sent");
        dispatch(SENT_GAME, { payload: {gameState: newGameState, serverState: 'SENT'}});
      });
    }
  };

  function gameOver() {
    dispatch(SERVER, 'GAME OVER');
    socket.emit('disconnect');
  };

  function socketID() {
    return socket.id;
  };
  
  function setServer(serverState) {
    dispatch(SERVER, 'serverState')
  };

  function setContainer(containerState) {
    dispatch(CONTAINER, 'containerState')
  };

  const add = status => dispatch({ type: INCREMENT });

  return { state, dispatch, sentGame, gameOver, socketID, setContainer, add };
};