<template>
  <div class = "class">
    <h2> Manage Question </h2>
    <div  class="manage">
      <div class= "link">
        <nav>
          <ui>
            <li class="active"><a><router-link to="/Manage">Home</router-link></a></li>
            <li><a><router-link to="/AddQuestion">Add Question</router-link></a></li>
            <li><a><router-link to="/EditQuestion">Edit Question</router-link></a></li>
            <li><a><router-link to="/DeleteQuestion">Delete Question</router-link></a></li>
          </ui>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Manage',
  data () {
    return {}
  }
}
</script>

<style scoped>
.class {
  background-color: #ffffff;
}
.manage {
  overflow: hidden;
  background-color: #333;
}
.link {
  text-align: left
}
.link li {
  display: inline-block;
}
.link li a{
  display: inline-block;
  text-align: center;
  padding: 10px;
  text-decoration: none;
  font-size: 17px;
  color: #f2f2f2;
  text-align: center;
}
.link li:hover{
  background-color:  #f45119;
  color: black;
}
.active {
  background-color: #f45119;
  color: #ffffff
}
</style>
