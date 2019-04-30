<template>
  <v-app>
    <v-content>
      <v-layout align-start>
        <v-btn color="orange darken-2" dark @click="back" >
          <v-icon dark left
            >arrow_back
          </v-icon>Back
        </v-btn>
      </v-layout>
      <v-layout align-center justify-center>
        <span class="headline" >Add Lesson</span>
      </v-layout>
      <v-container>
        <v-form
          ref="form"
          lazy-validation
        >
          <v-list-tile>Lesson*</v-list-tile>        
            <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="Item"
              solo
              required
            ></v-select>
            <v-text-field
              solo
              required
            ></v-text-field>
          <v-list-tile>Sub Lesson*</v-list-tile>
            <v-text-field
              solo
              required
            ></v-text-field>
          <v-list-tile>Deatail*</v-list-tile>
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
    name: 'EditLesson',
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
      
    }
  }
</script>