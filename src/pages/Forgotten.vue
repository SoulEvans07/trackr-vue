<template>
    <div>
        <div class="forgotten-box">
            <img src="../assets/imgs/lock.png" class="forgotten lock"><br>
            <div class="forgotten-desc">Trouble Logging In?</div>
            <span class="forgotten-expl">Enter your email and we'll send you a link to get back into your account.</span>
            <div class="forgotten-field-box">
                <input type="text" class="forgotten-field" placeholder="Email"
                       v-model="email"/>
                <br/>
            </div>
            <input type="button" value="Send Login Link" class="forgotten-btn"
                   @click="send_login_link"/>
        </div>
        <div class="forgotten back-box" @click="redir_login">
            <input type="button" value="Back to Login" class="forgotten back-btn"/>
        </div>
    </div>
</template>

<script>
    import router from '../router'

    export default {
        data() {
            return {
                email: null
            }
        },
        methods: {
            send_login_link: function () {
                console.log("send to: " + this.email);
            },
            redir_login: function () {
                router.push('/login');
            }
        }
    }
</script>

<style>
    .forgotten-field-box {
        margin: 10px 0 15px 0;
    }

    .forgotten-field {
        width: 80%;
        padding: 7px;
        margin: 5px;
        background-color: #e9e9e9;
        border: solid 1px #dbdbdb;
        border-radius: 2px;
    }

    .forgotten-btn {
        width: 80%;
        background-color: #337ab7;
        color: white;
        border: none;
        padding: 5px;
        border-radius: 2px;
    }

    .forgotten.back-box {
        cursor: pointer;
        margin: 0 auto auto;
        background-color: white;
        border: solid 1px #bebebe;
        border-top: solid 1px #dfdfdf;
        border-radius: 0 0 3px 3px;
        width: 300px;
        text-align: center;
        padding: 10px;
    }

    .forgotten.back-box:hover {
        background-color: #f2f2f2;
    }

    .forgotten.back-btn {
        width: 100%;
        background: none;
        border: none;
        margin: 0 auto auto;
        text-align: center;
        padding: 0 33%;
        color: #2E2F30;
        font-weight: bold;
    }

    .forgotten.back-btn:hover {
        text-decoration: none;
        color: #2E2F30;
    }

    .forgotten-box {
        background-color: white;
        margin: 30px auto auto;
        padding: 20px;
        width: 300px;
        border: solid 1px #bebebe;
        border-bottom: none;
        border-radius: 3px 3px 0 0;
        text-align: center;
    }

    .forgotten-desc {
        margin: 20px 0;
        font-size: large;
        font-weight: bold;
    }

    .forgotten-expl {
        color: #999;
    }

    .forgotten.lock {
        width: 40%;
    }
</style>