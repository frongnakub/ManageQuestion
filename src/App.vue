<template>
  <div>
    <v-toolbar color="cyan" fixed app clipped-left v-if="authenticated">
      <v-toolbar-items >
        <v-btn flat to="/ManageLesson">Manage Lesson</v-btn>
        <v-btn flat to="/ManageQuestion">Manage Question</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/" v-on:click.native="logout()" replace>Logout
       </v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <router-view @authenticated ="setAuthenticated"/>
    <v-footer v-if="authenticated">
      <span class="black--text" >SIT KMUTT&copy; 2019</span>
    </v-footer>
  </div>

</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      authenticated: false,
      mockAccount: {
        username: 'frongnakub',
        password: '6679776z'
      }
    }
  },
  mounted () {
    if (!this.authenticated) {
      this.$router.replace({name: 'Login'})
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
