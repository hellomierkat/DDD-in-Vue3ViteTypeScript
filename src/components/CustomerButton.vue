<template>
    <div class="bottonContainer" v-debounce="{ fn: fn, event: 'click', delay: 500}">
        {{ text }}
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    text: String
})

const emits = defineEmits(['debounce']);

const fn = () => {
    emits('debounce');
}

</script>

<style lang="less" scoped>
.bottonContainer {
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    background: rgba(24, 144, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);

}
</style>