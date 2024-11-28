<template>
    <div class="listContainer">

        <OrderSearch :search="form.search" />

        <OrderList :OrderStatus="orderStatus" :No="form.search" EmpNo="139811" />

        <HomeTabbar :active="active" />
    </div>
</template>

<script lang="ts" setup>

import Search from '@/assets/helper/search';

const route = useRoute();
const active = ref(route.name as string)

const form = reactive({
    search: new Search("")
})

// 本页工单整体状态
const orderStatus = 2;

onMounted(async () => {

})


</script>

<style lang="less" scoped>
.listContainer {
    width: 100vw;
    height: 100vh;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>