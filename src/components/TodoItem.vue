<template>
    <li @click="markDone">
        <input type="checkbox" :checked="this.todo.is_done">
        <span :class="this.class">{{this.todo.name}}</span>
    </li>
</template>

<script>
    import axios from 'axios';

    export default {
        props: [ 'todo' ],
        data() {
            return {
                class: ""
            }
        },
        mounted() {
            this.setStyle();
        },
        methods: {
            markDone: function () {
                this.todo.is_done = !this.todo.is_done;

                axios.post('http://127.0.0.1:3000/api/tasks/' + this.todo._id + '/update', this.todo)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                this.setStyle();
            },
            setStyle: function () {
                if (this.todo.is_done) {
                    this.class = "done";
                } else {
                    this.class = "inprogress";
                }
            }
        }
    }
</script>