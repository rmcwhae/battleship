import React from "react";
import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
font-family: 'Inconsolata', monospace;
font-size: 1.5em;
text-align: center;
color: lime;
text-align: center;
`;
export default class App extends React.Component {
  render() {
    return (
      <Title>Welcome To Battleship!</Title>
    );
  }
}