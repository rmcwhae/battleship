import React, { useEffect, useState } from "react";
import 'phaser';
import { getGame } from './Game';
import GameContainer from './GameContainer';
import io from 'socket.io-client';
import config from '../config';
// console.log("Config", config);

const socket = io(config.API_PATH);

export default function App() {

  const [appState, setApp] = useState({count: 0});
  const [sockState, setSock] = useState('Initialize');
  
  // Initial setup of the socket
  if (sockState === 'Initialize') {
    console.log('In socket.on:', socket, '@', config.API_PATH);

    socket.on('connect', () => {  
      console.log("Socket connected:", socket.id, "with data:", socket);
      setSock('connected');
      socket.emit('appFeed', { board: {A: [0,0], B: [0,0]}, shot: 'A1' });
    });
  }
  
  socket.on('serverFeed', (feed) => {
    console.log('Received feed from server in client:', feed);
  });

  function addClick() {
    setApp({count: appState.count + 1});
    socket.emit('appFeed', { board: {A: [1,1], B: [1,1]}, shot: 'A1' });
    setSock('listening');
  };
  console.log("In Application - before render's return", appState);
  
  return (
    <React.Fragment>
    <div style={{ textAlign: "center" }}>        
      <h1>Hello World at {sockState}</h1>
      <h2>{appState.count}</h2>
      <button onClick={() => addClick()}>Click Here</button>
    </div>
      <GameContainer state={appState} setState={setApp}/>
    </React.Fragment>
  );

}