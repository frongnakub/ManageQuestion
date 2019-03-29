<!--test-->
<template>
  <div class = "class">
    <h2> Add Question </h2>
    <div  class="manage">
      <div class= "link">
          <li><a><router-link to="/Manage">Home</router-link></a></li>
          <li class="active"><a><router-link to="/AddQuestion">Add Question</router-link></a></li>
          <li><a><router-link to="/EditQuestion">Edit Question</router-link></a></li>
          <li><a><router-link to="/DeleteQuestion">Delete Question</router-link></a></li>
      </div>
    </div>
      <div class="addq">
        <form action="/AddQuestion">
          <p><label for="lesson">Lesson : {{ lesson }}</label></p>
          <p><label for="question">Question: {{ question }}</label></p>
          <p><label for="choice">Choice</label></p>
          <div class="choices">
            <span>{{ choice1 }}{{ option.value }}</span>
            <span>{{ choice2 }}{{ option.value }}</span>
            <span>{{ choice3 }}{{ option.value }}</span>
            <span>{{ choice3 }}{{ option.value }}</span>
          </div>
          <p><label for="description">Description: {{ description }}</label></p>
          <input type="submit" id="summitaddquestion" value="Submit">
        </form>
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
input[type=submit] {
  width: 100%;
  background-color: #f45119;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
input[type=submit]:hover {
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
