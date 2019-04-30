<template>
    <v-app>
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
                <v-text-field prepend-icon="person" name="Username" label="Username" v-model="input.username"></v-text-field>
                <v-text-field prepend-icon="lock" name="Password" label="Password" type="password" v-model="input.password"></v-text-field>
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
