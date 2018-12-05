<template>
    <div>
        <div class="login login-box">
            <!--<img class="login login-title" src="../assets/imgs/logo.png">-->
            <h1 class="logo">TrackR</h1>
            <div class="login login-field-box">
                <input type="text" class="login login-field" placeholder="Username"
                       v-model="username"
                       v-on:keyup.enter="login"/>
                <input type="password" class="login login-field" placeholder="Password"
                       v-model="password"
                       v-on:keyup.enter="login"/>
                <br>
                <input type="button" @click="login" value="Login" class="login login-btn"/>
            </div>
            <a class="login link" @click="redir_forgot">Forgot password?</a>
        </div>
        <div class="login login-box">
            Don't have an account? <a class="login link" @click="redir_register">Register</a>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from '../router'
    import store from '../store'

    export default {
        props: [],
        data() {
            return {
                username: null,
                password: null
            };
        },
        methods: {
            login: function () {
                axios.post('http://127.0.0.1:3000/api/auth/login', {
                    username: this.username,
                    password: this.password
                }).then((res) => {
                    console.log(res);
                    store.login({
                        user: res.data.user,
                        token: res.data.token
                    });
                    router.push('/dashboard');
                });
            },
            redir_forgot: function () {
                router.push('/forgotten');
            },
            redir_register: function () {
                router.push('/register');
            }
        }
    }
</script>

<style>
    .logo {
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        text-align: center;
        font-size: 30px;
        width: 80%;
        margin: 10px auto 10px;
    }

    .login.login-box {
        background-color: white;
        margin: 30px auto auto;
        padding: 20px;
        width: 300px;
        border: solid 1px #bebebe;
        border-radius: 3px;
        text-align: center;
    }

    .login.login-field-box {
        margin: 10px 0 15px 0;
    }

    .login.login-field {
        width: 80%;
        padding: 7px;
        margin: 5px;
        background-color: #e9e9e9;
        border: solid 1px #dbdbdb;
        border-radius: 2px;
    }

    .login.login-btn {
        width: 80%;
        margin: 5px;
        background-color: #337ab7;
        color: white;
        border: none;
        padding: 5px;
        border-radius: 2px;
    }

    .login.link {
        color: #2e6da4;
        cursor: pointer;
    }
</style>