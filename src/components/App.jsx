import React from "react";
import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
font-family: 'Inconsolata', monospace;
font-size: 1.5em;
text-align: center;
color: lime;
`;
export default class App extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Title>Welcome To Battleship!</Title>
      </div>
    );
  }
}