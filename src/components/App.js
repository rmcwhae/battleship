import React, { useEffect, useReducer, useState } from "react";
import 'phaser';
import { getGame } from './Game';
import GameContainer from './GameContainer';
import reducer, { INCREASE, DECREASE } from "../reducers/gameReducers";

export default function App() {
// export default class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     count: 0,
  //   }
  // };
  const [state, setState] = useState({count: 0});
  
  function addClick() {
    // this.setState({
  //     count: this.state.count + 1,
  //   })
  // };
    setState({count: state.count + 1});
  };
  
  // const add = () => dispatch({ type: INCREASE });
  // const minus = () => dispatch({ type: DECREASE });

  // render() {
    // console.log("In Application - before render's return", this.state);
    // return (
    //   <React.Fragment>
    //   <div style={{ textAlign: "center" }}>        
    //     <h1>Hello World</h1>
    //     <h2>{this.state.count}</h2>
    //     <button onClick={() => this.addClick()}>Click Here</button>
    //   </div>
    //     <GameContainer state={this.state} setState={newState => this.setState(newState)}/>
    //   </React.Fragment>
    // );
  // };
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