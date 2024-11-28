<template>
    <div class="lineContainer" @click="EditContext">
        <div class="title" :style="{ width: width + '%' }">{{ title }}</div>
        <div class="context" v-textOverflow="showLine">
            <div class="contextContainer">
                {{ context }}
                <div v-if="edit" class="imgContainer">
                    <img :src="img" alt="">
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    title: {
        type: String,
        required: true
    },

    context: {
        type: String,
        required: true
    },

    showLine: {
        type: Number,
        default: 5
    },

    width: {
        type: Number,
        default: 26
    },

    edit: {
        type: Boolean,
        default: false
    }
})

const img = new URL('@/assets/imgs/icon-edit.png', import.meta.url).href;

const emits = defineEmits(['EditContext'])

const EditContext = () => {
    if (!props.edit) return;

    emits('EditContext');
}
</script>

<style lang="less" scoped>
.lineContainer {
    display: flex;
    padding: 6px 0;
    line-height: 22px;

    .title {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.7);
    }

    .context {
        flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);

        .contextContainer {
            flex: 3.5;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }

        .imgContainer {
            width: 12px;
            height: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 6px;

            img {
                width: 100%;
            }
        }
    }
}
</style>