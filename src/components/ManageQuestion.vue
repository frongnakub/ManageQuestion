<template>
  <v-app id="web">
    <v-toolbar color="cyan" dark fixed app clipped-left>
      <v-toolbar-items >
        <v-btn flat ><router-link to="/ManageLesson">Manage Lesson</router-link></v-btn>
        <v-btn flat>Manage Question</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
    <v-parallax
      src="https://wallpapercave.com/wp/wp2499654.jpg"
    >
    <v-container>
      <!--<v-dialog v-model="dialog" max-width="100%">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" align-center justify-end>Add New Question</v-btn>-->
        <v-dialog v-model="dialog" max-width="100%">
        <template v-slot:activator="{ on }">
        <v-btn v-on="on" align-center justify-end><router-link to="/AddQuestion">Add New Question</router-link></v-btn>
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </template>
        </v-dialog>
        <!--</template>-->
      <!--<v-card >
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
          <v-card-text >
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-list-tile>Question*</v-list-tile>
                  <v-text-field
                    v-model="editedItem.question"
                    solo
                    :rules="[rules.lengthQ(),]"
                  ></v-text-field>
                </v-flex>
                 <v-flex xs12>
                  <v-list-tile >Questions Type*</v-list-tile>
                  <v-radio-group row v-model="editedItem.questionType" >
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
                </v-flex> -->
                <!--<v-flex xs12>
                  <v-list-tile>Choice*</v-list-tile>
                  <v-layout align-center>
                    <v-text-field v-model="editedItem.choice" solo></v-text-field>
                    <v-checkbox
                      v-model="editedItem.choiceDescripition"
                      label="True"
                      value="True"
                      class="shrink mr-2"
                    ></v-checkbox>
                  </v-layout>
                  <v-layout align-center>
                    <v-text-field v-model="editedItem.choice" solo></v-text-field>
                    <v-checkbox
                      v-model="editedItem.choiceDescripition"
                      label="True"
                      value="True"
                      class="shrink mr-2"
                    ></v-checkbox>
                  </v-layout>
                  <v-layout align-center>
                    <v-text-field v-model="editedItem.choice" solo></v-text-field>
                    <v-checkbox
                      v-model="editedItem.choiceDescripition"
                      label="True"
                      value="True"
                      class="shrink mr-2"
                    ></v-checkbox>
                  </v-layout>
                  <v-layout align-center>
                    <v-text-field v-model="editedItem.choice" solo></v-text-field>
                    <v-checkbox
                      v-model="editedItem.choiceDescripition"
                      label="True"
                      value="True"
                      class="shrink mr-2"
                    ></v-checkbox>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile>Lesson*</v-list-tile>
                  <v-select
                    solo
                    v-model="editedItem.lesson"
                    :items="lessonName"
                    label="Lesson"
                  ></v-select>
                </v-flex>
               <v-flex xs12>
                  <v-list-tile>Sub-Lesson*</v-list-tile>
                  <v-select
                    solo
                    v-model="editedItem.subLesson"
                    :items="SubLesson"
                    label="Sub-Lesson"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile>Description</v-list-tile>
                  <v-textarea
                  solo
                  name="input-7-4"
                  v-model="editedItem.description"
                  :rules="[rules.lengthD()]"
                  counter="300"
                  ></v-textarea>
                </v-flex>
                 <v-flex xs12>
                  <v-list-tile>Choices</v-list-tile>
                  <v-textarea
                  solo
                  name="input-7-4"
                  v-model="editedItem.choices"
                  :rules="[rules.lengthD()]"
                  counter="300"
                  ></v-textarea>
                </v-flex>
            </v-layout>
            </v-container>
          </v-card-text>
        <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            :disabled="!v"
            :loading="isLoading"
            depressed
          </v-card-actions>
        </v-card>
      </v-dialog>-->

        <v-data-table
          :headers="headers"
          :items="questions"
          :search="search"
          class="elevation-1">
          <template v-slot:items="props">
            <td >{{ props.item.lessonName }}</td>
            <td >{{ props.item.subLesson }}</td>
            <td >{{ props.item.testTypeName }}</td>
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
            </td>
          </template>
          <v-alert v-slot:no-results :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
    </v-container>
    </v-parallax>
    </v-content>
    <v-footer >
      <span class="black--text" >SIT KMUTT&copy; 2019</span>
    </v-footer>
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
      { text: 'Sub-Lesson', align: 'center', value: 'subLesson', sortable: false },
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
      subLesson: '',
      choices: '',
      description: ''
    },
    defaultItem: {
      question: '',
      questionType: '',
      lessonName: '',
      subLesson: '',
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
    editItem (item) {
      this.editedIndex = this.questions.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
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
