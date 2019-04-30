<template>
  <v-app id="web">
    <v-toolbar color="cyan" fixed app clipped-left>
      <v-toolbar-items >
        <v-btn flat><router-link to="/ManageLesson">Manage Lesson</router-link></v-btn>
        <v-btn flat>Manage Question</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-layout align-start>
        <v-btn color="orange darken-2"><router-link to="/ManageQuestion">Back</router-link>
          <v-icon dark>
          </v-icon>
        </v-btn>
      </v-layout>
      <v-layout align-center justify-center>
        <span class="headline" >Add Question</span>
      </v-layout>
      <v-container>
        <v-form
          ref="form"
          lazy-validation
        >
          <input type="text" v-model="question" placeholder="Question">
          <p> Question is {{question}}</p>
          <textarea v-model="description" placeholder="Description"></textarea>
          <p> Description is {{description}}</p>
          <input type="number" v-model="test_testNo" placeholder="testNo" >
          <p> TestNo is {{test_testNo}}</p>
          <input type="number" v-model="lesson_lessonNo" placeholder="lessonNo" >
          <p> Lesson is {{lesson_lessonNo}}</p>
          <v-card-actions>
                  <v-btn primary v-on:click="addQuestion()">Confirm</v-btn>
          </v-card-actions>
        </v-form>
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
    items: [],
    question: '',
    description: '',
    test_testNo: Number,
    lesson_lessonNo: Number
  }),
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.items = [
        axios
          .get('http://localhost:3003/lessonName')
          .then(response => {
            console.log(response)
            this.items = response.data
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
    }
  }
}
</script>
