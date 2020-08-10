import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './routes'
import store from '@/store'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    store.commit("SET_PAGE_LOADING", true);
    next();
});

router.afterEach((to, from) => {
    store.commit("SET_PAGE_LOADING", false);
});

export default router
