import React from 'react';
import 'phaser';
import { getGame } from './Game';
import GameContainer from './GameContainer';
import io from 'socket.io-client';
import config from '../config';
import styled from 'styled-components'
import useApplicationData from '../hooks/gameData'

export default function App() {

  const {
    state,
    dispatch,
    add,
    minus,
    setScene,
    gameOver,
    reset,
    socketID,
    sentGame,
    setContainer
  } = useApplicationData();

  console.log("App.js before render - state:", state, ", container:", state.containerState);

  const Title = styled.h2`
    font-family: 'Inconsolata', monospace;
    font-size: 1.5em;
    text-align: center;
    color: lime;
    text-align: center;
  `;

  
  return (
    <React.Fragment>
      <div style={{ textAlign: 'center' }}>
        <Title>Welcome to Battleship at {socketID()}</Title>
        <Title>{state.count}</Title>
        {state.containerState === 'LEVEL' && <Title>Received</Title>}
        <button onClick={() => minus()}>Toggle Static Board</button>
        {state.containerState === 'GAME_OVER' && 
          <Title onClick={() => reset()}>Restart Battleship</Title>}
        <button onClick={() => add()}>Difficult</button>
      </div>
      {state.containerState !== 'LEVEL' && <GameContainer state={state} sentGame={sentGame} setScene={setScene} gameOver={gameOver} />}
    </React.Fragment>
  );
}
