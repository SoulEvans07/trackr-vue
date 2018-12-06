import apiService from '../services/apiService';

export default {
    data() {
        // loading: false;
        return {
            // task_list: this.$store.state.task_list
        };
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
            let index = this.task_list.indexOf(task);
            console.log("i: " + index);
            await apiService.post('/tasks/' + task._id + '/update', task).then(res => {
                console.log(res.data);
                 this.$store.dispatch('setTask', {index: index, data: res.data});
            });
        },
        deleteTask: async function (task) {
            let index = this.task_list.indexOf(task);

            this.task_list.splice(index, 1);
            await apiService.delete("http://127.0.0.1:3000/api/tasks/" + task._id + "/delete");

            this.updateIndicies();
        },

        getById: function(id){
            this.task_list.forEach(task => {
                if(task._id === id){
                    return task;
                }
            })
        },

        updateIndicies: function() {
            this.task_list.forEach(task => task.index = this.task_list.indexOf(task));
        },
    }
}
