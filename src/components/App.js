import React, { useEffect, useState } from "react";
import 'phaser';
import { getGame } from './Game';
import GameContainer from './GameContainer';
import config from '../config';
console.log("Config", config);

export default function App() {
  const [state, setState] = useState({count: 0});
  
  function addClick() {
    setState({count: state.count + 1});
  };
  
  console.log("In Application - before render's return", state);
  return (
    <React.Fragment>
    <div style={{ textAlign: "center" }}>        
      <h1>Hello World</h1>
      <h2>{state.count}</h2>
      <button onClick={() => addClick()}>Click Here</button>
    </div>
      <GameContainer state={state} setState={setState}/>
    </React.Fragment>
  );

}