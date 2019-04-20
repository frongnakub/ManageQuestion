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
        <v-btn color="orange darken-2" dark @click="back" >
          <v-icon dark left
            >arrow_back
          </v-icon>Back
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
            ></v-text-field>
          <v-list-tile>Questions Type*</v-list-tile> 
            <v-radio-group row solo>
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
          <v-list-tile>Choice*</v-list-tile>
            <v-layout align-center>
              <v-text-field></v-text-field>
                <v-checkbox
                  label="True"
                  value="True"
                  class="shrink mr-2"
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  required
                ></v-checkbox>
            </v-layout>
          <v-list-tile>Lesson*</v-list-tile>
            <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="Item"
              solo
              required
            ></v-select>
          <v-list-tile>Sub Lesson*</v-list-tile>
            <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="Item"
              solo
              required
            ></v-select>
          <v-list-tile>Description</v-list-tile>
            <v-textarea
            solo
            name="input-7-4"
            counter="300"
          ></v-textarea>
        </v-form>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'AddQuestion',
    data: () => ({
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: false
      }),
      methods: {
        back () {
          alert('!')
        }
    }
  }
</script>