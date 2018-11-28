<template>
    <div >
        <p>{{title}}</p>
        <ul class="todo-list">
            <TodoListItem
                    class="todo-list-item"
                    v-for="todo in this.todo_list"
                    v-bind:todo="todo"
                    v-bind:key="todo._id"
                    @new="newTask"
                    @down="moveFrom(todo.index, 1)"
                    @up="moveFrom(todo.index, -1)"
                    @del="deleteTodo(todo)"
                    @deselect="clearSelect()"
                    @click="onSelect(todo)"></TodoListItem>
            <!--<input type="text" v-model="new_task"-->
            <!--@keyup.enter="addTodo">-->
            <!--<input type="button" value="ADD" @click="addTodo">-->
        </ul>
    </div>
</template>

<script>
    import apiService from '../services/apiService';
    import TodoListItem from './TodoListItem';

    export default {
        components: { TodoListItem: TodoListItem },
        data() {
            return {
                title: "Todo List",
                new_task: undefined,
                selected_task: undefined,
                todo_list: []
            }
        },
        async mounted() {
            this.refresh();
        },
        methods: {
            moveFrom: async function (from, dir) {
                let to = from + dir;
                to = to < 0 ? 0 : to;
                to = (to > this.todo_list.length) ? this.todo_list.length - 1 : to;
                this.onSelect(this.todo_list[to]);
            },
            moveTo(index) {
                index = index < 0 ? 0 : index;
                index = index >= this.todo_list.length ? this.todo_list.length - 1 : index;
                this.onSelect(this.todo_list[index]);
            },
            onSelect: function (todo) {
                this.selected_task = todo;
                // without the empty timeout, the focusTask runs before the element is rendered
                setTimeout(() => focusTask(todo.index), 100);
            },
            clearSelect: function () {
                blurTask(this.selected_task.index);
                this.selected_task = null;
            },
            deleteTodo: async function (todo) {
                let index = this.todo_list.indexOf(todo);

                this.todo_list.splice(index, 1);
                await apiService.delete("http://127.0.0.1:3000/api/tasks/" + todo._id + "/delete");

                if (this.todo_list.length > 0)
                    this.moveTo(index - 1);
                else
                    this.clearSelect();

                this.refresh();
            },
            addTodo: async function () {
                if (this.new_task) {
                    await apiService.post('http://127.0.0.1:3000/api/tasks/new', {
                        name: this.new_task,
                        index: this.todo_list.length
                    });

                    this.refresh();
                    this.new_task = undefined;
                }
            },
            newTask: async function () {
                let index = this.selected_task.index + 1;
                await apiService.post('http://127.0.0.1:3000/api/tasks/new', {
                    name: '',
                    index: index
                });
                await this.refresh();
                this.moveFrom(this.selected_task.index, 1);
            },
            refresh: async function () {
                this.todo_list = [];
                await apiService.get('/tasks/list')
                    .then(res => {
                        res.data.forEach(task => this.todo_list.push(task));
                    });
                this.todo_list.sort((a, b) => {
                    return a.index - b.index;
                });
            }
        }
    }

    export function focusTask(id) {
        const todo = document.getElementById('title-' + id);
        if (todo !== null) {
            todo.focus();
        }
    }

    export function blurTask(id) {
        const todo = document.getElementById('title-' + id);
        if (todo !== null) {
            todo.blur();
        }
    }
</script>


<style>
    .todo-list {
        background: #fff;
        width: 100%;
        /*max-width: calc(100% - 50px);*/
        overflow-y: auto;
        overflow-x: hidden;

        margin-bottom: -1px;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 1px;
        position: relative;
        display: block;

        -webkit-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
        -moz-box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
    }

    .todo-list-item {
        max-width: calc(100%);
        display: flex;
        flex: 0;
        resize: none;
        position: relative;

        list-style-type: none;
        border-top: 1px solid transparent;
        border-bottom: 1px solid transparent;
        height: 26px;
        bottom: 0;
        /*-webkit-align-items: center;*/
        /*align-items: center;*/
    }

    .todo-list-item.selected {
        border-color: #14aaf5;
        -moz-box-shadow: inset 0 2px 5px -1px #e0e6e8;
        -webkit-box-shadow: inset 0 2px 5px -1px #e0e6e8;
        box-shadow: inset 0 2px 5px -1px #e0e6e8;
    }

    .todo-list-item:not(.selected):not(.last-item)::after {
        border-bottom: 1px solid #e0e6e8;
        bottom: -2px;
        content: "";
        left: 0;
        position: absolute;
        pointer-events: none;
        right: 0;
    }

</style>