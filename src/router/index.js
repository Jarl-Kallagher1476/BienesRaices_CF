import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/properties/:id',
      name: 'property',
      component: () => import('../views/PropertyView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      //Separar el area publica del area privada
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/admin/properties',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/new',
          name: 'new-property',
          component: () => import('../views/admin/NewProperty.vue')
        },
                {
          path: '/admin/edit/:id',
          name: 'edit-property',
          component: () => import('../views/admin/EditProperty.vue')
        },
      ]
    }
  ]
})

//Guard de Navegacion
router.beforeEach(async(to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth){ 
    //Comprobar que el user este autenticado
    try {
      await autenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({name: 'login'})
    }
  } else { 
    //No esta autenticado, mostramos la vista
    next()
  }

})

function autenticateUser() {
  
  const auth = useFirebaseAuth()

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => { 
      unsubscribe() 
      if(user) { 
        resolve()
      } else { 
        reject()
      }
    })
  })
}




export default router
