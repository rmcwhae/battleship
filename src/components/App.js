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
    toggle,
    setScene,
    gameOver,
    socketID,
    sentGame,
    setContainer
  } = useApplicationData();

  // console.log("App.js before render - server:", state.serverState, ", container:", state.containerState, ", game:", state.gameState);

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
        {state.containerState === 'ERROR' && <Title>Error - Aborting Game</Title> }
        <button onClick={() => add()}>Intermediate</button>
        <button onClick={() => minus()}>Toggle Static Board</button>
        <button onClick={() => sentGame({turn: { player: 'server', row: 'a', col: '1'}})}>Difficult</button>
      </div>
      <GameContainer state={state} sentGame={sentGame} setScene={setScene} gameOver={gameOver} />
    </React.Fragment>
  );
}
