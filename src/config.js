export default {
  API_PATH: {
    development: 'localhost:8001',
    production: 'https://battleship-server-lhl.herokuapp.com/'
  }[process.env.NODE_ENV || 'development']
}