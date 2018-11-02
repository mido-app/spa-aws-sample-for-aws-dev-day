<template>
  <main>
    <h1>Sign Up</h1>
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
            <label for="email">Email</label>
          </td>
          <td>
            <input id="email" type="text" v-model="user.attributes.email" />
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
    <button @click="signUp">Sign Up</button>
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
        password: '',
        attributes: {
          email: ''
        },
        validationData: []
      }
    }
  },
  methods: {
    async signUp () {
      console.log('sign up start')
      try {
        let result = await Auth.signUp(this.user)
        console.log(result)
        console.log('sign up end')
        this.$router.push(`/confirm-sign-up?username=${result.user.username}`)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
