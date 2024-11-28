<template>
    <div class="selectContainer">
        <div :class="{ item, 'active': selectRe.selected == item.value }" v-for="item in selectRe.options" @click="selectRe.SelectChange(item.value)">{{ item.label }}
        </div>
    </div>
</template>
   
<script lang="ts" setup>

const emits = defineEmits<{ (e: 'select', status: number | string): void }>()

const selectRe = reactive({
    selected: "",
    options: [
        { label: "全部", value: "" },
        { label: "处理中", value: 1 },
        { label: "待评价", value: 2 },
        { label: "已完结", value: 4 },
    ],
    SelectChange(value: number|string) {
        selectRe.selected = value as string;
        emits('select', selectRe.selected);
    }
})



</script>
   
<style lang="less" scoped>
.selectContainer {
    width: 100%;
    display: flex;
    margin: 6px 0 16px 0;

    .item {
        margin-left: 16px;
        height: 22px;
        line-height: 22px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.08);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 16px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
    }

    .active {
        background: rgba(2, 86, 255, 0.2);
        color: rgba(2, 86, 255, 1);
    }

}
</style>