<template>
    <!-- <div class="listContainer" ref="elWrap" @scroll="handleScroll()"> -->
    <div class="listContainer" ref="elWrap">

        <div class="header">
            <OrderSearch :search="form.search" class="input" />
            <OrderStatusSelect class="select" @select="form.SelectChange" />
        </div>

        <OrderList class="context" :OrderStatus="orderStatus" :No="form.search" />

        <HomeTabbar :active="active" />
    </div>
</template>

<script lang="ts" setup>

import Search from '@/assets/helper/search';
// import useScroll from '@/assets/helper/pageScroll'

// record scroll position, ready to restore after redirect
// const { el: elWrap, handleScroll } = useScroll()


const route = useRoute();
const active = ref(route.name as string)

const form = reactive({
    search: new Search(""),
    SelectChange(status: number | string) {
        orderStatus.value = status;
    }
})


// 本页工单整体状态
let orderStatus = ref();

onMounted(async () => {

})


</script>

<style lang="less" scoped>
.listContainer {
    width: 100vw;
    height: 100vh;
    // position: absolute;
    width: 100%;
    height: 100%;

    overflow-y: auto;

    // position: fixed;
    // left: 0;
    // top: 0;

    position: absolute;
    width: 100%;
    height: 100%;


    .header {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;

        .select {
            flex: 2;
        }

        .input {
            flex: 7
        }
    }

    .context {}
}
</style>