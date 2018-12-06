<template>
    <div class="detail-box">
        <div class="todo-detail-header">
            <div class="mark-btn"
                 @click="markDone"
                 v-if="!todo.is_done">
                <svg class="check-icon" focusable="false" viewBox="0 0 32 32">
                    <path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2-0.8,2.8,0l5.4,5.4L26.8,5.4c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z"></path>
                </svg>
                Mark Complete
            </div>
            <div class="mark-btn completed"
                 @click="markDone"
                 v-if="todo.is_done">
                <svg class="check-icon completed" focusable="false" viewBox="0 0 32 32">
                    <path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2-0.8,2.8,0l5.4,5.4L26.8,5.4c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z"></path>
                </svg>
                Completed
            </div>
            <div class="toolbar">
                <a class="toolbar-btn"
                    @click="close">
                    <svg class="svg-icon" focusable="false" viewBox="0 0 32 32">
                        <path d="M18.1,16l8.9-8.9c0.6-0.6,0.6-1.5,0-2.1c-0.6-0.6-1.5-0.6-2.1,0L16,13.9L7.1,4.9c-0.6-0.6-1.5-0.6-2.1,0c-0.6,0.6-0.6,1.5,0,2.1l8.9,8.9l-8.9,8.9c-0.6,0.6-0.6,1.5,0,2.1c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4l8.9-8.9l8.9,8.9c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4c0.6-0.6,0.6-1.5,0-2.1L18.1,16z"></path>
                    </svg>
                </a>
            </div>

        </div>
        <div class="todo-detail-content">
            <input type="text" class="todo-detail-title"
                   placeholder="Write a task name"
                   v-model="todo.name"
                   v-on:blur="updateTask(todo)"/>
            <div class="assignee-due-date-row">
                <div class="assignee">
                    <div class="assignee-img"></div>
                    <div class="assignee-label">
                        <div class="assigned-to">Assigned To</div>
                        <div class="assignee-name">{{todo.assignee ? todo.assignee.username : 'Unassigned'}}</div>
                    </div>
                </div>
                <div class="due_date">{{todo.due_date ? todo.due_date : 'Due Date'}}</div>
            </div>

            <div class="todo-description-row">
                <svg class="descriptionIcon" focusable="false" viewBox="0 0 32 32">
                    <path d="M31,8H1C0.4,8,0,7.6,0,7s0.4-1,1-1h30c0.6,0,1,0.4,1,1S31.6,8,31,8z"></path>
                    <path d="M23,14H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,14,23,14z"></path>
                    <path d="M27,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h26c0.6,0,1,0.4,1,1S27.6,20,27,20z"></path>
                    <path d="M19,26H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S19.6,26,19,26z"></path>
                </svg>
                <textarea class="todo-description"
                          v-model="todo.description"
                          v-on:blur="updateTask(todo)"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
    import taskListMixin from "../mixins/taskListMixin";

    export default {
        mixins: [taskListMixin],
        props: ['todo'],
        methods: {
            markDone: async function () {
                this.todo.is_done = !this.todo.is_done;
                await this.updateTask(this.todo);
                // this.setStyle();
            },
            close: function () {
                this.$emit("deselect");
            }
        }
    }
</script>

<style>
    .todo-description-row {
        padding: 10px 0;
        display: flex;

        border-bottom: solid 1px #dfe5e7;
    }

    .todo-description {
        flex: 1;
        outline: 0;
        border: 0;
        padding: 5px;

        resize: vertical;
        min-height: 2.2em;
    }

    .todo-description:hover {
        border-radius: 3px;
        border: solid 1px #b7bfc6;
        padding: 4px;
    }

    .todo-description:active, .todo-description:focus {
        border-radius: 3px;
        border: solid 1px #646f79;
        padding: 4px;
        box-shadow: inset 0 1px 5px -1px rgba(0, 0, 0, 0.25)
    }

    .descriptionIcon {
        fill: #b7bfc6;
        width: 16px;
        height: 16px;
        margin-right: 10px;
    }

    .assignee-due-date-row {
        flex: 1;
        flex-direction: row;
        padding: 10px 0;

        border-bottom: solid 1px #dfe5e7;
    }

    .assignee {
        float: left;
        display: inline-flex;
        border-radius: 30px;
        border: 0;
        min-width: 100px;
        padding: 3px 15px 3px 3px;
        flex-direction: row;
        text-overflow: ellipsis;
        /*margin-right: 80px;*/
    }

    .assignee:hover {
        border: solid 1px #646f79;
        padding: 2px 15px 2px 2px;
    }

    .assignee-label {
        flex-direction: column;
    }

    .assignee-img {
        border-radius: 30px;
        border: solid 1px #b7bfc6;
        height: 33px;
        width: 33px;
        margin-right: 10px;
    }

    .assigned-to {
        text-align: left;
        line-height: normal;
        font-size: 12px;
        color: #848f99;
    }

    .assignee-name {
        text-align: left;
        line-height: normal;
    }

    .due_date {
        display: inline-flex;
        border-radius: 30px;
        border: none;
        min-width: 100px;
        padding: 5px 15px;
        line-height: 30px;
    }

    .due_date:hover {
        border: solid 1px #646f79;
        padding: 4px 14px;
    }

    .toolbar {
        line-height: 30px;
        font-size: 13px;
        float: right;
        padding-right: 5px;
    }

    .toolbar-btn {
        cursor: pointer;
        outline: 0;
        padding: 7px 0;
        text-align: center;
        align-items: center;
        display: inline-flex;
    }

    .toolbar-btn > .svg-icon {
        width: 16px;
        height: 16px;
        line-height: 30px;
        fill: #848f99;
        margin-right: 5px;
    }

    .toolbar-btn:hover > .svg-icon {
        fill: #222b37;
    }
    .toolbar-btn:active > .svg-icon {
        fill: #222b37;
    }

    .mark-btn {
        float: left;
        background: #fff;
        border: solid 1px #b7bfc6;
        border-radius: 4px;
        cursor: pointer;
        height: 30px;
        padding: 0 9px;
        line-height: 30px;
        color: #646f79;
        font-size: 13px;
        min-width: 50px;
        text-align: center;
        align-items: center;
        display: inline-flex;
    }

    .mark-btn.completed {
        color: white;
        background: #25e8c8;
        border-color: #25e8c8;
    }

    .mark-btn > .check-icon {
        width: 16px;
        height: 16px;
        line-height: 30px;
        fill: #848f99;
        margin-right: 5px;
    }

    .mark-btn > .check-icon.completed {
        fill: white;
    }

    .mark-btn:hover {
        background-color: #f6f8f9;
        border: solid 1px #646f79;
        color: #222b37;
        fill: #222b37;
    }

    .mark-btn.completed:hover {
        background-color: #00bf9c;
        border-color: #00bf9c;
        color: white;
    }

    .mark-btn.completed:active {
        background-color: #008c72;
        border-color: #008c72;
        color: white;
    }

    .mark-btn:active {
        background-color: #edf1f2;
        box-shadow: none;
    }

    .todo-detail-header {
        position: relative;
        height: 50px;
        padding: 10px 5px 10px 25px;
        border-bottom: solid 1px #dfe5e7;
    }

    .todo-detail-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 10px 25px 0;
    }

    .todo-detail-title {
        vertical-align: center;
        font-size: 30px;
        padding: 1px 15px;
        outline: 0;
        border: 0;
    }

    .todo-detail-title:hover {
        border: solid 1px #d5dce0;
        border-radius: 4px;
        padding: 0 14px;
    }

    .detail-box {
        flex: 1;
        flex-direction: column;
        margin-left: 20px;
        background: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.15);
    }
</style>
