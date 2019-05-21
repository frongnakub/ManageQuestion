<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout align-center justify-center>
          <span class="headline" >Add Lesson Detail</span>
        </v-layout>
      </v-container>
      <v-container>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-list-tile>Lesson*</v-list-tile>
            <v-select
              v-model="lesson_lessonNo"
              :items="lessons"
              item-text="lessonName"
              item-value="lessonNo"
              :rules="[v => !!v || 'Lesson required']"
              box
              required
            ></v-select>
          <v-list-tile>Sub Lesson*</v-list-tile>
            <v-select
              v-model="subLessonNo"
              :items="subLessons"
              item-text="subLessonName"
              item-value="subLessonNo"
              :rules="[v => !!v || 'Sub required']"
              box
              required
          ></v-select>
          <v-list-tile>Lesson Detail*</v-list-tile>
            <v-textarea
              v-model="lessonDescription"
              solo
              name="input-7-4"
              counter="500"
          ></v-textarea>
          <v-card-actions class="justify-end">
            <v-btn primary v-on:click="close()" >Cancle</v-btn>
            <v-btn primary v-on:click="addLessonDetail()" color="red darken-2">Confirm</v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AddLesson',
  data: () => ({
    select: null,
    checkbox: false,
    lessons: [],
    subLessons: [],
    lessonDescription: '',
    lesson_lessonNo: Number,
    subLessonNo: Number
  }),
  created () {
    this.initialize()
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
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$router.replace({ name: 'manageLesson' })
      }, 300)
    },
    addLessonDetail () {
      axios
        .post('http://localhost:3003/lessonDetail', {
          lessonDescription: this.lessonDescription,
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
      alert('Add lesson detail successfully')
      this.$router.replace({ name: 'manageLesson' })
      this.close()
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
