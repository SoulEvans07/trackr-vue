import Vue from 'vue'
import VueRouter from 'vue-router'

// import _ from 'lodash'

import store from './store'

import notFound from './pages/404'
import login from './pages/Login'
import register from './pages/Register'
import forgotten from './pages/Forgotten'

import dashboard from './pages/Dashboard'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: login },
        { path: '/register', component: register },
        { path: '/forgotten', component: forgotten },

        { path: '/dashboard', component: dashboard },

        { path: '*', component: notFound }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/dashboard')) {
        if (!isAuthenticated()) {
            console.log('Redirect from ' + to.path + ' to /login');
            next('/login');
        } else {
            next();
        }
    } else {
        if (!to.path.startsWith('/dashboard') && isAuthenticated())
            next('/dashboard');
        else
            next();
    }
});

const isAuthenticated = () => {
    let user = store.user;
    let token = store.token;
    return user && token;
};

export default router;
