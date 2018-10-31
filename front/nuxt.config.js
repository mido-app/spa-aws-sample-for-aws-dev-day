export default {
  modules: [
    '@nuxtjs/dotenv',
  ],
  env: {
    API_URL: process.env.TEST_ENV
  }
}
