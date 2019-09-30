import React, { useEffect, useReducer, useState } from "react";
import 'phaser';
import { getGame } from './Game';
import GameContainer from './GameContainer';
import reducer, { INCREASE, DECREASE } from "../reducers/gameReducers";

// export default class App extends React.Component {
export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  };

  addClick() {
    this.setState({
      count: this.state.count + 1,
    })
  };
  // const add = () => dispatch({ type: INCREASE });
  // const minus = () => dispatch({ type: DECREASE });

  render() {
    console.log("In Application - before render's return", this.state);
    return (
      <React.Fragment>
      <div style={{ textAlign: "center" }}>        
        <h1>Hello World</h1>
        <h2>{this.state.count}</h2>
        <button onClick={() => this.addClick()}>Click Here</button>
      </div>
        <GameContainer state={this.state} setState={newState => this.setState(newState)}/>
      </React.Fragment>
    );
  };
}