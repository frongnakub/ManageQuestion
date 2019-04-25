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
          <v-list-tile>Question*</v-list-tile>
            <v-text-field
              solo
              required
              name="question"
              v-model="question"
            ></v-text-field>
          <v-list-tile>Questions Type*</v-list-tile>
            <v-radio-group row solo>
              <v-radio
                label="Pre Test"
                value="1"
              ></v-radio>
              <v-radio
                label="Exercise"
                value="2"
              ></v-radio>
              <v-radio
                label="Post Test"
                value="3"
              ></v-radio>
          </v-radio-group>
          <v-list-tile>Lesson*</v-list-tile>
            <v-select
              v-model="select"
              :items="items"
              item-text="lessonNo"
              item-value="lessonNo"
              :rules="[v => !!v || 'Lesson required']"
              solo
              required
            ></v-select>
          <v-list-tile>Description</v-list-tile>
            <v-textarea
            solo
            name="description"
            v-model="description"
            counter="300"
          ></v-textarea>
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
    items: []
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
        .post('http://localhost:3003/questions', {
          question: this.question,
          questionType: this.questionType,
          lessonNo: this.lessonNo,
          description: this.description
        })
        .then(response => {
          console.log(response)
          console.log = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
