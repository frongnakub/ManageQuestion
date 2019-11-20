<template>
  <v-app light class="teal lighten-4">
    <v-content>
    <v-container>
        <v-dialog v-model="dialog" max-width="100%">
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="search"
              label="Search"
              single-line
              hide-details
              solo
            ></v-text-field>
            <v-container>
              <v-layout justify-end>
                <v-btn v-on="on" to="/AddQuestion">Add Question</v-btn>
              </v-layout>
            </v-container>
          </template>
          <v-card>
            <v-layout align-center justify-center>
              <v-card-title>
                <span class="headline">Edit Question</span>
              </v-card-title>
            </v-layout>
            <v-container grid-list-md>
              <v-card-text>
                <v-layout wrap>
                  <v-flex xs12 >
                    <v-list-tile><h3>- Question Number</h3></v-list-tile>
                    <v-text-field
                      v-model="editedItem.questionNo"
                      required
                      box
                      readonly="true"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 >
                    <v-list-tile><h3>- Lesson</h3></v-list-tile>
                    <v-select
                      v-model="editedItem.lesson_lessonNo"
                      :items="lessons"
                      item-text="lessonName"
                      item-value="lessonNo"
                      box
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 >
                    <v-list-tile><h3>- Sub Lesson</h3></v-list-tile>
                    <v-select
                      v-model="editedItem.subLessonNo"
                      :items="subLessons"
                      item-text="subLessonName"
                      item-value="subLessonNo"
                      box
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 >
                    <v-list-tile><h3>- Question</h3></v-list-tile>
                    <v-text-field
                      v-model="editedItem.question"
                      required
                      box
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 >
                    <v-list-tile><h3>- Question for</h3></v-list-tile>
                      <v-select
                      v-model="editedItem.test_testNo"
                      :items="tests"
                      item-text="testTypeName"
                      item-value="testTypeNo"
                      box
                      required
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn primary v-on:click="save" color="light-green accent-4" >Save</v-btn>
                <v-btn primary v-on:click="close" color="red darken-2" >Cancel</v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-dialog>
        <v-data-table
          :headers="headers"
          :items="questions"
          :search="search"
          :loading="loading"
          class="elevation-1">
          <template v-slot:items="props">
            <!-- <td class="text-xs-center">{{ props.item.questionNo }}</td> -->
            <td class="text-xs-center">{{ props.item.lessonName }}</td>
            <td class="text-xs-center">{{ props.item.testTypeName }}</td>
            <td class="text-xs-center">{{ props.item.question }}</td>
            <td class="text-xs-center">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
              <!-- <v-text-field
                v-model="questionNo"
                required
                box
              ></v-text-field> -->
            </td>
          </template>
          <v-alert v-slot:no-results :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
    </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ManageQuestion',
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      // { text: 'Question No', align: 'center', value: 'questionNo', sortable: false },
      { text: 'Lesson', align: 'center', value: 'lessonName', sortable: false },
      { text: 'Question for', align: 'center', value: 'testTypeName', sortable: false },
      { text: 'Question', align: 'center', value: 'question', sortable: false },
      { text: 'Choice', align: 'center', value: 'option1', sortable: false },
      { text: 'Choice', align: 'center', value: 'option2', sortable: false },
      { text: 'Choice', align: 'center', value: 'option3', sortable: false },
      { text: 'Choice', align: 'center', value: 'option4', sortable: false },
      { text: 'CorrectAnswer', align: 'correctAnswer', value: 'choice4', sortable: false },
      { text: 'Actions', align: 'center', value: 'question', sortable: false }
    ],
    questions: [],
    editedIndex: -1,
    editedItem: {
      questionNo: Number,
      question: '',
      questionType: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
      lessonName: ''
    }
  }),
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
    this.lessonName()
    this.testName()
  },
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
      ]
    },
    editItem (item) {
      this.editedIndex = this.questions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      axios
        .get('http://localhost:3003/delete/' + item.questionNo, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
      const index = this.questions.indexOf(item)
      confirm('Are you sure you want to delete this question?') && this.questions.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      axios
        .post('http://localhost:3003/edit', {
          questionNo: this.editedItem.questionNo,
          question: this.editedItem.question,
          test_testNo: Number(this.editedItem.test_testNo),
          lesson_lessonNo: Number(this.editedItem.lesson_lessonNo),
          subLessonNo: Number(this.editedItem.subLessonNo),
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
      if (this.editedIndex > -1) {
        Object.assign(this.questions[this.editedIndex], this.editedItem)
      } else {
        this.questions.push(this.editedItem)
      }
      this.close()
    },
    lessonName () {
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
    }
  }
}
</script>
