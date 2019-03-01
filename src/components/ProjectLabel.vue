<template>
    <div class="project-label" v-bind:style="setColor()" v-text="this.project.name">
    </div>
</template>

<script>
    export default {
        props: [ 'project' ],
        methods: {
            setColor: function () {
                return { "background-color": this.project.color };
            }
        }
    };
</script>

<style>
    .project-label {
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        align-self: center;
        height: 16px;
        font-size: 11px;
        padding: 1px 10px;
        text-align: center;
        color: white;
        border-radius: 20px;

        position: relative;
        float:right;
    }
</style>
