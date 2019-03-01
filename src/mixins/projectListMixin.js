import apiService from '../services/apiService';

export default {
    data() {
        // loading: false;
        return {};
    },
    computed: {
        task_list() {
            return this.$store.state.project_list;
        }
    },
    methods: {
        refreshList: async function () {
            let project_list = [];
            await apiService.get('/projects/list')
                .then(res => {
                    res.data.forEach(project => project_list.push(project));
                });
            this.$store.dispatch('setProjectList', project_list);
            console.log("refreshed projectList");
        },
        createProject: async function () {

        },
        updateProject: async function (project) {
            await apiService.post('/projects/' + project._id + '/update', project).then(res => {
                this.$store.dispatch('setProject', { data: res.data });
            });
        },
        deleteProject: async function (project) {
            let index = this.task_list.indexOf(project);

            this.project_list.splice(index, 1);
            await apiService.delete("http://127.0.0.1:3000/api/projects/" + project._id + "/delete");

            this.updateIndicies();
        }
    }
}
