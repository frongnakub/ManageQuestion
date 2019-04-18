<template>
    <v-form>
        <v-text-title>
          <span class="headline">Add Question</span>
        </v-text-title>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-list-tile>Question*</v-list-tile>
                  <v-text-field
                    v-model="addItem.question"
                    solo
                    :error-messages="questionErrors"
                    required
                    @input="$v.question.$touch()"
                    @blur="$v.question.$touch()"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile >Questions Type*</v-list-tile>
                  <v-radio-group 
                    row 
                    v-model="addItem.questionType" 
                    :error-messages="radiotErrors"
                    @input="$v.questionType.$touch()"
                    @blur="$v.questionType.$touch()"
                  >
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
                </v-flex>
                <v-flex xs12>
                  <v-list-tile>Lesson*</v-list-tile>
                  <v-select
                    solo
                    v-model="addItem.lesson"
                    :items="lessonName"
                    :error-messages="selectErrors"
                    @input="$v.select.$touch()"
                    @blur="$v.select.$touch()"
                    label="Lesson"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile>Sub-Lesson*</v-list-tile>
                  <v-select
                    solo
                    v-model="addItem.subLesson"
                    :items="SubLesson"
                    :error-messages="selectErrors"
                    label="Sub-Lesson"
                    @input="$v.select.$touch()"
                    @blur="$v.select.$touch()"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-list-tile>Description</v-list-tile>
                  <v-textarea
                  solo
                  name="input-7-4"
                  v-model="addItem.description"
                  :error-messages="descripErrors"
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
                  counter="300"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>>
        <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            <!--:disabled="!v"
            :loading="isLoading"
            depressed-->
          </v-card-actions>
    </v-form>
</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'AddQuestion',
  mixins: [validationMixin],
  validations: {
      question: { required, maxLength: maxLength(100) },
      questionType: { required },
      select: { required },
      description: { required, maxLength: maxLength(300) }
    },
  data: () => ({
    defaultItem: {
      question: '',
      questionType: '',
      lessonName: '',
      subLesson: '',
      choice: '',
      description: ''
    },
    checkbox: false
  }),
  computed: {    
      questionErrors () {
        const errors = []
        if (!this.$v.question.$dirty) return errors
        !this.$v.question.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.question.required && errors.push('Name is required.')
        return errors
      },
      radioErrors () {
        const errors = []
        if (!this.$v.questionType.$dirty) return errors
        !this.$v.questionType.required && errors.push('Item is required')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      descripErrors () {
        const errors = []
        if (!this.$v.description.$dirty) return errors
        !this.$v.description.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.description.required && errors.push('Name is required.')
        return errors
      }
    },
    methods: {
        save () {
        if (this.addIndex > -1) {
            Object.assign(this.questions[this.addIndex], this.addIndex)
        } else {
            this.questions.push(this.addIndex)
        }
        this.close()
        }
    }

}
</script>

