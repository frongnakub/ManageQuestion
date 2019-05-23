<template>
<!--หน้านี้ไม่ได้ใช้-->
  <v-app id="web">
    <v-content>
      <v-container>
      <v-layout align-center justify-center>
        <span class="headline" >Add Question</span>
      </v-layout>
        <v-container>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-list-tile><h3>- Lesson</h3></v-list-tile>
          <v-select
              v-model="lesson_lessonNo"
              :items="lessons"
              item-text="lessonName"
              item-value="lessonNo"
              :rules="[v => !!v || 'Lesson required']"
              box
              required
            ></v-select>
          <v-list-tile><h3>- Question</h3></v-list-tile>
          <v-text-field
            label="Question*"
            v-model="question"
            required
            box
          ></v-text-field>
          <v-list-tile><h3>- Question for</h3></v-list-tile>
          <v-select
              v-model="test_testNo"
              :items="tests"
              item-text="testTypeName"
              item-value="testTypeNo"
              :rules="[v => !!v || 'Test required']"
              box
              required
            ></v-select>
          <v-list-tile><h3>- Description</h3></v-list-tile>
          <v-textarea
              label="Description"
              v-model="description"
              required
              box
          ></v-textarea>
          <v-card-actions class="justify-end">
            <v-btn primary v-on:click="close()">Cancle</v-btn>
            <v-btn primary v-on:click="addQuestion()">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditQuestion',
  data: () => ({
    select: null,
    lessons: [],
    question: '',
    description: '',
    test_testNo: Number,
    lesson_lessonNo: Number
  }),
  created () {
    this.initialize()
    this.testName()
  },
  methods: {
    initialize () {
      this.lessons = [
        axios
          .get('http://localhost:3003/lessonName')
          .then(response => {
            console.log(response)
            this.lessons = response.data
          })
          .catch(error => {
            console.log(error)
          })
      ]
    },
    addQuestion () {
      axios
        .post('http://localhost:3003/question', {
          question: this.question,
          description: this.description,
          test_testNo: Number(this.test_testNo),
          lesson_lessonNo: Number(this.lesson_lessonNo),
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response)
          this.items = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    testName () {
      this.tests = [
        axios
          .get('http://localhost:3003/testName')
          .then(response => {
            console.log(response)
            this.tests = response.data
          })
          .catch(error => {
            console.log(error)
          })
      ]
    },
    close () {
    this.$router.replace({ name: 'manageQuestion' })
    }
  }
}
</script>
