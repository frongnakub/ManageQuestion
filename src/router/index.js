import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'font-awesome/css/font-awesome.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import TestVuetify from '@/components/TestVuetify'
import ManageQuestion from '@/components/ManageQuestion'
import ManageLesson from '@/components/ManageLesson'

Vue.use(Router)
Vue.use(Vuetify)

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
    }
  ]
})
