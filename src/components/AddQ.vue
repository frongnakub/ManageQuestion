<template>
  <div class = "class">
    <h2> Add Question </h2>
    <div  class="manage">
      <div class= "link">
          <li><a><router-link to="/Manage">Manage Question</router-link></a></li>
          <li class="active"><a><router-link to="/AddQuestion">Add Question</router-link></a></li>
      </div>
  </div>
  <div class="submitAddQ">
    <form>
    <section>
      <h2>Add Question Success</h2>
      <p><label for="lesson">Lesson : </label></p>
      <p><label for="question">Question :  </label></p>
      <p><label for="choice">choices :  </label></p>
      <p><label for="description">Description :  </label></p>
      <router-link to="/Manage"><button type="button" id="ok" >OK</button></router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <router-link to="/AddQuestion"><button type="button" id="cancel" >cancel</button></router-link>
    </section>
    </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubmitAddQ',
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
.addq {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
p{
  text-align: left;
  font-size: 20px;
}
button[type=button] {
  width: 30%;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
button[type=button][id=ok]{
  background-color: #f45119;
}
button[type=button][id=cancel]{
  background-color: #999797;
}
button[type=button]:hover {
  opacity: 0.6
}
.choices select{
  width: 10%;
}
.choices input[type=text]{
  width: 80%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}
</style>
