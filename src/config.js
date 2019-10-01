export default {
  API_PATH: {
    development: 'localhost:8080',
    production: 'fhgjkjjhg'
  }[process.env.NODE_ENV || 'development']
}