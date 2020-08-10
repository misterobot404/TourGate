
export const routes = [
    // redirect
    {
        path: '/',
        redirect: '/tours'
    },
    {
        path: '/admin',
        name: 'Admin',
        redirect: '/admin/tours'
    },
    // user pages
    {
        path: '/tours/:id?',
        name: 'Tours',
        component: () => import(/* webpackChunkName: 'tours' */ '@/pages/Tours'),
        props: true
    },
    // admin pages
    {
        path: '/admin/tours/:id?',
        name: 'TourManagement',
        component: () => import(/* webpackChunkName: 'tour-management' */ '@/pages/TourManagement'),
        meta: { layout: "AdminLayout" }
    },
    {
        path: '/admin/applications',
        name: 'ApplicationManagement',
        component: () => import(/* webpackChunkName: 'application-management' */ '@/pages/ApplicationManagement'),
        meta: { layout: "AdminLayout" }
    },
    // url not found
    {
        path: '*',
        component: () => import(/* webpackChunkName: 'page404' */ '@/pages/page404')
    }
];
