import Vue from 'vue'
// import Vuex from 'vuex'
import Router from 'vue-router'
import Vuetify from 'vuetify'
// import Vuelidate from 'vuelidate'
// import Vueditor from 'vueditor'
import 'vuetify/dist/vuetify.min.css'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'font-awesome/css/font-awesome.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import 'vueditor/dist/style/vueditor.min.css'
import Login from '@/components/Login'
import ManageQuestion from '@/components/ManageQuestion'
import ManageLesson from '@/components/ManageLesson'
import AddQuestion from '@/components/AddQuestion'
import AddLesson from '@/components/AddLesson'
import AddChoice from '@/components/AddChoice'
//import EditQuestion from '@/components/EditQuestion'
//import EditLesson from '@/components/EditLesson'

Vue.use(Router)
Vue.use(Vuetify)
// Vue.use(Vuelidate)
// Vue.use(Vueditor)
// Vue.use(Vuex)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Login'
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
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
    },
    {
      path: '/AddChoice',
      name: 'addChoice',
      component: AddChoice
    }
//    {
//      path: '/EditQuestion',
//      name: 'editQuestion',
//      component: EditQuestion
//    },
//    {
//      path: '/EditLesson',
//      name: 'editLesson',
//      component: EditLesson
//    }
  ]
})
