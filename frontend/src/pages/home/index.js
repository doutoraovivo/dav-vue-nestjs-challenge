import { CommonRouter } from '../../_plugins';

CommonRouter.addRoute([
  {
    path: '/',
    meta: {
      title: 'Home',
      icon: 'mdi-home',
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '../_common/CommonView.vue'),
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "home" */ './HomeView.vue'),
      },
    ],
  },
]);
