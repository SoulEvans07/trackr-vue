<template>
    <div class="detail-box">
        <div class="todo-detail-header">
            <div class="mark-btn">
                <svg class="check-icon" focusable="false" viewBox="0 0 32 32">
                    <path d="M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2-0.8,2.8,0l5.4,5.4L26.8,5.4c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z"></path>
                </svg>
                Mark Complete
            </div>
        </div>
        <div class="todo-detail-content">
            <input type="text" class="todo-detail-title"
                   placeholder="Write a task name"
                   v-model="todo.name"/>
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
        </div>
    </div>
</template>

<script>
    export default {
        props: ['todo']
    }
</script>

<style>
    .assignee-due-date-row {
        flex: 1;
        flex-direction: row;
        padding: 10px 0;
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
        border: solid 1px #b7bfc6;
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
        border: solid 1px #b7bfc6;
        min-width: 100px;
        padding: 5px 15px;
        line-height: 30px;
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

    .mark-btn > .check-icon {
        width: 16px;
        height: 16px;
        line-height: 30px;
        fill: #848f99;
        margin-right: 5px;
    }

    .mark-btn:hover {
        background-color: #f6f8f9;
        border: solid 1px #646f79;
        color: #222b37;
        fill: #222b37;
    }

    .mark-btn:active {
        background-color: #edf1f2;
        box-shadow: none;
    }

    .todo-detail-header {
        position: relative;
        height: 50px;
        padding: 10px 5px 10px 30px;
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