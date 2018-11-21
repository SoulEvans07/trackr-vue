<template>
    <li @click="markDone">
        <span :class="this.class">{{this.todo.state}}</span>
        <span>{{this.todo.name}}</span>
    </li>
</template>

<script>
    import apiService from '../services/apiService';

    const STATE = [ "OPEN", "IN_PROGRESS", "DONE" ];

    export default {
        props: [ 'todo' ],
        data() {
            return {
                class: ""
            }
        },
        mounted() {
            this.setStyle();
        },
        methods: {
            markDone: function () {
                switch (this.todo.state) {
                    case STATE[ 0 ]:
                        this.todo.state = STATE[ 1 ];
                        break;
                    case STATE[ 1 ]:
                        this.todo.state = STATE[ 2 ];
                        break;
                    case STATE[ 2 ]:
                        this.todo.state = STATE[ 0 ];
                        break;
                }

                apiService.post('/tasks/' + this.todo._id + '/update', this.todo)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
                this.setStyle();
            },
            setStyle: function () {
                this.class = "state " + this.todo.state.toLowerCase();
            }
        }
    }
</script>

<style>
    .state {
        font-weight: bold;
        color: white;
        border-radius: 2px;
        padding: 2px;
        cursor: pointer;
    }

    .open {
        background: darkblue;
    }

    .in_progress {
        background: #ffc511;
    }

    .done {
        background: #00b600;
    }
</style>