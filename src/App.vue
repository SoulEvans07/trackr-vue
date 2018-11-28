<template>
    <div id="app" onload="search()">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {}
    }


    Array.prototype.asyncForEach = async function (callback) {
        for (let index = 0; index < this.length; index++) {
            await callback(this[index])
        }
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
</style>
