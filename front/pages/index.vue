<template>
  <div>
    <h1>Hello, AWS Dev Day!</h1>
    <p>{{ message }}</p>
  </div>
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
