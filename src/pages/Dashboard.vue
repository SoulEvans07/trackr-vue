<template>
    <div class="dashboard">
        <div class="sidebar">
            <a class="nav-logo" @click="nav_home">
                <svg class="burger-icon" viewBox="0 0 50 32">
                    <path d="M49,4H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,4,49,4z"></path>
                    <path d="M49,16H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,16,49,16z"></path>
                    <path d="M49,28H19c-0.6,0-1-0.4-1-1s0.4-1,1-1h30c0.6,0,1,0.4,1,1S49.6,28,49,28z"></path>
                    <path d="M8.1,22.8c-0.3,0-0.5-0.1-0.7-0.3L0.7,15l6.7-7.8c0.4-0.4,1-0.5,1.4-0.1c0.4,0.4,0.5,1,0.1,1.4L3.3,15l5.5,6.2   c0.4,0.4,0.3,1-0.1,1.4C8.6,22.7,8.4,22.8,8.1,22.8z"></path>
                </svg>
            </a>
            <div class="sidebar-block">
                <a @click="nav_home" class="sidebar-item">
                    <svg class="sidebar-nav-icon" viewBox="0 0 40 40">
                        <path d="M37.9,15L22.2,3.8c-1.3-1-3.1-1-4.4-0.1L2.2,14.4c-0.7,0.5-0.9,1.4-0.4,2.1c0.5,0.7,1.4,0.9,2.1,0.4L6,15.4v12.3c0,4.6,3.7,8.3,8.3,8.3h11.4c4.6,0,8.3-3.7,8.3-8.3V15.9l2.1,1.5c0.3,0.2,0.6,0.3,0.9,0.3c0.5,0,0.9-0.2,1.2-0.6C38.7,16.4,38.5,15.5,37.9,15z M31,27.7c0,2.9-2.4,5.3-5.3,5.3H14.3C11.4,33,9,30.6,9,27.7V13.3l10.6-7.2c0.2-0.2,0.5-0.2,0.8,0L31,13.7V27.7z"></path>
                    </svg>
                    <span class="sidebar-item-row-text">Home</span>
                </a>
                <a @click="nav_tasks" class="sidebar-item">
                    <svg class="sidebar-nav-icon" viewBox="0 0 40 40">
                        <path d="M20,37.5c-9.6,0-17.5-7.9-17.5-17.5S10.4,2.5,20,2.5S37.5,10.4,37.5,20S29.6,37.5,20,37.5z M20,5.5C12,5.5,5.5,12,5.5,20S12,34.5,20,34.5S34.5,28,34.5,20S28,5.5,20,5.5z"></path>
                        <path d="M16.7,27.4c-0.4,0-0.8-0.1-1.1-0.4l-4.1-4.1c-0.6-0.6-0.6-1.5,0-2.1s1.5-0.6,2.1,0l3.1,3.1l8.9-8.9c0.6-0.6,1.5-0.6,2.1,0s0.6,1.5,0,2.1l-10,10C17.5,27.3,17.1,27.4,16.7,27.4z"></path>
                    </svg>
                    <span class="sidebar-item-row-text">My Tasks</span>
                </a>
            </div>
        </div>
        <div class="content">
            <div class="content-header">
                <!--<p>Dashboard</p>-->
                <!--<p>user: {{store.get().user.username}}</p>-->
                <!--<input type="button" value="Logout" @click="logout"/>-->
            </div>
            <router-view class="router"/>
        </div>
    </div>
</template>

<script>
    import router from '../router'

    export default {
        data() {
            return {
            };
        },
        methods: {
            logout: function () {
                this.$store.logout();
                router.push('/login');
            },
            nav_home: function () {
                router.push('/dashboard/home');
            },
            nav_tasks: function () {
                router.push('/dashboard/tasks');
            }
        }
    }
</script>

<style>
    .dashboard {
        height: 100%;
        display: flex;
    }

    .nav-logo {
        align-items: center;
        /*background-image: url(../assets/imgs/inapp__logo_color_ondark_horizontal.svg);*/
        /*background-position: 17px 0;*/
        /*background-repeat: no-repeat;*/
        /*background-size: 80px 16px;*/
        display: flex;
        flex-shrink: 0;
        height: 16px;
        justify-content: flex-end;
        margin: 20px 0;
        cursor: pointer;
        text-decoration: none;
        background-color: transparent;
    }

    .burger-icon {
        overflow: hidden;
        cursor: pointer;
        fill: #9ca6af;
        margin-right: 25px;
        height: 16px;
        width: 25px;
        line-height: normal;
    }

    .sidebar {
        width: 244px;
        background: #151b26;
        flex: 0 0 auto;
    }

    .sidebar-item {
        text-decoration: none;
        cursor: pointer;
        padding: 0 10px 0 15px;
        align-items: center;
        display: flex;
        height: 28px;
        line-height: 28px;
        background-color: transparent;
    }

    .sidebar-nav-icon {
        fill: #d5dce0;
        height: 20px;
        width: 20px;
        margin-right: 10px;
    }

    .sidebar-item-row-text {
        color: #d5dce0;
        text-overflow: ellipsis;
        line-height: 28px;
        margin-right: 0;
    }

    .sidebar-block {
        border-bottom: 1px solid #222b37;
    }

    .content {
        height: auto;
        flex: 1 1 auto;
    }

    .content-header {
        background: #fff;
        padding: 10px;
        height: 70px;

        position: relative;
        z-index: 200;

        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    }

    .router {
        position: relative;
        z-index: 100;

        width: auto;
        height: calc(100% - 70px);
        background: #f6f8f9;
        padding: 15px 15px 0;

        display: flex;
        flex-direction: column;
    }

</style>