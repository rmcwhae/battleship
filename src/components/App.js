import React from 'react';
import 'phaser';
import { getGame } from './Game';
import GameContainer from './GameContainer';
import io from 'socket.io-client';
import config from '../config';
import styled from 'styled-components';
import useApplicationData from '../hooks/gameData';
import introImg from '../assets/intro_boat.png';

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
    width: 61%;
    margin: 10px auto;
  `;

  const TitleClickable = styled.h2`
    font-family: 'Inconsolata', monospace;
    font-size: 1.5em;
    text-align: center;
    color: lime;
    cursor: pointer;
    padding: 20px 5%;
    width: 51%;
    margin: 10px auto;
    border: 1px solid lime;
    border-radius: 3px;

    &:hover {
      color: #218ffd;
      border-color: #218ffd;
      background: #00152a;
    }
  `;

  const IntroPara = styled.p`
    font-family: 'Inconsolata', monospace;
    font-size: 1.2em;
    text-align: justify;
    color: lime;
    margin: 20px auto;
    width: 61%;
  `;

  return (
    <React.Fragment>
      <div style={{ textAlign: 'center' }}>
        {state.containerState === 'LEVEL' && <Title>Received</Title>}
        <Title>Welcome to Pirate Battleship!</Title>
        <img src={introImg} style={{ height: '200px' }}></img>
        <IntroPara>
          In this take on the classic Battleship game, you and the pirate hive
          mind both start with five ships randomly distributed across a 6x6
          grid. You will then take turns firing shots at each other, with each
          boat requiring two hits to sink. The first to sink all five of the
          other’s ships wins. Be careful not to anger the Kraken with careless
          bombardment, however…
        </IntroPara>
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
          <Title>Sink your opponent’s ships. Playing on difficulty level: {state.level}</Title>
        )}
        {state.containerState === GAME_OVER && (
          <TitleClickable onClick={() => reset()}>
            👉 Restart Battleship
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
