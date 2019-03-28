<template>
  <div class = "class">
    <h2> Delete Question </h2>
    <div  class="manage">
      <div class= "link">
        <nav>
          <ui>
            <li><router-link to="/AddQuestion">Add Question</router-link></li>
            <li><router-link to="/EditQuestion">Edit Question</router-link></li>
            <li><router-link to="/DeleteQuestion">Delete Question</router-link></li>
          </ui>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteQuestion',
  data () {
    return {}
  }
}
</script>

<style scoped>
.class {
  background-color: #ffffff;
}
.link {
  text-align: left
}
</style>
