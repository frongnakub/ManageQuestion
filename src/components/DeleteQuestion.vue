<template>
  <div class = "class">
    <h2> Delete Question </h2>
    <div  class="manage">
      <div class= "link">
        <li><a><router-link to="/Manage">Home</router-link></a></li>
        <li ><a><router-link to="/AddQuestion">Add Question</router-link></a></li>
        <li><a><router-link to="/EditQuestion">Edit Question</router-link></a></li>
        <li class="active"><a><router-link to="/DeleteQuestion">Delete Question</router-link></a></li>
      </div>
    </div>
    <div class="dddq">
      <p><label for="lesson">Lesson</label></p>
          <select id="lesson" name="lesson">
            <option ></option>
            <option value="activeandpassive">Active / Passive</option>
            <option value="adjectiveandadverb">Adjective / Adverb</option>
            <option value="article">Article</option>
          </select>
      <p><label for="question">Question</label></p>
      <input type="text" id="mySearch" onkeyup="myFunction()" placeholder="Search.." >
      <span>show question</span>
      <input type="submit" id="summiteditquestion" value="Submit">
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
.dddq {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
p{
  text-align: left;
  font-size: 20px;
}
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
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
input[type=text]{
  padding: 12px 20px;
  margin-top: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  width: 100%;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
