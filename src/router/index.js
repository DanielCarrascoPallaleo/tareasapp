import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login',
      name: 'login',
      component: ()=> import('../modules/auth/pages/LoginPage.vue')
    },
    { path: '/register',
      name: 'register',
      component: ()=> import('../modules/auth/pages/RegisterPage.vue')
    },
    { path: '/tasks', 
      component: ()=> import('../modules/tasks/pages/ListPage.vue') ,
    },
    { path: '/about',
      component: ()=> import('../modules/tasks/pages/AboutPage.vue')
    },
    { path: '/:id',
      component: ()=> import('../modules/tasks/pages/TaskPage.vue')
    },
    { path: '/edit/:id',
      component: ()=> import('../modules/tasks/pages/TaskEditPage.vue')
    },
    { path: '/create',
      component: ()=> import('../modules/tasks/pages/TaskCreatePage.vue')
    },
    { path: '/:pathMatch(.*)*',
      component: ()=> import('../modules/shared/pages/NoPageFound.vue')
    }
  ]
})

router.beforeEach( async (to)=> {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  if (authRequired && !auth.user) {
    console.log('redireccionar login')
    auth.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
