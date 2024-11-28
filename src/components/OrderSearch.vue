<template>
    <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <div class="searchContainer">
        <div class="input">
            <form action="/">
                <van-search v-model="search.Value" placeholder="请输入申报单号搜索" @search="onSearch" />
            </form>
        </div>
    </div>
</template>
   
<script lang="ts" setup>
import Search from '@/assets/helper/search';

const props = defineProps({
    search: {
        type: Search,
        required: true
    }
})


const onSearch = (val: string) => {
    props.search.submitSearchValue();
};



</script>
   
<style lang="less" scoped>
.searchContainer {
    width: 100%;
}

:deep(.van-search) {
    margin: 0 16px;
    padding: 10px 0;
}

:deep(.van-search__content) {
    border-radius: 4px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(2, 86, 255, 1);
    box-shadow: inset 0px 0px 10px 0px rgba(2, 86, 255, 0.2);
}
</style>