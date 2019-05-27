<template>
  <v-app light >
    <v-content >
      <v-container></v-container>
      <v-container lime lighten-3>
      <v-container>
        <v-layout align-center justify-center>
          <span class="headline" >Add Lesson Detail</span>
        </v-layout>
      </v-container>
        <v-container >
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
                solo
                required
              ></v-select>
            <v-list-tile>Sub Lesson*</v-list-tile>
              <v-select
                v-model="subLessonNo"
                :items="subLessons"
                item-text="subLessonName"
                item-value="subLessonNo"
                :rules="[v => !!v || 'Sub required']"
                solo
                required
            ></v-select>
            <v-list-tile>Lesson Detail*</v-list-tile>
              <!--Use the component in the right place of the template-->
                  <!-- <tiptap-vuetify
                    v-model="lessonDescription"
                    :extensions="extensions"
                  /> -->
                <v-textarea
                    v-model="lessonDescription"
                    solo
                    required
                  ></v-textarea>
            <v-card-actions class="justify-end">
              <v-btn primary v-on:click="addLessonDetail()" color="light-green accent-4">Save</v-btn>
              <v-btn primary v-on:click="close()" color="red darken-2">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-container>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
// import { TiptapVuetify,
//   Heading,
//   Bold,
//   Italic,
//   Strike,
//   Underline,
//   Paragraph,
//   BulletList,
//   OrderedList,
//   ListItem,
//   HardBreak,
//   HorizontalRule,
//   History
// } from 'tiptap-vuetify'

export default {
  name: 'AddLesson',
  // components: { TiptapVuetify },
  data: () => ({
    select: null,
    checkbox: false,
    lessons: [],
    subLessons: [],
    lessonDescription: '',
    lesson_lessonNo: Number,
    subLessonNo: Number
    // extensions: [
    //   // you can specify options for extension
    //   new Heading({
    //     levels: [1, 2, 3]
    //   }),
    //   new Bold(),
    //   new Italic(),
    //   new Strike(),
    //   new Underline(),
    //   new Paragraph(),
    //   new BulletList(),
    //   new OrderedList(),
    //   new ListItem(),
    //   new HardBreak(),
    //   new HorizontalRule(),
    //   new History()
    // ]
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
