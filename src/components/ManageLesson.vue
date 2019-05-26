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
              <v-btn v-on="on" to="/AddLesson">Add Lesson</v-btn>
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
                  <v-list-tile><h3>- Lesson Detail Number</h3></v-list-tile>
                  <v-text-field
                      v-model="editedItem.lessonDetailNo"
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
                  <v-list-tile><h3>- Lesson Detail</h3></v-list-tile>
                    <!-- <tiptap-vuetify
                      v-model="editedItem.lessonDescription"
                      :extensions="extensions"
                    /> -->
                    <v-textarea
                      v-model="editedItem.lessonDescription"
                      box
                      required
                    ></v-textarea>
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
        :items="lesson"
        :search="search"
        class="elevation-1">
        <template v-slot:items="props">
          <!-- <td class="text-xs-center">{{ props.item.lessonDetailNo }}</td> -->
          <td class="text-xs-center">{{ props.item.lessonName }}</td>
          <td class="text-xs-center">{{ props.item.sublessonName }}</td>
          <td class="text-xs-center">{{ props.item.lessonDescription }}</td>
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
  name: 'ManageLesson',
  // components: { TiptapVuetify },
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      // { text: 'Lesson No', align: 'center', value: 'lessonDetailNo', sortable: false },
      { text: 'Lesson', align: 'center', value: 'lessonName', sortable: false },
      { text: 'Sub-Lesson', align: 'center', value: 'sublessonName', sortable: false },
      { text: 'Detail', align: 'center', value: 'lessonDetail', sortable: false },
      { text: 'Actions', align: 'center', value: 'lessonName', sortable: false }
    ],
    lesson: [],
    editedIndex: -1,
    editedItem: {
      lessonDetailNo: Number,
      lessonName: '',
      subLesson: '',
      lessonDescription: ''
    }
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
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Lesson Detail' : 'Edit Lesson Detail'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.initialize()
    this.lessonName()
    this.subLesson()
  },
  methods: {
    initialize () {
      this.lesson = [
        axios
          .get('http://localhost:3003/lessonDetail')
          .then(response => {
            console.log(response)
            this.lesson = response.data
          })
          .catch(error => {
            console.log(error)
          })
      ]
    },
    editItem (item) {
      // this.$router.replace({ name: 'editQuestion' })
      this.editedIndex = this.lesson.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      axios
        .get('http://localhost:3003/delete/lesson/' + item.lessonDetailNo, {
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
      const index = this.lesson.indexOf(item)
      confirm('Are you sure you want to delete this lesson detail?') && this.lesson.splice(index, 1)
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
        .post('http://localhost:3003/edit/lesson', {
          lessonDetailNo: this.editedItem.lessonDetailNo,
          lessonDescription: this.editedItem.lessonDescription,
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
        Object.assign(this.lesson[this.editedIndex], this.editedItem)
      } else {
        this.lesson.push(this.editedItem)
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
