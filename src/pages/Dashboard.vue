<template>
    <div>
        <h1>Dashboard</h1>
        <h3>user: {{store.get().user.username}}</h3>
        <input type="button" value="Logout" @click="logout"/>
        <div style="background: whitesmoke">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import router from '../router'
    import store from '../store'

    export default {
        data() {
            return {
                store: store
            };
        },
        methods: {
            logout: function () {
                store.logout();
                router.push('/login');
            }
        }
    }
</script>

<style>

</style>