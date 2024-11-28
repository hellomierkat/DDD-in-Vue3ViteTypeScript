<template>
    <div class="selectContainer">

        <div class="editContainer">
            <div class="searchContainer">
                <form action="/">
                    <!-- autofocus is not surport at ios -->
                    <!-- <van-search v-model="data.searchName" :autofocus="true" show-action placeholder="请输入关键词选择楼盘"
              @update:model-value="onSearching" @search="onSearch" @cancel="onCancel" /> -->

                    <van-search v-model="data.searchName" :autofocus="true" show-action shape="round" class="seacrhInp"
                        placeholder="请输入工号或姓名进行查询" v-debounce="{ fn: onSearching, event: 'input', delay: 1000 }"
                        @search="onSearch" @cancel="onCancel" />
                </form>
            </div>
        </div>

        <div class="listContainer">
            <div class="loading" v-if="data.loading">
                <van-loading size="24px" vertical>加载中...</van-loading>
            </div>
            <div class="list" v-if="data.searchList.length > 0">
                <ul>
                    <li v-for="item in data.searchList" :key="item.EmpNo" @click="onChoosedata(item)">
                        <div>{{ item.EmpName + '(' + item.EmpNo + ')' }}</div>
                        <div>{{ item.Department }}</div>
                    </li>
                </ul>
            </div>

            <div class="noDate" v-if="data.searchList.length <= 0"></div>
        </div>


        <div class="btnContainer">
            <van-button block type="primary" :disabled="!data.selected" @click="onbtnSave">
                确 认
            </van-button>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { SearchUser } from '@/domains/UserDomain';
import { GetListAccountInfomationBySearchAsync } from '@/request/apis/accountAPI'

const emits = defineEmits(['save', 'cancel']);


const searchList: Array<SearchUser> = [];

const data = reactive({
    searchName: '',
    loading: false,
    searchList: searchList,
    selected: null
})

const onChoosedata = (item: any): void => {

    console.log("click choose: ", item);

    data.searchName = item.getSimpleUser();
    data.selected = item;
    data.searchList = [];
}

const onSearching = async () => {
    // the function can't finish by using 'oninput', so just use the v-model
    console.log('data.searchName:', data.searchName);

    data.searchList = [];
    data.selected = null;

    if (!data.searchName.trim()) return;
    data.loading = true;

    if (data.searchName.trim()) {

        // start to load list from service
        await GetListAccountInfomationBySearchAsync({SeachValue: data.searchName.trim()}).then((res: any) => {
            console.log("======", res)
            if(res == -1) return;
            
            for(let i = 0; i < res.length; i++) {
                let user = new SearchUser(res[i].empNo, res[i].empName, res[i].departmentName);
                data.searchList.push(user)
            }

            data.loading = false;
        })

    }

}

const onSearch = () => {
    // use same search function
    onSearching()
}

const onCancel = () => {
    console.log("click cancel");

    emits('cancel');
}


const onbtnSave = () => {
    if (data.selected == null) return

    emits('save', data.selected);
}



</script>
  
<style lang="less" scoped>
.selectContainer {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: #f2f2f2;
    z-index: 999;

    .editContainer {
        height: 9vh;
        overflow-y: hidden;
    }

    .listContainer {
        width: 100%;
        height: 83vh;
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: scroll;

        .loading {
            margin-top: 1rem;
        }

        .list {
            width: 92%;
            height: 100%;
            padding: 0 4%;

            ul>li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 5vh;
                font-size: 14px;
                border-bottom: 0.01rem solid #ccc;
                padding: 0 2%;
            }
        }
    }

    .btnContainer {
        width: 100%;
        height: 8vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;

        button {
            width: 40%;
        }

    }
}
</style>
  @/domains/UserDomain