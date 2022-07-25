import { CommonRouter } from '../../_plugins';

CommonRouter.addRoute([
  {
    path: '/about',
    meta: {
      title: 'Sobre',
      icon: 'mdi-help-circle',
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '../_common/CommonView.vue'),
    children: [
      {
        path: '',
        name: 'About',
        component: () =>
          import(/* webpackChunkName: "home" */ './AboutView.vue'),
      },
    ],
  },
]);
