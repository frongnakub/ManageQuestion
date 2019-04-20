import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'font-awesome/css/font-awesome.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import TestVuetify from '@/components/TestVuetify'
import ManageQuestion from '@/components/ManageQuestion'
import ManageLesson from '@/components/ManageLesson'
import AddQuestion from '@/components/AddQuestion'
import AddLesson from '@/components/AddLesson'

Vue.use(Router)
Vue.use(Vuetify)
Vue.use(Vuelidate)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'TestVuetify'
      }
    },
    {
      path: '/TestVuetify',
      name: 'TestVuetify',
      component: TestVuetify
    },
    {
      path: '/ManageQuestion',
      name: 'manageQuestion',
      component: ManageQuestion
    },
    {
      path: '/ManageLesson',
      name: 'manageLesson',
      component: ManageLesson
    },
    {
      path: '/AddQuestion',
      name: 'addQuestion',
      component: AddQuestion
    },
    {
      path: '/AddLesson',
      name: 'addLesson',
      component: AddLesson
    }
  ]
})
