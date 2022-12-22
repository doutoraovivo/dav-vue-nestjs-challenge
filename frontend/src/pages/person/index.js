import { CommonRouter } from '../../_plugins';

CommonRouter.addRoute([
  {
    path: '/person',
    component: () =>
      import(/* webpackChunkName: "home" */ '../_common/CommonView.vue'),
    meta: {
      title: 'Person',
      icon: 'mdi-account-multiple',
    },
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "person" */ '../_common/abstract/ListView'
          ),
        meta: {
          title: 'Person',
          icon: 'mdi-home',
        },

        children: [
          {
            path: '',
            component: () =>
              import(/* webpackChunkName: "person.filter" */ './FilterView'),
            meta: {
              title: 'Person',
            },
            children: [
              {
                meta: {
                  title: 'Person',
                },
                path: '',
                name: 'person-table',
                component: () =>
                  import(/* webpackChunkName: "person.filter" */ './TableView'),
                children: [
                  {
                    path: 'new',
                    component: () =>
                      import(/* webpackChunkName: "person.edit" */ './EditView'),
                    meta: {
                      title: 'Person New',
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
        component: () => import(/* webpackChunkName: "person.edit" */ './EditView'),
        meta: {
          title: 'Person Edit',
          icon: 'mdi-pencil',
        },
      },
      {
        path: 'new',
        component: () => import(/* webpackChunkName: "person.edit" */ './EditView'),
        meta: {
          title: 'Person New',
          icon: 'mdi-pencil',
        },
      },
    ],
  },
]);
