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
        sortList: function () {
            this.task_list.sort((a, b) => {
                return a.index - b.index;
            });
        }
    }
}