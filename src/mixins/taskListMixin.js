import store from '../store';
import apiService from '../services/apiService';

export default {
    data() {
        // loading: false;
        return {
            task_list: store.state.tasks
        };
    },
    methods: {
        refreshList: async function () {
            this.task_list = [];
            await apiService.get('/tasks/list')
                .then(res => {
                    res.data.forEach(task => this.task_list.push(task));
                });
            this.sortList();
        },
        createTask: async function () {

        },
        updateTask: async function () {

        },
        deleteTask: async function (task) {
            let index = this.task_list.indexOf(task);

            this.task_list.splice(index, 1);
            await apiService.delete("http://127.0.0.1:3000/api/tasks/" + task._id + "/delete");

            this.updateIndicies();
        },

        updateIndicies: function() {
            this.task_list.forEach(task => task.index = this.task_list.indexOf(task));
        },

        sortList: function () {
            this.task_list.sort((a, b) => {
                return a.index - b.index;
            });
        }
    }
}