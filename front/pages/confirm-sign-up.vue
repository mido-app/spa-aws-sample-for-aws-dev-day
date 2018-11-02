<template>
  <main>
    <h1>Confirm your email address</h1>
    <p>We send confirmation code to your email address.</p>
    <p>Input confirmation code here</p>
    <input type="text" v-model="code" />
    <button @click="confirm">Confirm</button>
  </main>
</template>

<script>
import Amplyfy, { Auth } from 'aws-amplify'
import config from '~/aws-amplyfy.config'

Amplyfy.configure(config)

export default {
  async asyncData ({ route }) {
    // 本当はVuexとか使って受け渡すのがいいけど
    // 面倒なので一旦クエリパラメータで渡すことにした
    return {
      username: route.query.username
    }
  },
  data () {
    return {
      username: '',
      code: ''
    }
  },
  methods: {
    async confirm () {
      try {
        console.log('confirmation start')
        let result = await Auth.confirmSignUp(this.username, this.code)
        console.log(result)
        console.log('confirmation end')
        this.$router.push('/')
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

