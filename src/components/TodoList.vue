<template>
    <div>
        <h3>{{title}}</h3>
        <ul>
            <TodoListItem
                    v-for="todo in this.todo_list"
                    v-bind:todo="todo"
                    v-bind:key="todo.id"></TodoListItem>
        </ul>
        <input type="text" v-model="new_todo"
               v-on:keyup.enter="addTodo">
        <input type="button" value="ADD" v-on:click="addTodo">
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
                new_todo: undefined,
                todo_list: []
            }
        },
        async mounted() {
            await apiService.get('/tasks/list')
                .then(res => {
                    res.data.forEach(task => this.todo_list.push(task));
                });
        },
        methods: {
            addTodo: async function () {
                if (this.new_todo) {
                    await apiService.post('http://127.0.0.1:3000/api/tasks/new', {
                        name: this.new_todo,
                        state: 'OPEN'
                    });
                    this.refresh();
                    this.new_todo = undefined;
                }
            },
            refresh: async function () {
                this.todo_list = [];
                await apiService.get('/tasks/list')
                    .then(res => {
                        res.data.forEach(task => this.todo_list.push(task));
                    });
            }
        }
    }
</script>


<style>

</style>