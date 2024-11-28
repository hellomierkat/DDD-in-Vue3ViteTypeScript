<template>
    <van-pull-refresh v-model="refresh.loading" @refresh="refresh.onRefresh">
        <div class="orderListContainer">
            <van-list v-model:loading="vanlist.loading"
                @load="vanlist.onLoad">

                <OrderListItem v-for="item in orders.data" :key="item.Id" :order="item" @click="Nav2Details(item.Id)" />

            </van-list>

            <ContextEmpty v-if="!vanlist.loading && orders.data.length == 0" />
        </div>
    </van-pull-refresh>
</template>

<script lang="ts" setup>
import { OrderPagedListInput } from '@/dtos/orderDtos';
import { OrderAggregation } from '@/domains/orderDomain';
import { GetPagedOrderAsync } from '@/request/apis/orderAPI'
import { showLoadingToast, closeToast } from 'vant';
import router from '@/routes';
import Search from '@/assets/helper/search';

import { Query as orderQuery } from '@/domains/orderDomain'

const route = useRoute();

const props = defineProps({
    OrderStatus: {
        type: [Number, String]
    },
    No: {
        type: Search,
        default: ""
    }
})


const orders = reactive({
    totalCount: -1,
    pageIndex: 0,
    pageSize: 10,
    data: new Array<OrderAggregation>,

    init() {
        this.totalCount = 0;
        this.pageIndex = 0;
        this.pageSize = 10;
        this.data = new Array<OrderAggregation>
    },

    async getdata() {

        // input data
        let input = new OrderPagedListInput(
            props.No.Value,
            props.OrderStatus ? props.OrderStatus : "",
            this.pageIndex,
            this.pageSize)

        let res = await orderQuery.simpleOrderListAsync(input);


        this.data = this.data.concat(res.Orders);
        this.totalCount = res.TotalCount;
        vanlist.loading = false;

    },

    async GetNextPage(isFirst: boolean = true) {

        if (!isFirst && this.data.length == this.totalCount) {
            return;
        }

        vanlist.loading = true;
        this.pageIndex++;

        await this.getdata();
    },
})


// let pageIndex = 0, pageSize = 10;


// let input = new orderInputs.OrderPagedListInput(
//             props.No.Value,
//             props.OrderStatus ? props.OrderStatus : "",
//             pageIndex,
//             pageSize);

// const orders : orderDtos.OrderPagedListDto = await orderQuery.simpleOrderListAsync(input);


// let isFirt = true;

// onMounted(async () => {
//     await orders.GetNextPage();
// })

const keepAliveGetData = async () => {
    console.log("====================")
    if (!route.meta.keepAlive) await orders.GetNextPage();
}

onActivated(async () => {
    keepAliveGetData();
})

onDeactivated(() => {
    closeToast()
})


watch(() => props.OrderStatus, async (nval, oval) => {

    if (nval != oval) {
        orders.init();
        await orders.GetNextPage();
    }
})

watchPostEffect(async () => {

    if (props.No.Submit) {
        orders.init();
        await orders.GetNextPage();
    }

})


const refresh = reactive({
    loading: false,
    async onRefresh() {
        refresh.loading = false;

        orders.init();
        // await orders.GetNextPage();
        keepAliveGetData();

    }
})

const vanlist = reactive({
    loading: false,
    async onLoad() {
        if (!vanlist.loading) return;

        // orders.GetNextPage(false);
        keepAliveGetData();
    }
})


// const orders = reactive({
//     totalCount: -1,
//     pageIndex: 0,
//     pageSize: pageSize,
//     data: new Array<orderDtos.SimpleOrderDto>,
//     init() {
//         this.totalCount = 0;
//         this.pageIndex = 0;
//         this.pageSize = pageSize;
//         this.data = new Array<orderDtos.SimpleOrderDto>
//     },
//     async GetNextPage(isFirst: boolean = true) {

//         if (!isFirst && this.data.length == this.totalCount) {
//             return;
//         }

//         vanlist.loading = true;
//         this.pageIndex++;

//         await this.getdata();
//     },
//     async getdata() {

//         // input data
//         let input = new orderInputs.OrderPagedListInput(
//             props.No.Value,
//             props.OrderStatus ? props.OrderStatus : "",
//             this.pageIndex,
//             this.pageSize)

//         let reacRes = await orderQuery.simpleOrderListAsync(input);

//         console.log("this: ", this)

//         this.data = re
//         this.totalCount = reacRes.TotalCount;
//         vanlist.loading = false


//         // await GetPagedOrderAsync(
//         //     {
//         //         No: props.No.Value,
//         //         Status: props.OrderStatus ? props.OrderStatus : "",
//         //         SkipCount: this.pageIndex,
//         //         MaxResultCount: this.pageSize,
//         //         Filter: "",
//         //         Sorting: ""
//         //     }).then((res: any) => {

//         //         if (res == -1) return;

//         //         for (let i = 0; i < res.items.length; i++) {
//         //             let one: orderDtos.SimpleOrderDto = new orderDtos.SimpleOrderDto(
//         //                 res.items[i].id,
//         //                 res.items[i].no,
//         //                 res.items[i].enginnerName,
//         //                 res.items[i].description,
//         //                 res.items[i].status,
//         //                 res.items[i].uploaderNo,
//         //                 res.items[i].creationTime,
//         //                 "");

//         //             this.data.push(one);
//         //         }

//         //         this.totalCount = res.totalCount;
//         //         vanlist.loading = false

//         //         // isFirt = false;
//         //     })
//         //     .catch((err: any) => {

//         //     })
//     }
// })

const Nav2Details = (id: string) => {
    console.log("details id is:", id)
    router.push({ name: "orderDetail", query: { id: id } });
}

</script>

<style lang="less" scoped>
.orderListContainer {
    width: 92vw;
    margin: 0 4vw;
    // min-height: 76vh;
    //max-height: 84vh;
    // border: 1px solid pink;
    // overflow: hidden;
    overflow-y: auto;
    padding-bottom: 7vh;
    // border: 1px solid red;

}
</style>@/domains/OrderDomain