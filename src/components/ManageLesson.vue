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
            <td >{{ props.item.lessonName }}</td>
            <td >{{ props.item.subLesson }}</td>
            <td >{{ props.item.questionDeatail }}</td>
            <td >
              <v-icon
                small
                class="mr-2"
                @click="editItem()"
                edit
              >
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
  name: 'ManageQuestion',
  data: () => ({
    search: '',
    dialog: false,
    headers: [
      { text: 'Lesson', align: 'center', value: 'lessonName', sortable: false },
      { text: 'Sub-Lesson', align: 'center', value: 'subLesson', sortable: false },
      { text: 'Deatail', align: 'center', value: 'lessonDetail', sortable: false },
      { text: 'Actions', align: 'center', value: 'lessonName', sortable: false }
    ],
    questions: [],
    editedIndex: -1,
    editedItem: {
      lessonName: '',
      subLesson: '',
      lessonDetail: ''
    },
    defaultItem: {
      lessonName: '',
      subLesson: '',
      lessonDetail: ''
    },
    //เลือก lesson แล้วค่อยเพิ่ม sub-less เนื้อหาข้องใน ถ้าไม่มีชื่อที่จะเพิ่มก็กดเพิ่มชื่อเรื่องเอาเอง
    //ยังไม่ได้เขียนโลจิก
    itemsLesson: [{
      Lesson: 'Other'
      //lessonName: ''
    },
    {Lesson: 'Tense'}]
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Lesson' : 'Edit Lesson'
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
    addNewData(itemLesson){
      if(d){

      }
    },
    //editItem (item) {
    //  this.editedIndex = this.questions.indexOf(item)
    //  this.editedItem = Object.assign({}, item)
    //  this.dialog = true
    //},

    deleteItem (item) {
      const index = this.questions.indexOf(item)
      confirm('Are you sure you want to delete this question?') && this.questions.splice(index, 1)
    },

    editItem () {
      this.$router.replace({ name: 'editLesson' })
      //this.editedIndex = this.questions.indexOf(item)
      //this.editedItem = Object.assign({}, item)
      //this.dialog = true
    },
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>