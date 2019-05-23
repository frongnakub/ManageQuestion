<template>
  <v-app light>
    <v-content>
      <v-container>
      <v-layout align-center justify-center>
        <span class="headline" >Add Choices</span>
      </v-layout>
        <v-container>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-list-tile><h3>- Question</h3></v-list-tile>
          <v-select
              v-model="question"
              :items="questions"
              item-text="question"
              item-value="questionNo"
              :rules="[v => !!v || 'Question required']"
              box
              required
            ></v-select>
          <v-list-tile><h3>- Choice</h3></v-list-tile>
          <v-text-field
            label="Choice"
            v-model="choices"
            required
            box
          ></v-text-field>
          <v-list-tile><h3>- True or False</h3></v-list-tile>
          <v-text-field
            label="True or False"
            v-model="choiceType"
            required
            box
          ></v-text-field>
          <v-card-actions class="justify-end">
            <v-btn primary v-on:click="close()" color="red darken-2">Cancle</v-btn>
            <v-btn primary v-on:click="addChoice()" color="light-green accent-4">Save</v-btn>
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
  name: 'AddChoice',
  data: () => ({
    select: null,
    questions: [],
    question: Number,
    choices: '',
    choiceType: ''
  }),
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.questions = [
        axios
          .get('http://localhost:3003/question')
          .then(response => {
            console.log(response)
            this.questions = response.data
          })
          .catch(error => {
            console.log(error)
          })
      ]
    },
    addChoice () {
      axios
        .post('http://localhost:3003/choices', {
          question_questionNo: Number(this.question),
          choices: this.choices,
          choiceType: this.choiceType,
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
    close () {
      this.$router.replace({ name: 'manageQuestion' })
    }
  }
}
</script>
