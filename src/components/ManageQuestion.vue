<template>
  <v-app>
    <v-toolbar app >
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat ><router-link to="/ManageLesson">Manage Lesson</router-link></v-btn>
        <v-btn flat>Manage Question</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container>
      <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <v-btn>Add New Question</v-btn>
        <v-text-field
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex>
                  Question<v-text-field v-model="editedItem.question" ></v-text-field>
                  Lesson<v-text-field v-model="editedItem.lessonName" ></v-text-field>
                  Description<v-text-field v-model="editedItem.description" ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
          </v-card>
      </v-dialog>

        <v-data-table
          :headers="headers"
          :items="questions"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <td>{{ props.item.question }}</td>
            <td>{{ props.item.lessonName }}</td>
            <td>{{ props.item.description }}</td>
            <td class="justify-center layout px-0">
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
            </td>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize()">Reset</v-btn>
          </template>
          <v-alert v-slot:no-results :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
    </v-container>
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
      { text: 'Question', align: 'center', value: 'question', sortable: false },
      { text: 'Lesson', align: 'center', value: 'lessonName', sortable: false },
      { text: 'Description', align: 'center', value: 'description', sortable: false }
    ],
    questions: [],
    editedIndex: -1,
    editedItem: {
      question: '',
      description: ''
    },
    defaultItem: {
      question: '',
      description: ''
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    editItem (item) {
      this.editedIndex = this.questions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.questions.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.questions.splice(index, 1)
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

<style scoped>

</style>
