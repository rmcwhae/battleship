import React from 'react';
import 'phaser';
import { getGame } from './Game';
import GameContainer from './GameContainer';
import io from 'socket.io-client';
import config from '../config';
import styled from 'styled-components';
import useApplicationData from '../hooks/gameData';
import introImg from "../assets/intro_boat.png";

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

  const TitleClickable = styled.h2`
    font-family: 'Inconsolata', monospace;
    font-size: 1.5em;
    text-align: center;
    color: lime;
    text-align: center;
    cursor: pointer;
    padding: 20px 50px;
    width: 50%;
    margin: 10px auto;
    border: 1px solid lime;
    border-radius: 3px;

    &:hover {
      color: white;
      border-color: white;
      background: #333;
    }
  `;

  return (
    <React.Fragment>
      <div style={{ textAlign: 'center' }}>
        {state.containerState === 'LEVEL' && <Title>Received</Title>}
        <Title>Welcome to Battleship!</Title>
        <img src={introImg} style={{height:"200px"}}></img>
        {state.containerState === LOADING && <Title>{socketReady()}</Title>}
        {state.containerState === LOADING && (
          <TitleClickable onClick={() => setLevel(EASY)}>
            😎 Easy
          </TitleClickable>
        )}
        {state.containerState === LOADING && (
          <TitleClickable onClick={() => setLevel(INTERMEDIATE)}>
            😬 Intermediate
          </TitleClickable>
        )}
        {state.containerState === LOADING && (
          <TitleClickable onClick={() => setLevel(DIFFICULT)}>
            ☠ Difficult
          </TitleClickable>
        )}
        {state.containerState === IN_PROGRESS && (
          <Title>Sink your opponent’s ships</Title>
        )}
        {state.containerState === GAME_OVER && (
          <TitleClickable onClick={() => reset()}>
            Restart Battleship
          </TitleClickable>
        )}
      </div>
      {state.containerState === IN_PROGRESS && (
        <GameContainer
          state={state}
          sentGame={sentGame}
          gameOver={gameOver}
          setClean={setClean}
        />
      )}
    </React.Fragment>
  );
}
