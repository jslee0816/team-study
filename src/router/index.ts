import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Main from '../views/Main.vue';
import CreateContent from '../views/CreateContent.vue';
import PostDetail from '../views/PostDetail.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login, 
  },
  {
    path: '/signUp',
    component: SignUp, 
  },
  {
    path: '/main',
    component: Main,
  },
  {
    path: '/createContent',
    component: CreateContent,
  },
  {
    path: '/postDetail/:id',
    name: 'PostDetail',
    component: PostDetail
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
