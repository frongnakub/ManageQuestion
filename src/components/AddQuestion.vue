<template>
  <v-app light >
    <v-content>
      <v-container></v-container>
      <v-container lime lighten-3>
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
              solo
              required
            ></v-select>
          <v-list-tile><h3>- Sub Lesson *If no, selects dat(-)</h3></v-list-tile>
          <v-select
              v-model="subLessonNo"
              :items="subLessons"
              item-text="subLessonName"
              item-value="subLessonNo"
              :rules="[v => !!v || 'Sub required']"
              solo
              required
          ></v-select>
          <v-list-tile><h3>- Question*</h3></v-list-tile>
          <v-text-field
            v-model="question"
            required
            solo
          ></v-text-field>
          <v-list-tile><h3>- Question for</h3></v-list-tile>
          <v-select
              v-model="test_testNo"
              :items="tests"
              item-text="testTypeName"
              item-value="testTypeNo"
              :rules="[v => !!v || 'Test required']"
              solo
              required
            ></v-select>
          <v-card-actions class="justify-end">
            <v-btn primary v-on:click="addQuestion()" color="light-green accent-4">Save</v-btn>
            <v-btn primary v-on:click="close()" color="red darken-2">Cancel</v-btn>
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
  name: 'AddQuestion',
  data: () => ({
    select: null,
    lessons: [],
    subLessons: [],
    question: '',
    test_testNo: Number,
    lesson_lessonNo: Number,
    subLessonNo: Number
  }),
  created () {
    this.initialize()
    this.testName()
    this.subLesson()
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
          test_testNo: Number(this.test_testNo),
          lesson_lessonNo: Number(this.lesson_lessonNo),
          subLessonNo: Number(this.subLessonNo),
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
      alert('Add question successfully')
      const actc = confirm('Do you want add choices for this question ?')
      if (actc === true) {
        this.$router.replace({ name: 'addChoice' })
      } else {
        this.$router.replace({ name: 'manageQuestion' })
      }
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
    subLesson () {
      this.subLessons = [
        axios
          .get('http://localhost:3003/subLessonName')
          .then(response => {
            console.log(response)
            this.subLessons = response.data
          })
          .catch(error => {
            console.log(error)
          })
      ]
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$router.replace({ name: 'manageQuestion' })
      }, 300)
    }
  }
}
</script>
