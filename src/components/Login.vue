<template>
    <v-app light class="teal lighten-4">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Please Login</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                <v-form>
                <v-text-field prepend-icon="person" name="Username" label="Username" v-model="username"></v-text-field>
                <v-text-field prepend-icon="lock" name="Password" label="Password" type="password" v-model="password"></v-text-field>
                <v-card-actions>
                  <v-btn primary large block v-on:click="login()">Login</v-btn>
                </v-card-actions>
                </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data: () => ({
    username: 'frongnakub',
    password: '6679776z'
  }),
  methods: {
    login () {
      axios
        .post('http://localhost:3003/login', {
          username: this.username,
          password: this.password,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      if (this.username !== '' && this.password !== '') {
        if (
          this.username === this.$parent.mockAccount.username &&
          this.password === this.$parent.mockAccount.password
        ) {
          this.$emit('authenticated', true)
          this.$router.replace({ name: 'manageLesson' })
        } else {
          alert('The username or password is not correct')
        }
      } else {
        console.log('A username and password must be present')
      }
    }
  }
}
</script>
