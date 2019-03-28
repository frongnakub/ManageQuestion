import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Manage from '@/components/Manage'
import AddQuestion from '@/components/AddQuestion'
import EditQuestion from '@/components/EditQuestion'
import DeleteQuestion from '@/components/DeleteQuestion'

Vue.use(Router)

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
      path: '/Manage',
      name: 'manage',
      component: Manage
    },
    {
      path: '/AddQuestion',
      name: 'addQuestion',
      component: AddQuestion
    },
    {
      path: '/EditQuestion',
      name: 'editQuestion',
      component: EditQuestion
    },
    {
      path: '/DeleteQuestion',
      name: 'deleteQuestion',
      component: DeleteQuestion
    }
  ]
})
