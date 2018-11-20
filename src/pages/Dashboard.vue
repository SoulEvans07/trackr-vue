<template>
    <div>
        <h1>TODOS</h1>
        <p>{{this.store.token}}</p>
        <p>{{this.store.user}}</p>
        <input type="button" value="Logout" @click="logout"/>
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
                store.token = undefined;
                store.user = undefined;
                router.push('/login');
            }
        }
    }
</script>

<style>

</style>