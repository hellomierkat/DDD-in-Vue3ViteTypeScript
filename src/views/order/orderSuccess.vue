<template>
    <div class="allContainer">
        <div class="imgContainer">
            <img :src="successimg" alt="">
        </div>

        <div class="title">报障已完成</div>

        <div class="nav">
            <CustomerButton text="查看申报" @debounce="Nav2HandlingList"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

const router = useRouter();

const successimg = new URL('@/assets/imgs/success.png', import.meta.url).href

const Nav2HandlingList = () => {
    router.replace({ name: "home-orders" });
}

</script>

<style lang="less" scoped>
.allContainer {
    height: 100vh;
    margin: 0 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    color: #fff;

    .imgContainer {
        width: 180px;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -20vh;

        img {
            width: 100%;
        }
    }

    .title {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.26px;
        color: rgba(92, 107, 140, 1);
        text-align: center;
        vertical-align: top;
    }

    .node {
        font-size: 14px;
        margin-top: 25px;
    }

    .nav {
        width: 100%;
        font-size: 18px;
        font-weight: 600;
        margin-top: 30px;
        color: #2DD8CF;

        .text {
            margin-left: 4px;
        }
    }
}
</style>