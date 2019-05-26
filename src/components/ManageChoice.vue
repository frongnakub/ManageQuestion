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
              <v-btn v-on="on" to="/AddChoice">Add Choice</v-btn>
            </v-layout>
          </v-container>
        </template>
        <v-card>
          <v-layout align-center justify-center>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
          </v-layout>
          <v-container grid-list-md>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-list-tile><h3>- Choice Number</h3></v-list-tile>
                  <v-text-field
                      v-model="editedItem.choiceNo"
                      required
                      box
                      readonly="true"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 >
                  <v-list-tile><h3>- Question</h3></v-list-tile>
                  <v-select
                    v-model="editedItem.questionNo"
                    :items="question"
                    item-text="question"
                    item-value="questionNo"
                    box
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 >
                    <v-list-tile><h3>- Choices</h3></v-list-tile>
                    <v-text-field
                      v-model="editedItem.choices"
                      required
                      box
                    ></v-text-field>
                  </v-flex>
                <v-flex xs12 >
                    <v-list-tile><h3>- True or False (Fill T or F)</h3></v-list-tile>
                    <v-text-field
                      v-model="editedItem.choiceType"
                      required
                      box
                    ></v-text-field>
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
        :items="choices"
        :search="search"
        class="elevation-1">
        <template v-slot:items="props">
          <!-- <td class="text-xs-center">{{ props.item.choiceNo }}</td> -->
          <td class="text-xs-center">{{ props.item.question }}</td>
          <td class="text-xs-center">{{ props.item.choices }}</td>
          <td class="text-xs-center">{{ props.item.choiceType }}</td>
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
        <v-alert v-slot:no-results :value="true" color="error" icon="warning" solo>
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
  name: 'ManageChoice',
  data: () => ({
    search: '',
    dialog: false,
    headers: [
    //   { text: 'Choice No', align: 'center', value: 'choiceNo', sortable: false },
      { text: 'Question', align: 'center', value: 'question', sortable: false },
      { text: 'Choice', align: 'center', value: 'choices', sortable: false },
      { text: 'Choice Type', align: 'center', value: 'choiceType', sortable: false },
      { text: 'Actions', align: 'center', value: 'question', sortable: false }
    ],
    choices: [],
    editedIndex: -1,
    editedItem: {
      choiceNo: Number,
      choices: '',
      choiceType: '',
      question: ''
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Choice' : 'Edit Choice'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
    this.questionName()
  },
  methods: {
    initialize () {
      this.choices = [
        axios
          .get('http://localhost:3003/choices')
          .then(response => {
            console.log(response)
            this.choices = response.data
          })
          .catch(error => {
            console.log(error)
          })
      ]
    },
    editItem (item) {
      // this.$router.replace({ name: 'editQuestion' })
      this.editedIndex = this.choices.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      axios
        .get('http://localhost:3003/delete/choices/' + item.choiceNo, {
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
      const index = this.choices.indexOf(item)
      confirm('Are you sure you want to delete this choice?') && this.choices.splice(index, 1)
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
        .post('http://localhost:3003/edit/choices', {
          choiceNo: this.editedItem.choiceNo,
          questionNo: Number(this.editedItem.questionNo),
          choices: this.editedItem.choices,
          choiceType: this.editedItem.choiceType,
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
        Object.assign(this.choices[this.editedIndex], this.editedItem)
      } else {
        this.choices.push(this.editedItem)
      }
      this.close()
    },
    questionName () {
      this.question = [
        axios
          .get('http://localhost:3003/question')
          .then(response => {
            console.log(response)
            this.question = response.data
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
    }
  }
}
</script>
