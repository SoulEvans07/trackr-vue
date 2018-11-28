<template>
    <li v-bind:id="todo.index" @click="select">
        <span style="margin: 0px 5px">{{todo.index}}</span>
        <input class="todo-checkbox" style="margin: 0px 5px" type="checkbox" @click="markDone"
               v-model="this.todo.is_done">
        <input class="todo-name" type="text"
               v-bind:id="name_id"
               v-model="todo.name"
               v-on:blur="updateTodo"
               v-on:keydown="eventHandler"/>
    </li>
</template>

<script>
    import apiService from '../services/apiService';

    export default {
        props: ['todo'],
        data() {
            return {
                class: "",
                name_id: undefined
            }
        },
        mounted() {
            this.setStyle();
            this.name_id="title-"+this.todo.index;
        },
        methods: {
            select: function(){
                this.$emit('click');
            },

            updateTodo: async function () {
                apiService.post('/tasks/' + this.todo._id + '/update', this.todo);
            },
            markDone: async function () {
                this.todo.is_done = !this.todo.is_done;

                apiService.post('/tasks/' + this.todo._id + '/update', this.todo);
                this.setStyle();
            },
            eventHandler: async function () {
                if (event.key === 'Enter') {
                    this.$emit("new");
                }
                if (event.key === 'Backspace') {
                    console.log(this.todo.name);
                    if(this.todo.name === null || this.todo.name === '')
                        this.$emit("del");
                }
                if (event.key === 'Escape') {
                    this.$emit("deselect");
                }
                if (event.key === 'ArrowDown') {
                    this.$emit("down");
                }
                if (event.key === 'ArrowUp') {
                    this.$emit("up");
                }
            },
            setStyle: function () {
                this.class = "state " + (this.todo.is_done ? "done" : "open");
            }
        }
    }
</script>

<style>
    .todo-checkbox {
        position: relative;
        top: 4px;
    }

    .todo-name {
        border: 0;
        font-size: 13px;
        background: transparent;
        /*position: absolute;*/
        /*top: 4px;*/
    }

    .todo-name:focus{
        outline: none;
    }


    .state {
        font-weight: bold;
        color: white;
        border-radius: 2px;
        padding: 4px 7px;
        cursor: pointer;
    }

    .open {
        background: red;
    }

    .done {
        background: #00b600;
    }
</style>