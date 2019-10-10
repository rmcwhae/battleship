# Pirate Battleship!

[*—You sank my pirate ship.*](https://www.youtube.com/watch?v=GkwMDkfrZ1M)

## Final Product

Key features:
1) Play against the Kraken in this single-player Battleship clone
2) Three different difficulty levels, set according to a basic probabilistic hit algorithm.
3) Phaser 3/React front-end with socket-connected API server for Kraken shot logic.

Key learnings:
1) Identified mission-critical functions and articulate the issues to discuss progress and contingency with mentors (project management).
2) Adapted validation over supervisory approach Working with remote mentor with experience in our gaming library.
3) Manage teams productivity and rebound from hurdles.
4) Focus on implementation: value effectiveness over being right.
5) Continuous deployment with Heroku

Future features:
1) Voice commands
2) Reinforcement learning via a separate API


### Mobile View

#### New Game
!["New Game Mobile"](./docs/battleship_mobile.png)

#### Playing a Game
!["Game in progress"](./docs/battleship_mobile_gaming.png)

### Desktop View

#### New Game
!["New Game"](./docs/battleship_newgame.png)

#### Game Board
!["Game Board"](./docs/battleship_gameboard.png)

#### Playing a Game
!["Playing a game"](./docs/battleship_game-in-progress.png)

#### Victory
!["Victory"](./docs/battleship_victory.png)


## Project Setup

## Built With

* [Phaser](https://phaser.io/) - Front-ender
* [React](https://reactjs.org/) - control front-end render and display
* [socket.io](https://socket.io/) - Sockets
* [jQuery](https://jquery.com/) - simple rendering page for /GET route to serve the server stateic file
* [Heroku](https://heroku.com) - continuous deployment

### Dependencies

- node
- express
- nodemon *devDependencies*
- Phaser 3
- React

### Installation

1. Clone this repo (the “client” repo).

2. Clone the [battleship-server](https://github.com/mikel-k-khui/battleship-server) repo (the “server” repo).

3. Install node dependencies in **both** the server and client directories: `npm install`

4. Start the server using `npm run watch`. The server console should say `Listening on port 8001 in development mode.`
*Note: nodemon is used, so you should not have to restart this server*

5. Start the client: `npm run watch`. The default port is 8080.

6. Open a new browser window and enter the local host with your port.
```
http://localhost:8080/
```

7. Have fun blowing ships up! Press Q or E to see fiery explosions.

## Testing

* Manual console.logs
* React Developer Tools for Google Chrome

## Contributing

As this is a student project there is currently no process for submitting pull requests.

## Versioning

* [SemVer](http://semver.org/) for versioning: version 1.0.0.

## Authors

* [**Russell McWhae**](https://github.com/rmcwhae)
* [**Michael Chui**](https://github.com/mikel-k-khui)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Credits

* Pirate Ships assets from https://www.kenney.nl/assets/pirate-pack
* Kraken from https://opengameart.org/content/kraken
* Phaser 3 and React project boilerplate from https://github.com/photonstorm/phaser3-project-template
