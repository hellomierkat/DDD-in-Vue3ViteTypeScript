<template>
    <div class="lineContainer">
        <div class="imgContainer" v-for="item, index in imgs.list" @click="ShowImagePreview(index)">
            <img :src="item" alt="">
        </div>
    </div>
</template>

<script lang="ts" setup>
import { DownLoadAsync } from '@/request/apis/fileAPI'
import { showImagePreview } from 'vant';

const props = defineProps({
    ids: {
        type: Array<string>,
        required: true
    }
})

const imgs = reactive({
    list: new Array<string>()
})

const getFiles = async (files: Array<string>) => {
    // files download
    for (let i = 0; i < files.length; i++) {

        await DownLoadAsync({ id: files[i] })
            .then((res: any) => {
                if (res == -1) return;
                // 后台返回类型： "application/octet-stream" 前端读取类型 "blob"， 无需设置contentType
                // let contentType = "image/jpeg"
                // const blob = new Blob([res], { type: contentType });

                const blob = new Blob([res]);

                // 1，base64
                // let fr = new FileReader()
                // fr.readAsDataURL(blob)
                // fr.onload = function (e) {
                //     console.log(e?.target?.result);
                //     img.value = e?.target?.result ? e.target.result as string : "";
                // }

                // 2，blob 
                let url = window.URL.createObjectURL(blob);
                imgs.list.push(url);

            })
            .catch((err: any) => {

            })
    }
}

onMounted(async () => {
    console.log("AA", props.ids)
    await getFiles(props.ids);
})



const ShowImagePreview = (index: number) => {
    showImagePreview({
        images: imgs.list,
        startPosition: index
    })
} 
</script>

<style lang="less" scoped>
.lineContainer {
    display: flex;
    justify-content: space-start;
    align-items: center;
    margin: .5rem 0 .1rem 0;
    // border: 1px solid red;
    height: 100px;
    overflow: hidden;
    flex-direction: row;

    .imgContainer {
        width: 102px;
        height: 102px;
        // width: 30%;
        border: 1px solid #eee;

        img {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            // object-fit: fill / contain / cover / none / scale-down
            object-fit: fill
        }
    }
}
</style>