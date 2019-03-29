<template>
  <div class = "class">
    <h2> Add Question </h2>
    <div  class="manage">
      <div class= "link">
            <li class="active"><router-link to="/AddQuestion">Add Question</router-link></li>
            <li><router-link to="/EditQuestion">Edit Question</router-link></li>
            <li><router-link to="/DeleteQuestion">Delete Question</router-link></li>
      </div>
     <!-- <div>
          <router-link to="/AddQuestion">Add Question</router-link>/
          <router-link to="/CheckAddQuestion">Check Add Question</router-link>/
          <router-link to="/FinishAddQuestion">Finish Add Question</router-link>
      </div>-->
      <div class="nav">
        <div class="dropdown">
          <p>Lesson : <button class="dropdownth">please select lesson</button></p>
          <div class="dropdown-content">

          </div>
        </div>
        <div>
          <p>Question :</p>
        </div>
        <div>
          <p>Choice :</p>
        </div>
        <div>
          <p>Choice is correct :</p>
        </div>
        <div>
          <p>Description of correct answer :</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddQuestion',
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
.link li{
  display: inline-block;
  color: black;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  font-size: 17px;
  border-radius: 5px;
}
.link li:hover{
  background-color: #dddddd;
  color: black;
}
.link li.active {
  background-color: dodgerblue;
  color: #ffffff
}
.nav{
  text-align: left;
  padding-left: 70px;
}
p{
  padding-top: 10px;
}
.dropdown{
  position: relative;
  display: inline-block;
}
.dropdownth{
  background-color: #ffffff;
  color: black;
  padding: 16px;
  font-size: 16px;
  border:2px solid #fdb515;
  border-radius: 5px;
}
</style>
