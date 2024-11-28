<template>
    <div class="homeTabbarContainer">
        <van-tabbar :model-value="props.active" v-if="props.active && $route.meta.tabbar">

            <!-- default method to create domcument -->
            <!-- <van-tabbar-item replace to="/home-handling" icon="todo-list-o" name="home-handling"> 当前工单 </van-tabbar-item>
<van-tabbar-item replace to="/orderCreate" icon="guide-o" name="orderCreate"> 立即报障 </van-tabbar-item>
<van-tabbar-item replace to="/home-finish" icon="column" name="home-finish"> 历史工单 </van-tabbar-item> -->

            <van-tabbar-item v-for="item in tabbars" :key="item.name" replace :to="item.to" :icon="item.icon"
                :name="item.active">
                {{ item.title }}
            </van-tabbar-item>

        </van-tabbar>
    </div>
</template>
<script lang="ts" setup>

// get show tabbar routers
var router = useRouter();
let barRouters = router.getRoutes().filter(el => el.meta.tabbar == true)
    , data: Array<any> = [];

// create tabbar data structure
for (let i = 0; i < barRouters.length; i++) {
    let one = barRouters[i].meta;
    one.to = barRouters[i].path;
    one.active = barRouters[i].name;
    data.push(one);
}

// vue ref 
const tabbars = ref(data)


const props = defineProps({
    active: {
        type: String,
        required: true
    },
})

</script>
   
<style lang="less" scoped>
    .homeTabbarContainer {
        font-weight: 800;
        // position: fixed;
        // left: 0;
        // bottom: 0;
        // position: absolute;
        // width: 100%;
        // height: 100%;
    }

</style>