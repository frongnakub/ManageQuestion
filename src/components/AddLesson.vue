<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout align-center justify-center>
          <span class="headline" >Add Lesson</span>
        </v-layout>
      </v-container>
      <v-container>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-list-tile>Lesson*</v-list-tile>
            <v-text-field
              v-model="lesson"
              solo
              required
            ></v-text-field>
          <v-list-tile>Sub Lesson*</v-list-tile>
            <v-text-field
              solo
              required
            ></v-text-field>
          <v-list-tile>Detail*</v-list-tile>
            <v-textarea
            solo
            name="input-7-4"
            counter="300"
          ></v-textarea>
          <v-card-actions class="justify-end">
            <v-btn primary v-on:click="close()" >Cancle</v-btn>
            <v-btn primary v-on:click="addQuestion()" color="red darken-2">Confirm</v-btn>
          </v-card-actions>
        </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'AddLesson',
  data: () => ({
    select: null,
    checkbox: false
  }),
  methods: {
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$router.replace({ name: 'manageLesson' })
      }, 300)
    },

    addQuestion () {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.questions[this.editedIndex], this.editedItem)
      // } else {
      //   this.questions.push(this.editedItem)
      // }
      this.close()
    },
    
    close () {
    this.$router.replace({ name: 'manageLesson' })
    }
  }
}
</script>
