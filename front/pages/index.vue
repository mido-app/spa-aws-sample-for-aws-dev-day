<template>
  <main>
    <h1>Hello, AWS Dev Day!</h1>
    <p>{{ message }}</p>
    <div>
      <nuxt-link to="/sign-up">Sign Up</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/sign-in">Sign In</nuxt-link>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'

export default {
  async asyncData() {
    let message = await axios.get('/')
    return {
      message: message.data
    }
  },
  data() {
    return {
      message: ''
    }
  }
}
</script>
