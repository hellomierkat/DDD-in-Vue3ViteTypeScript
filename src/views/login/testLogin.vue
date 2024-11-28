<template>
    <div class="testContainer">
        <div class="top">
            <p>快速登陆</p>
            <button @click="TestLogin('104865')">周工</button>
            <button @click="TestLogin('114987')">曾工</button>
            <button @click="TestLogin('13446')">杨工</button>
            <button @click="TestLogin('0034')">郑工</button>
        </div>
        <div class="bottom">
            <input type="text" v-model="empNo"> <a @click="TestLogin('')">登陆</a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CurrentUser } from '@/domains/UserDomain';
import { loginJump } from '@/assets/helper/jump'

const empNo = ref("developer");
const router = useRouter();

const TestLogin = async (_empNo: string) => {

    let no = _empNo ? _empNo : empNo.value;
    console.log("user click login btn, value: ", no);


    // 构造当前用户信息
    let _user = new CurrentUser(no);
    await _user.Init(); // 初始化用户信息， 这里需要走异步，因为页面需要等待其结束后采取后续的页面行为

    if(localStorage.getItem("currentUser")) {

        // 页面行为放在页面中处理，不要在domain中处理。
        router.replace({ name: loginJump.GetJumpPathNameByRole() });
    }

}

</script>

<style lang="less" scoped>
.testContainer {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .top {
        margin-bottom: 10vh;
    }

    .bottom {
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    a {
        margin-left: 4%;
    }
}
</style>