<template>
    <div style="flex-direction: row">
        <div class="todo-list-root">
            <div class="todo-header">
                <div class="add-task-btn" @click="newTask">Add Task</div>
            </div>
            <div class="todo-box">
                <ul class="todo-list"
                    v-if="this.loading">
                    <li class="todo-list-item loading"
                        v-for="i in 5"
                        v-bind:key="i">
                        <div class="placeholder_dot"></div>
                        <div class="placeholder_text"></div>
                    </li>
                </ul>
                <ul class="todo-list">
                    <TodoListItem
                            v-bind:class="getClass(todo)"
                            v-for="todo in this.task_list"
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
        </div>
        <TodoDetails
                v-if="this.selected_task"
                v-bind:todo="this.selected_task"
                v-bind:key="this.selected_task._id"
                @deselect="clearSelect()"></TodoDetails>
    </div>
</template>

<script>
    import apiService from '../services/apiService';
    import taskListMixin from '../mixins/taskListMixin';
    import TodoListItem from './TodoListItem';
    import TodoDetails from './TodoDetails';

    export default {
        mixins: [taskListMixin],
        components: {
            TodoListItem: TodoListItem,
            TodoDetails: TodoDetails
        },
        data() {
            return {
                title: "Todo List",
                new_task: undefined,
                selected_task: undefined,
                loading: true
            }
        },
        async mounted() {
            await this.refreshList();
            this.loading = false;
        },
        created() {
            this.loading = true;
        },
        methods: {
            getClass: function (todo) {
                let todo_class = "todo-list-item";
                if (this.selected_task && this.selected_task.index === todo.index) {
                    todo_class += " selected";
                }
                return todo_class;
            },
            moveFrom: async function (from, dir) {
                let to = from + dir;
                to = to < 0 ? 0 : to;
                to = (to > this.task_list.length) ? this.task_list.length - 1 : to;
                this.onSelect(this.task_list[to]);
            },
            moveTo(index) {
                if (this.task_list.length > 0) {
                    index = index < 0 ? 0 : index;
                    index = index >= this.task_list.length ? this.task_list.length - 1 : index;
                    this.onSelect(this.task_list[index]);
                } else {
                    this.clearSelect();
                }
            },
            onSelect: function (todo) {
                this.selected_task = todo;

                // without the empty timeout, the focusTask runs before the element is rendered
                setTimeout(() => focusTask(todo.index), 50);
            },
            clearSelect: function () {
                blurTask(this.selected_task.index);
                this.selected_task = null;
            },
            deleteTodo: async function (task) {
                let index = this.task_list.indexOf(task);
                this.deleteTask(task);
                this.moveTo(index - 1);
            },
            newTask: async function () {
                let index = this.task_list.length;
                if (this.selected_task)
                    index = this.selected_task.index + 1;
                await apiService.post('http://127.0.0.1:3000/api/tasks/new', {
                    name: '',
                    index: index
                });
                await this.refreshList();
                this.moveFrom(this.selected_task.index, 1);
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
    .todo-list-root {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .todo-header {
        background: #fff;
        border-radius: 3px 3px 0 0;
        border-bottom: solid 1px #dfe5e7;

        position: relative;
        z-index: 100;

        height: 40px;
        padding: 5px 5px 5px 30px;

        box-shadow: 0 -1px 3px -1px rgba(0, 0, 0, 0.15);
    }

    .add-task-btn {
        float: left;
        background: #14aaf5;
        border-color: #14aaf5;
        border-radius: 4px;
        cursor: pointer;
        height: 30px;
        padding: 0 9px;
        line-height: 30px;
        color: white;
        font-size: 13px;
        min-width: 50px;
        text-align: center;
    }

    .add-task-btn:hover {
        background: #008ce3;
        border-color: #008ce3;
    }

    .add-task-btn:active {
        background-color: #006db0;
        border-color: #006db0;
        box-shadow: none;
    }

    .todo-box {
        background: #f6f8f9;
        width: 100%;
        padding-left: 25px;
        position: relative;
        z-index: 50;

        height: 100%;

        overflow-y: auto;
        overflow-x: hidden;
        /*border: solid 1px #dfe5e7;*/

        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    }

    .todo-list {
        border-left: solid 1px #dfe5e7;
        background: #fff;
        width: 100%;
        /*max-width: calc(100% - 50px);*/

        min-height: 100%;

        margin-bottom: -1px;
        padding: 0 0 1px;
        position: relative;
        display: block;
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

    .todo-list-item:not(.loading):hover {
        background: #f6f8f9;
        cursor: pointer;
        border-top: solid 1px #e0e6e8;
        height: 26px;
    }

    .todo-list-item:not(.loading).selected {
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

    .placeholder_dot {
        width: 15px;
        margin: 4px 0 4px 10px;
        border-radius: 10px;
        background: #eaeaea;

        height: 15px;
    }

    .placeholder_text {
        width: 40%;
        margin: 6px 10px;
        border-radius: 10px;
        background: #eaeaea;

        height: 10px;
    }

</style>
