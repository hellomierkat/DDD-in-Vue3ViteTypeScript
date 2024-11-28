<template>
    <span class="orderStatusContainer">
        <img :src="img" alt="">
    </span>
</template>

<script lang="ts" setup>

const props = defineProps({
    status: {
        type: Number,
        default: 0,
        required: false
    },

})

// console.log("status:", props.status)


// debugger
let img: string = '';
switch (props.status) {
    case 1:
        img = new URL('@/assets/imgs/status-handling.png', import.meta.url).href;
        break;
    case 2:
    case 3:
        img = new URL('@/assets/imgs/status-evaluated.png', import.meta.url).href;
        break;
    case 4:
        img = new URL('@/assets/imgs/status-resolved.png', import.meta.url).href;
        break;
    case 100:
        img = new URL('@/assets/imgs/status-finished.png', import.meta.url).href;
        break;
    default:
        break;
}


</script>

<style lang="less" scoped>
.orderStatusContainer {
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
    }
}
</style>