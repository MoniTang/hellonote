import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import NoteDetail from '@/components/NoteDetail'
import TrashDetail from '@/components/TrashDetail'
import Notfound from '@/components/Notfound'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Login'
    },

    {
      path: '/login',
      component: Login
    },
    {
      path: '/notebooks',
      component: NotebookList
    },
    {
      path: '/note/:noteId',
      component: NoteDetail
    },
    {
      path: '/trash/:noteId',
      component: TrashDetail

    },
    {
      path: '/*',
      component: Notfound,
    }
  ]
})
