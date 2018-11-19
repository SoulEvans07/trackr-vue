<template>
    <div>
        <div class="register-box">
            <!--<img class="title-img" src="/imgs/logo.png">-->
            <!--<div class="register-text">Sign up to see photos and videos from your friends.</div>-->
            <div>
                <div class="register-field-box">
                    <input type="text" class="register-field" placeholder="Email"
                           v-model="email"/>
                    <input type="text" class="register-field" placeholder="Username"
                           v-model="username"/>
                    <input type="password" class="register-field" placeholder="Password"
                           v-model="password"/>
                    <input type="password" class="register-field" placeholder="Password confirmation"
                           v-model="password_confirm"/>
                    <div v-if="invalid">Invalid password</div>
                </div>
                <input type="button" value="Register" class="register-btn"
                       @click="register"/>
            </div>
            <br>
        </div>
        <div class="register-box">
            Have an account? <a @click="redir_login">Log in</a>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import router from '../router'

    export default {
        data() {
            return {
                username: null,
                email: null,
                password: null,
                password_confirm: null,
                invalid: false
            }
        },
        methods: {
            register: function () {
                this.invalid = this.password !== this.password_confirm;
                if (this.invalid)
                    return;

                axios.post('http://127.0.0.1:3000/api/auth/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }).then((res) => {
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err.response.data);
                });
            },
            redir_login: function () {
                router.push('/login');
            }
        }
    }
</script>

<style>
    .register-box {
        background-color: white;
        margin: 30px auto auto;
        padding: 20px;
        width: 25%;
        border: solid 1px #bebebe;
        border-radius: 3px;
        text-align: center;
    }

    .register-text {
        font-weight: bold;
        color: #8d8d8d;
    }

    .register-field-box {
        margin: 10px 0 15px 0;
    }

    .register-field {
        width: 80%;
        padding: 7px;
        margin: 5px;
        background-color: #e9e9e9;
        border: solid 1px #dbdbdb;
        border-radius: 2px;
    }

    .register-field .error {
        border-color: red;
    }

    .register-btn {
        width: 80%;
        background-color: #337ab7;
        color: white;
        border: none;
        padding: 5px;
        border-radius: 2px;
    }
</style>