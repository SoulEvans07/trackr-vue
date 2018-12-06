import apiService from '../services/apiService';

export default {
    data() {
        // loading: false;
        return {};
    },
    computed: {
        task_list() {
            return this.$store.state.task_list;
        }
    },
    methods: {
        refreshList: async function () {
            let task_list = [];
            await apiService.get('/tasks/list')
                .then(res => {
                    res.data.forEach(task => task_list.push(task));
                });
            task_list.sort((a, b) => {
                return a.index - b.index;
            });
            this.$store.dispatch('setTaskList', task_list);
            console.log("refreshed");
        },
        createTask: async function () {

        },
        updateTask: async function (task) {
            let index = task.index;
            // console.log("indx: " + index);
            // console.log("task: " + task.index);
            // console.log("byId: " + this.getById(task._id));
            await apiService.post('/tasks/' + task._id + '/update', task).then(res => {
                this.$store.dispatch('setTask', { index: index, data: res.data });
            });
        },
        deleteTask: async function (task) {
            let index = this.task_list.indexOf(task);

            this.task_list.splice(index, 1);
            await apiService.delete("http://127.0.0.1:3000/api/tasks/" + task._id + "/delete");

            this.updateIndicies();
        },

        getById: function (id) {
            console.log("match: " + id);
            let index = -1;
            this.task_list.forEach(task => {
                console.log(task._id);
                if (task._id === id) {
                    console.log("found: " + JSON.stringify(task));
                    index = this.task_list.indexOf(task);
                }
            });
            return index;
        },

        updateIndicies: function () {
            this.task_list.forEach(task => task.index = this.task_list.indexOf(task));
        },
    }
}
