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
      <form action="/Manage">
          <p><label for="lesson">Lesson</label></p>
            <select id="lesson" name="lesson">
              <option ></option>
              <option value="activeandpassive">Active / Passive</option>
              <option value="adjectiveandadverb">Adjective / Adverb</option>
              <option value="article">Article</option>
            </select>
      </form>
      <div>
        <p><label for="question">Question</label></p>
        <table>
          <tr>
            <td>Active / Passive</td>
            <td>The words _______ (explain) by the teacher today.</td>
            <td><router-link to="/EditQuestion"><button @click="Edit">edit</button></router-link></td>
            <td><router-link to="/DeleteQuestion"><button @click="Delete">delete</button></router-link></td>
          </tr>
          <tr>
            <td>Active / Passive</td>
            <td>We ______ (send) a letter the day before yesterday.</td>
          </tr>
        </table>
      </div>
      <button type="button" id="previous">&#8249;</button>
      of
      <button type="button" id="next">&#8250;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Manage',
  data () {
    return {
    }
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
table {
  width: 100%;
  border-collapse: collapse;
  border: none;
  background-color: white;
}
th, td {
  text-align: left;
  padding: 8px;
}
tr:hover {
  background-color: #F3C47E;
}
button[type=button] {
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>
