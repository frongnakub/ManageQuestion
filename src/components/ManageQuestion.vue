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
              <v-btn v-on="on" to="/AddQuestion">Add New Question</v-btn>
              <v-btn v-on="on" to="/AddChoice">Add Choices</v-btn>
            </v-layout>
          </v-container>
        </template>
        </v-dialog>
        <v-data-table
          :headers="headers"
          :items="questions"
          :search="search"
          :loading="loading"
          class="elevation-1">
          <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.lessonName }}</td>
            <td class="text-xs-center">{{ props.item.subLessonName }}</td>
            <td class="text-xs-center">{{ props.item.testTypeName }}</td>
            <td class="text-xs-center">{{ props.item.question }}</td>
            <td class="text-xs-center">
              <v-icon
                small
                class="mr-2"
                @click="editItem()"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
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
      { text: 'Lesson', align: 'center', value: 'lessonName', sortable: false },
      { text: 'Sub-Lesson', align: 'center', value: 'subLessonName', sortable: false },
      { text: 'Question for', align: 'center', value: 'testTypeName', sortable: false },
      { text: 'Question', align: 'center', value: 'question', sortable: false },
      { text: 'Actions', align: 'center', value: 'question', sortable: false }
    ],
    questions: [],
    editedIndex: -1,
    editedItem: {
      question: '',
      questionType: '',
      lessonName: '',
      subLessonName: '',
      choices: '',
      description: ''
    },
    defaultItem: {
      question: '',
      questionType: '',
      lessonName: '',
      subLessonName: '',
      choices: '',
      description: ''
    },
    questionR: undefined,
    rules: {
      lengthQ: len => v => (v || '').length >= 1 || 'Please enter',
      lengthD: len => v => (v || '').length >= 1
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Question' : 'Edit Question'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
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
    editItem () {
      this.$router.replace({ name: 'editQuestion' })
      //this.editedIndex = this.questions.indexOf(item)
      //this.editedItem = Object.assign({}, item)
      //this.dialog = true
    },

    deleteItem (item) {
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
      if (this.editedIndex > -1) {
        Object.assign(this.questions[this.editedIndex], this.editedItem)
      } else {
        this.questions.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
