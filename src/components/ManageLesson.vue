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
            <!--<v-menu>
              <template #activator="{ on: menu }">
                <v-btn
                  color="primary"
                  dark
                  v-on="{ ...menu }"
                >Add New Lesson</v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-for="(itemLesson, index) in itemsLesson"
                  :key="index"
                  @click="addNewData()"
                >
                  <v-list-tile-title>{{ itemLesson.Lesson }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>-->
              <v-btn v-on="on" to="/AddLesson">Add New Lesson</v-btn>
            </v-layout>
          </v-container>
        </template>
        <v-card>
          <v-layout align-center justify-center>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
          </v-layout>
           <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 >
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
                  <v-list-tile><h3>-Lesson Detail</h3></v-list-tile>
                  <v-text-field
                    v-model="editedItem.lessonDescription"
                    required
                    box
                  ></v-text-field>
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
        :items="lesson"
        :search="search"
        class="elevation-1">
            <!-- loading
            <v-progress-circular
              indeterminate
              color="red"
            ></v-progress-circular>-->
        <template v-slot:items="props">
          <td class="text-xs-center">{{ props.item.lessonDetailNo }}</td>
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
export default {
  name: 'ManageLesson',
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      { text: 'Lesson No', align: 'center', value: 'lessonDetailNo', sortable: false },
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
    },
    itemsLesson: [{
      Lesson: 'Other'
    },
    {Lesson: 'Tense'}]
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

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
