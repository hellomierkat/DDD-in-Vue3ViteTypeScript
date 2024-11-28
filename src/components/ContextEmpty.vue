<template>
    <div class="emptyContainer">
        <div class="imgContainer">
            <img :src="img" alt="">
        </div>

        <div class="title">暂无数据</div>
        <div class="subtitle">当前没有等待处理的故障，如要申报故障，请点击故障申报</div>

        <!-- <div class="node">IT SERVICE PRO团队始终为您服务</div> -->
    </div>
</template>

<script lang="ts" setup>
const img = new URL('@/assets/imgs/empty.png', import.meta.url).href
</script>

<style lang="less" scoped>
.emptyContainer {
    // height: 84vh;
    // border: 1px solid red;
    margin-top: 82px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    color: #666;

    .imgContainer {
        width: 180px;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
        }
    }

    .title {
        font-size: 20px;
        font-weight: 700;
        margin: 20px 0 0 0;
    }

    .subtitle {
        margin: 20px 14% 0;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.26px;
        color: rgba(92, 107, 140, 1);
    }

    .node {
        font-size: 12px;
        margin-top: 5vh;
    }
}
</style>