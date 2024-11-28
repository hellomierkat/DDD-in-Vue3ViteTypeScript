<template>
    <div class="autologinContainer">
        <div class="imgContainer">
            <img :src="img" alt="">
        </div>
        <div class="title">认证登陆中</div>
    </div>
</template>
  
<script lang="ts" setup>
import { GetUrlItems } from '@/assets/helper/utils'
import { loginJump } from '@/assets/helper/jump'
import { showConfirmDialog, showToast, showLoadingToast, closeToast } from 'vant';
// import { QWLoginAsync } from '@/request/apis/accountAPI'
const router = useRouter();

const currentUrl = window.location.href;
const search = window.location.search;

const img = new URL('@/assets/imgs/autologin.gif', import.meta.url).href

let reqObj = GetUrlItems(currentUrl);
let userid = reqObj["userid"];
let accesskey = reqObj["accesskey"];
let timestamp = reqObj["timestamp"];
let nonce = reqObj["nonce"];
let signature = reqObj["signature"];

const checkUrl = (): string => {
    let msg: string = "";
    if (!userid)
        msg = '账号为空，登陆失败';

    if (!timestamp)
        msg = '校验时间串为空，登陆失败';

    if (!signature)
        msg = '签名值为空，登陆失败';

    return msg;
}


var params = {
    userid: userid,
    accesskey: accesskey,
    timestamp: timestamp,
    nonce: nonce,
    signature: signature,
};

// console.log("AAA", params)

onMounted(async () => {

    let msg = checkUrl();
    if (msg != "") {
        return showLoadingToast({
            message: msg,
            forbidClick: true
        });
    }

    // 开始调用登陆接口
    // await QWLoginAsync({ ...params })
    //     .then((res: any) => {
    //         // console.log("login res: ", res);
    //         if(res == -1) return;
    //         localStorage.setItem('Authorization', `Bearer ${res.jwtToken}`);
    //         localStorage.setItem("currentUser", JSON.stringify(res));

    //         router.replace({name: loginJump.GetJumpPathNameByRole()});
    //     })
    //     .catch((err: any) => {
    //         // console.log("login err: ", err);
    //         showToast({
    //             message: err.message,
    //             wordBreak: 'break-word',
    //         });
    //     })
})



</script>
  
<style lang="less" scoped>
.autologinContainer {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .imgContainer {
        margin-top: -20vh;
        width: 200px;
        height: 200px;
        // border: 1px solid red;
        overflow: hidden;

        img {
            width: 100%;
        }
    }

    .title {
        font-weight: 600;
        font-size: 15px;
        text-shadow: 2px 2px 4px rgb(131, 128, 128);
        color: rgb(58, 42, 42);
    }
}
</style>