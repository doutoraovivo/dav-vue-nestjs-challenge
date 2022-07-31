import { CommonRouter } from '../../_plugins';

CommonRouter.addRoute([
  {
    path: '/professional',
    component: () =>
      import(/* webpackChunkName: "professional" */ '../_common/CommonView.vue'),
    meta: {
      title: 'Professional',
      icon: 'mdi-medical-bag',
    },
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "professionalList" */ '../_common/abstract/ListView'
          ),
        meta: {
          title: 'Professional',
          icon: 'mdi-home',
        },
        children: [
          {
            path: '',
            component: () =>
              import(/* webpackChunkName: "professionalFilter" */ './FilterView'),
            meta: {
              title: 'Professional',
            },
            children: [
              {
                meta: {
                  title: 'Professional',
                },
                path: '',
                name: 'professional-table',
                component: () =>
                  import(/* webpackChunkName: "professionalTable" */ './TableView'),
                children: [
                  {
                    path: 'new',
                    component: () =>
                      import(/* webpackChunkName: "professionalEdit" */ './EditView'),
                    meta: {
                      title: 'Professional New',
                      icon: 'mdi-pencil',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'edit/:key',
        component: () => import(/* webpackChunkName: "professionalEdit" */ './EditView'),
        meta: {
          title: 'Professional Edit',
          icon: 'mdi-pencil',
        },
      },
      {
        path: 'new',
        component: () => import(/* webpackChunkName: "professionalNew" */ './EditView'),
        meta: {
          title: 'Professional New',
          icon: 'mdi-pencil',
        },
      },
    ],
  },
]);
