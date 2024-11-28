<template>
    <div class="orderListItemContainer">
        <div class="top">
            <div class="title">
                <div class="titleText">故障编号：<span> {{ order.No }} </span></div>

                <div class="tagContainer">
                    <OrderStatus class="marginR" v-if="order.Uplaoder?.EmpNo == currentUserEmpNo && order.Status == 2"
                        :status="100" />

                    <OrderStatus :status="order.Status" />
                </div>

            </div>

            <div class="subTitle" v-textOverflow="1">
                <span class="itemTitle">故障描述：</span> <span class="desc">{{ order.Description }}</span>
            </div>
        </div>
        <div class="bottom">
            <div class="left">
                <span class="title">受理工程师：</span><span class="text">{{ order.Handler?.EmpName }}</span>
            </div>
            <div class="right">
                <span class="text">创建时间：{{ order.CreationTime }}</span>
            </div>
        </div>

        <div class="status"></div>
    </div>
</template>

<script lang="ts" setup>
import { OrderAggregation } from '@/domains/orderDomain'
import { storage } from '@/assets/helper/storage'

const currentUserEmpNo = storage.getCurrentUserEmpNo();

const props = defineProps({
    order: {
        type: OrderAggregation,
        required: true
    },
})


</script>
<style lang="less" scoped>
.orderListItemContainer {
    width: 92%;
    margin-top: 2px;
    margin-bottom: 14px;
    padding: 3%;
    border-radius: 4px;
    font-size: 14px;
    overflow: hidden;
    position: relative;

    border-radius: 4px;
    background: rgba(95, 115, 251, 0.01);
    box-shadow: 0px 0px 2px 0px rgba(95, 115, 251, 0.4);

    .top {

        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 0px;
            line-height: 0px;
            color: rgba(61, 61, 61, 1);

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .titleText {
                padding-right: 10px;
            }

            .tagContainer {
                display: flex;
                // border: 1px solid red;
            }
        }

        .subTitle {

            margin-top: 8px;
            width: 96%;

            .itemTitle {
                font-size: 14px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
            }

            .desc {
                font-size: 14px;
                font-weight: 400;
                color: rgba(102, 102, 102, 0.6);
            }
        }
    }

    .bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        margin-top: 8px;

        .left {

            .title {
                color: rgba(102, 102, 102, 1);
            }

            .text {
                color: rgba(102, 102, 102, 0.6);
            }
        }

        .right {
            color: rgba(102, 102, 102, 0.6);
        }

    }

}

.marginR {
    margin-right: 4px
}
</style>@/domains/OrderDomain