<template>
  <div class = "class">
    <h2> Manage Question </h2>
    <div  class="manage">
      <div class= "link">
            <li class="active"><a><router-link to="/Manage">Manage Question</router-link></a></li>
            <li><a><router-link to="/AddQuestion">Add Question</router-link></a></li>
      </div>
    </div>
    <div class="manageq">
        <router-link to="/Manage"><button type="button" id="back">&#8249;</button></router-link>
        <router-link to="/DeleteQuestion"><button type="button" id="delete"></button></router-link>
      <form action="/Manage">
          <p><label for="lesson">Lesson</label></p>
      </form>
      <div class="addq">
          <form action="/AddQuestion">
          <p><label for="question">Question</label></p>
          <input type="text" id="question" name="question" >
          <p><label for="choice">Choice</label></p>
          <div class="choices">
            <input type="text" id="choice" name="choice1" >
              <select id="choice" name="choice">
                <option ></option>
                <option value="true">T</option>
                <option value="false">F</option>
              </select>
            <input type="text" id="choice" name="choice2" >
              <select id="choice" name="choice">
                <option ></option>
                <option value="true">T</option>
                <option value="false">F</option>
                </select>
            <input type="text" id="choice" name="choice3" >
              <select id="choice" name="choice">
                <option ></option>
                <option value="true">T</option>
                <option value="false">F</option>
                </select>
            <input type="text" id="choice" name="choice4" >
              <select id="choice" name="choice">
                <option ></option>
                <option value="true">T</option>
                <option value="false">F</option>
                </select>
          </div>
          <p><label for="description">Description</label></p>
          <textarea id="description" name="description" ></textarea>
          <router-link to="/EditQuestion/submit"><button type="button" id="submit">Edit</button></router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditQuestion',
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
.manageq {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
p{
  text-align: left;
  font-size: 20px;
}
input[type=text]{
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}
textarea,select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}
textarea{
  size: fixed;
  height:200px;
}
button[type=button] {
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
button[type=button][id=back]{
  padding: 0 0;
  font-size: 50px;
  width: 50px;
  height: 60px;
  color: black;
}
button[type=button][id=delete]{
  width: 20px;
}
button[type=button][id=submit]{
  color: white;
  width: 20%;
  margin-left: 80%;
  background-color: #f45119;
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
