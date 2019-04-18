<template>
  <div class="login">
    <div class="logins">
      <div class="main">
        <div class="form-w3agile">
          <h2>Please Login</h2>
          <div id="use">
          </div>
          <div class="key">
            <i class="fa fa-envelope" aria-hidden="true"></i>
            <input type="text" name="username" v-model="input.username" placeholder="Username"><br><br><br>
            <div class="clearfix"></div>
          </div>
          <div id="pass">
          </div>
          <div class="key">
            <i class="fa fa-lock" aria-hidden="true"></i>
            <input type="password" name="password" v-model="input.password" placeholder="Password"><br><br>
            <div class="cle arfix"></div>
          </div>
          <br>
          <div class="submit">
            <button type="button" v-on:click="login()">Login</button>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
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
          this.$router.replace({ name: 'manageQuestion' })
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
