import React from 'react';
import 'phaser';
import { getGame } from './Game';
import GameContainer from './GameContainer';
import io from 'socket.io-client';
import config from '../config';
import styled from 'styled-components'
import useApplicationData from '../hooks/gameData'

const IN_PROGRESS = 'IN_PROGRESS';
const LEVEL = 'LEVEL';
const GAME_OVER = 'GAME_OVER';
const EASY = 'EASY';
const INTERMEDIATE = 'INTERMEDIATE';
const DIFFICULT = 'DIFFICULT';
const LOADING = 'LOADING';

export default function App() {

  const {
    state, 
    dispatch, 
    sentGame, 
    gameOver, 
    reset, 
    socketReady,
    setClean,
    setLevel
  } = useApplicationData();

  // console.log("App.js before render - state:", state, ", container:", state.containerState);

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
        <Title>☠Welcome to Battleship☠</Title>
        {state.containerState === LOADING && 
          <Title>{socketReady()}</Title>}
        {state.containerState === LOADING && 
          <Title onClick={() => setLevel(EASY)}>Easy</Title>}
        {state.containerState === LOADING && 
          <Title onClick={() => setLevel(INTERMEDIATE)}>Intermediate</Title>}
          {state.containerState === LOADING && 
          <Title onClick={() => setLevel(DIFFICULT)}>Difficult</Title>}
        {state.containerState === IN_PROGRESS && <Title>Game in progress</Title>}
        {state.containerState === GAME_OVER && 
          <Title onClick={() => reset()}>Restart Battleship</Title>}
      </div>
      {state.containerState === IN_PROGRESS && <GameContainer state={state} sentGame={sentGame} gameOver={gameOver} setClean={setClean} />}
    </React.Fragment>
  );
}
