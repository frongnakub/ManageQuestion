<template>
  <div id="app">
    <v-container>
      <v-layout row class="text-xs-center">
        <v-flex xs3 >
          <v-card height="500px"></v-card>
        </v-flex>
        <v-flex xs4 class="grey lighten-4">
          <v-container style="position: relative;top: 13%;" class="text-xs-center">
            <v-card flat>
              <v-card-title primary-title>
                <h2>Please Login</h2>
              </v-card-title>
              <v-form>
              <v-text-field prepend-icon="person" name="Username" label="Username" v-model="input.username"></v-text-field>
              <v-text-field prepend-icon="lock" name="Password" label="Password" type="password" v-model="input.password"></v-text-field>
              <v-card-actions>
                <v-btn primary large block v-on:click="login()">Login</v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'TestVuetify',
  data () {
    return {
      input: {
        username: 'frongnakub',
        password: 'password'
      }
    }
  },
  methods: {
    login () {
      if (this.input.username !== '' && this.input.password !== '') {
        if (
          this.input.username === this.$parent.mockAccount.username &&
          this.input.password === this.$parent.mockAccount.password
        ) {
          this.$emit('authenticated', true)
          this.$router.replace({ name: 'manageLesson' })
        } else {
          console.log('The username and / or password is incorrect')
        }
      } else {
        console.log('A username and password must be present')
      }
    }
  }
}
</script>
