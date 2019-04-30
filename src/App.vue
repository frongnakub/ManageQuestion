<template>
  <div>
    <v-toolbar color="cyan" fixed app clipped-left v-if="authenticated">
      <v-toolbar-items >
        <v-btn flat><router-link to="/ManageLesson">Manage Lesson</router-link></v-btn>
        <v-btn  flat><router-link to="/ManageQuestion">Manage Question</router-link></v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat >
        <router-link to="/" v-on:click.native="logout()" replace>Logout</router-link>
       </v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <router-view @authenticated ="setAuthenticated"/>
    <v-footer v-if="authenticated">
      <span class="black--text" >SIT KMUTT&copy; 2019</span>
    </v-footer>
  </div>
  <!--<div id="app">
      <div id = "logout">
        <router-link v-if="authenticated" to="/" v-on:click.native="logout()" replace>Logout</router-link>
      </div>
    <router-view @authenticated ="setAuthenticated"/>
  </div>-->
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      authenticated: false,
      mockAccount: {
        username: 'frongnakub',
        password: 'password'
      }
    }
  },
  mounted () {
    if (!this.authenticated) {
      this.$router.replace({name: 'TestVuetify'})
    }
  },
  methods: {
    setAuthenticated (status) {
      this.authenticated = status
    },
    logout () {
      this.authenticated = false
    }
  }
}
</script>
