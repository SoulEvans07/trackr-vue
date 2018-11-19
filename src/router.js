import Vue from 'vue'
import VueRouter from 'vue-router'

// import _ from 'lodash'

import notFound from './pages/404'
import login from './pages/Login'
import register from './pages/Register'
import forgotten from './pages/Forgotten'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: login },
        { path: '/register', component: register },
        { path: '/forgotten', component: forgotten },
        { path: '*', component: notFound }
    ]
});

export default router;
