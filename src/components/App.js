import React, { useEffect, useState } from 'react';
import 'phaser';
import { getGame } from './Game';
import GameContainer from './GameContainer';
import io from 'socket.io-client';
import config from '../config';
import styled from 'styled-components'
import useApplicationData from '../reducers/gameData'

export default function App() {

  const {
    state,
    dispatch,
    add,
    gameOver,
    socketID
    sentGame,
    setContainer
  } = useApplicationData();

  console.log("In Application - before render's return", appState);

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
        <Title>Welcome to Battleship at {socket.id}</Title>
        <Title>{state.count}</Title>
        <Title>{state.turn}</Title>
        <button onClick={() => add()}>Click Here</button>
      </div>
      <GameContainer state={state} setState={sentGame} />
    </React.Fragment>
  );
}
