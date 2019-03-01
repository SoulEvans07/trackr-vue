<template>
    <li v-bind:id="todo.index" @click="select">
        <!--<span style="margin: 0 5px; width: 20px;">{{todo.index}}</span>-->
        <input class="todo-checkbox" style="margin: 2px 10px" type="checkbox" @click="markDone"
               v-model="todo.is_done">
        <input class="todo-name" type="text" style="margin-bottom: 1px; vertical-align: center"
               autocomplete="off"
               v-bind:id="name_id"
               v-model="todo.name"
               v-on:blur="updateTask(todo)"
               v-on:keydown="eventHandler"/>
        <template v-if="todo.project">
            <project-label v-bind:project="todo.project"></project-label>
        </template>
    </li>
</template>

<script>
    import taskListMixin from '../mixins/taskListMixin';
    import ProjectLabel from "./ProjectLabel";

    export default {
        mixins: [taskListMixin],
        components: {
            ProjectLabel: ProjectLabel
        },
        props: ['todo'],
        data() {
            return {
                class: "",
                name_id: undefined
            }
        },
        mounted() {
            this.name_id = "title-" + this.todo.index;
        },
        methods: {
            select: function () {
                this.$emit('click');
            },
            markDone: async function () {
                this.todo.is_done = !this.todo.is_done;
                await this.updateTask(this.todo);
            },
            eventHandler: async function () {
                if (event.key === 'Enter') {
                    this.$emit("new");
                }
                if (event.key === 'Backspace') {
                    if (this.todo.name === null || this.todo.name === '')
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

    .todo-name:focus {
        outline: none;
    }

    .done {
        color: #b7bfc6;
    }
</style>
