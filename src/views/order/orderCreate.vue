<template>
    <div class="createContainer">

        <OrderCreateContext />

        <HomeTabbar :active="active" />

    </div>
</template>

<script lang="ts" setup>

const route = useRoute();
const active = ref(route.name as string);


</script>

<style lang="less" scoped>
.createContainer {
    width: 100vw;
    height: 100vh;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>