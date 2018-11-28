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
        <div class="detail-content">

            <div class="todo-detail-content">
                <input type="text" class="todo-detail-title"
                       v-model="todo.name"/>
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

    .mark-btn:active{
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
        padding: 0 25px;
    }

    .todo-detail-title {
        font-size: 30px;
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