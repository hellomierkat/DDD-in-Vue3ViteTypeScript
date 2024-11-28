<template>
    <div class="faultTypeContainer">

        <div class="title">故障类型</div>

        <div class="select" @click="showPicker = true">
            <div></div>
            <div class="context">{{ fieldValue }}</div>
            <div class="imgContainer">
                <img :src="img" alt="">
            </div>
        </div>

        <!-- <van-field v-model="fieldValue" is-link readonly label="故障类型" placeholder="选择类型" @click="showPicker = true" /> -->
        <van-popup v-model:show="showPicker" round position="bottom">
            <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
    </div>
</template>

<script lang="ts" setup>
import { GetAllFaultAsync } from "@/request/apis/faultAPI"
import { showToast } from 'vant';

const fieldValue = ref('');
const showPicker = ref(false);

const img = new URL("@/assets/imgs/icon-down.png", import.meta.url).href;

const emits = defineEmits(['confirm']);

const onConfirm = (options: any) => {
    console.log("options：", options);

    showPicker.value = false;
    fieldValue.value = options.selectedValues[0] + '-' + options.selectedValues[1];

    // console.log("已选择：", options.selectedValues);
    emits('confirm', { ConfirmFaultId: options.selectedOptions[0].id, ConfirmSubFaultId: options.selectedOptions[1].id });
};

const columns = ref(Array<any>())

// get settings from service  
onMounted(async () => {

    await GetAllFaultAsync({ Status: 1 })
        .then((res: any) => {
            // console.log("保障类型集合success：", res);
            if (res == -1) return;
            let list = res.items;

            for (let i = 0; i < list.length; i++) {
                let fa = { id: list[i].id, text: list[i].name, value: list[i].name, children: Array<any>() };

                for (let j = 0; j < list[i].subFaults.length; j++) {
                    let sub: any = { id: list[i].subFaults[j].id, text: list[i].subFaults[j].name, value: list[i].subFaults[j].name };
                    fa.children.push(sub);
                }

                columns.value.push(fa)
            }

            // console.log("columns: ", columns.value)

        })
        .catch((err: any) => {
            showToast({
                message: "获取故障服务类型失败",
                wordBreak: 'break-word',
            });
        })
})



//  columns = [
//     {
//         text: '浙江',
//         value: 'Zhejiang',
//         children: [

//             { text: '西湖区', value: 'Xihu' },
//             { text: '余杭区', value: 'Yuhang' },
//         ],
//     },
//     {
//         text: '福建',
//         value: 'Fujian',
//         children: [

//             { text: '鼓楼区', value: 'Gulou' },
//             { text: '台江区', value: 'Taijiang' },
//         ],
//     },
// ];
</script>

<style lang="less" scoped>
.faultTypeContainer {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // border: 1px solid red;
    margin-top: 12px;

    .title {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.7);
    }

    .select {
        flex: 1;
        margin-left: 10px;
        width: 100%;
        height: 30px;
        opacity: 1;
        border-radius: 2px;
        background: rgba(242, 242, 242, 1);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0px 4px 4px;
        

        .imgContainer {
            margin-right: 10px;
        }
    }
}
</style>