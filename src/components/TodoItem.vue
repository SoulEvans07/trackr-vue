<template>
    <li>
        <span :class="this.class" @click="markDone">{{this.todo.state}}</span>
        <input type="text"
               v-model.lazy="todo.name"
               v-on:keyup.enter="updateTodo"
               v-on:blur="updateTodo"/>
    </li>
</template>

<script>
    import apiService from '../services/apiService';

    const STATE = [ "OPEN", "IN_PROGRESS", "DONE" ];

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
            updateTodo: async function () {
                console.log("change " + this.todo.name);
                apiService.post('/tasks/' + this.todo._id + '/update', this.todo);
            },
            markDone: async function () {
                switch (this.todo.state) {
                    case STATE[ 0 ]:
                        this.todo.state = STATE[ 1 ];
                        break;
                    case STATE[ 1 ]:
                        this.todo.state = STATE[ 2 ];
                        break;
                    case STATE[ 2 ]:
                        this.todo.state = STATE[ 0 ];
                        break;
                }

                apiService.post('/tasks/' + this.todo._id + '/update', this.todo);
                this.setStyle();
            },
            setStyle: function () {
                this.class = "state " + this.todo.state.toLowerCase();
            }
        }
    }
</script>

<style>
    .state {
        font-weight: bold;
        color: white;
        border-radius: 2px;
        padding: 2px;
        cursor: pointer;
    }

    .open {
        background: darkblue;
    }

    .in_progress {
        background: #ffc511;
    }

    .done {
        background: #00b600;
    }
</style>