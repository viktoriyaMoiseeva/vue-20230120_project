import { createRouter, createWebHistory } from 'vue-router';
import { scrollBehavior } from './scrollBehaviour.js';
import { authGuard } from './authGuard.js';

/** @type {import('vue-router').RouteRecordRaw[]} */
export const routes = [
  // Only for demo
  {
    path: '/demo',
    name: 'demo',
    component: () => import('../views/demo/PageDemo.vue'),
  },
  {
    path: '/',
    name: 'index',
    component: () => import('../views/PageMeetups.vue'),
  },
  {
    path: '/meetups',
    name: 'meetups',
    redirect: { name: 'index' },
  },
  {
    path: '/meetups/:meetupId(\\d+)',
    name: 'meetup',
    meta: {
      showReturnToMeetups: true,
      saveScrollPosition: true,
    },
    props: (to) => ({
      meetupId: +to.params.meetupId,
    }),
    redirect: (to) => ({ name: 'meetup.description', params: to.params }),
    component: () => import('../views/PageMeetup.vue'),
    children: [
      {
        path: '',
        alias: 'description',
        name: 'meetup.description',
        component: () => import('../views/PageMeetupDescription.vue'),
      },
      {
        path: 'agenda',
        name: 'meetup.agenda',
        component: () => import('../views/PageMeetupAgenda.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requireGuest: true,
      title: 'Вход | Meetups',
    },
    component: () => import('../views/PageLogin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      requireGuest: true,
      title: 'Регистрация | Meetups',
    },
    component: () => import('../views/PageRegister.vue'),
  },

  {
    path: '/meetups/create',
    name: 'meetups-create',
    meta: {
      requireAuth: true,
      title: 'Создание митапа | Meetups',
    },
    component: () => import('../views/PageCreateMeetup.vue'),
  },
  {
    path: '/meetups/:meetupId(\\d+)/edit',
    name: 'meetup-edit',
    props: (to) => ({
      meetupId: +to.params.meetupId,
    }),
    meta: {
      requireAuth: true,
      title: 'Редактирование митапа | Meetups',
    },
    component: () => import('../views/PageEditMeetup.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/PageNotFound.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior,
});

router.beforeEach((to) => {
  document.title = to.meta.title || 'Meetups';
});

router.beforeEach(authGuard);
