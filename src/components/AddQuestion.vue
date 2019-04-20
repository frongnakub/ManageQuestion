<template>
  <v-app>
    <v-form>
        <v-text-title>
          <span class="headline">Add Question</span>
        </v-text-title>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-list-tile>Question*</v-list-tile>
                  <v-text-field
                    v-model="addItem.question"
                    solo
                    :rule="questionErrors"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile >Questions Type*</v-list-tile>
                  <v-radio-group
                    row
                    v-model="addItem.questionType"
                    :rule="radiotErrors"
                  >
                    <v-radio
                      label="Pre Test"
                      value="preTest"
                    ></v-radio>
                    <v-radio
                      label="Exercise"
                      value="exercise"
                    ></v-radio>
                    <v-radio
                      label="Post Test"
                      value="postTest"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile>Lesson*</v-list-tile>
                  <v-select
                    solo
                    v-model="addItem.lesson"
                    :items="lessonName"
                    :rule="selectErrors"
                    label="Lesson"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile>Sub-Lesson*</v-list-tile>
                  <v-select
                    solo
                    v-model="addItem.subLesson"
                    :items="SubLesson"
                    :rule="selectErrors"
                    label="Sub-Lesson"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile>Description</v-list-tile>
                  <v-textarea
                  solo
                  name="input-7-4"
                  v-model="addItem.description"
                  :rule="descripErrors"
                  counter="300"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>>
        <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            <!--:disabled="!v"
            :loading="isLoading"
            depressed-->
          </v-card-actions>
    </v-form>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AddQuestion',
  data: () => ({
    defaultItem: {
      question: '',
      questionType: '',
      lessonName: '',
      subLesson: '',
      choice: '',
      description: ''
    },
    checkbox: false
  }),
  methods: {
    initialize () {
      this.questions = [
        axios
          .get('http://localhost:3003/questions')
          .then(response => {
            console.log(response)
            this.questions = response.data
          })
          .catch(error => {
            console.log(error)
          })
        // {
        //   question: 'I am ______ (run) into the woods.',
        //   description: 'This question is a Present Continuous tense, so the answer need to be V.ing'
        // },
        // {
        //   question: 'What _____ (do) you do yesterday?',
        //   description: 'In Past Simple Tense, you need to answer by Verb 2.'
        // }
      ]
    },
    save () {
      if (this.addIndex > -1) {
        Object.assign(this.questions[this.addIndex], this.addIndex)
      } else {
        this.questions.push(this.addIndex)
      }
      this.close()
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script>
