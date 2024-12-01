import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Users from "@/views/users/Users.vue";
import CreateOrEdit from "@/views/users/CreateOrEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Users,
      meta: {
        title: 'Home',
      }
    },

    {
      path: '/users',
      name: 'users.index',
      component: Users,
      meta: {
        title: 'Users'
      }
    },

    {
      path: '/users/create',
      name: 'users.create',
      component: CreateOrEdit,
      meta: {
        title: 'Create User'
      }
    },
    {
      path: '/users/:id/edit',
      name: 'users.edit',
      component: CreateOrEdit,
      meta: {
        title: 'Update User'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = to.meta.title || 'Vue Simple App';
  }
    next();
});

export default router
