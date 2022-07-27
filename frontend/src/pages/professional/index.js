import { CommonRouter } from '../../_plugins';

CommonRouter.addRoute([
  {
    path: '/professional',
    component: () =>
      import(/* webpackChunkName: "home" */ '../_common/CommonView.vue'),
    meta: {
      title: 'Professional',
      icon: 'mdi-doctor',
    },
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "professional" */ '../_common/abstract/ListView'
          ),
        meta: {
          title: 'Professional',
          icon: 'mdi-home',
        },

        children: [
          {
            path: '',
            component: () =>
              import(/* webpackChunkName: "professional" */ './FilterView'),
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
                  import(/* webpackChunkName: "professional" */ './TableView'),
                children: [
                  {
                    path: 'new',
                    component: () =>
                      import(
                        /* webpackChunkName: "professional" */ './EditView'
                      ),
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
        component: () =>
          import(/* webpackChunkName: "professional" */ './EditView'),
        meta: {
          title: 'Professional Edit',
          icon: 'mdi-pencil',
        },
      },
      {
        path: 'new',
        component: () =>
          import(/* webpackChunkName: "professional" */ './EditView'),
        meta: {
          title: 'Professional New',
          icon: 'mdi-pencil',
        },
      },
    ],
  },
]);
