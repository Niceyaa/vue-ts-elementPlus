<template>
    <div class="common-button">
        <i :class="icon"></i>
        <span>{{btnName}}</span>
    </div>
</template>

<script>
    export default {
        name: "error",
        props: {
            icon: {
                type: String
            },
            btnName: {
                type: String
            }
        },
    }
</script>

<style scoped lang="less">
    .common-button {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333333;
        cursor: pointer;
        &:hover{
            color: @activeColor;
        }
        i{
            margin-right: 5px;
        }
    }
</style>
