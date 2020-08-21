
export const routes = [
    // redirect
    {
        path: '/',
        redirect: '/tours'
    },
    {
        path: '/admin',
        redirect: '/admin/tours/published'
    },
    // tours
    {
        path: '/tours/:id?',
        name: 'Tours',
        component: () => import(/* webpackChunkName: 'tours' */ '@/pages/Tours'),
        props: true,
        meta: { layout: "DefaultLayout" }
    },
    // tour management
    {
        path: '/admin/tours/:status/:id?',
        name: 'TourManagement',
        component: () => import(/* webpackChunkName: 'tour-management' */ '@/pages/TourManagement'),
        meta: { layout: "AdminLayout" }
    },
    // url not found
    {
        path: '*',
        component: () => import(/* webpackChunkName: 'page404' */ '@/pages/page404')
    }
];
