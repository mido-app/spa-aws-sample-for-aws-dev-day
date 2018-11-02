<template>
  <main>
    <h1>Sign In</h1>
    <table>
      <tbody>
        <tr>
          <td>
            <label for="username">User Name</label>
          </td>
          <td>
            <input id="username" type="text" v-model="user.username" />
          </td>
        </tr>
        <tr>
          <td>
            <label for="password">Password</label>
          </td>
          <td>
            <input id="password" type="password" v-model="user.password" />
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="signIn">Sign In</button>
  </main>
</template>

<script>
import Amplyfy, { Auth } from 'aws-amplify'
import config from '~/aws-amplyfy.config'

Amplyfy.configure(config)

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async signIn () {
      console.log('sign in start')
      try {
        let result = await Auth.signIn(this.user.username, this.user.password)
        console.log(result)
        console.log('sign in end')
        this.$router.push('/')
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
