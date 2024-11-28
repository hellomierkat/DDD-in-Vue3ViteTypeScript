<template>
    <div class="allContainer" v-if="orderInfo.order.OrderNo">
        <van-collapse v-model="activeNames">

            <!-- 故障详情 -->
            <van-collapse-item class="positionContainer" title="故障详情" size="large" name="0">

                <TextLine title="故障编号：" :context="orderInfo.order.OrderNo.toString()" />

                <TextLine title="报障人：" :context="orderInfo.order.Faulter.getSimpleInfo()" />

                <!-- 工程师角色下显示 -->
                <TextLine v-if="currentUser.role == 'engineer'" title="报障人邮箱："
                    :context="orderInfo.order.Faulter.getEmail()" />

                <TextLine title="报障人电话：" :context="orderInfo.order.Faulter.EmpPhone" @click="CallPhone(orderInfo.order.Faulter.EmpPhone)" />

                <!-- 工程师角色下显示 -->
                <TextLine v-if="currentUser.role == 'engineer'" title="报障人部门："
                    :context="orderInfo.order.Faulter.DepartmentFull" />

                <!-- 工程师角色+已解决下显示可编辑的受理工程师；已完结状态下显示不可编辑的受理工程师 -->
                <TextLine title="受理工程师：" v-if="currentUser.role == 'engineer'"
                    :edit="orderInfo.order.Status == 1 && (!orderInfo.order.Handler.EmpNo || orderInfo.order.Handler.EmpNo == currentUserEmpNo)"
                    @EditContext="engineers.Show()" :context="orderInfo.order.Handler.getSimpleInfo()" />

                <van-popup v-model:show="engineers.flagShow" round position="bottom">
                    <van-picker :columns="engineers.list" @cancel="engineers.Hide" @confirm="engineers.Confirm" />
                </van-popup>

                <!-- 申请单填写有ip的情况下显示 -->
                <TextLine title="报障人IP：" v-if="orderInfo.order.IP != ''" :context="orderInfo.order.IP" />

                <TextLine title="故障描述：" :context="orderInfo.order.Desc" />

                <TextLine title="创建时间：" :context="orderInfo.order.CreateTime" />

                <Suspense v-if="orderInfo.order.FileList != null && orderInfo.order.FileList.length > 0">
                    <ImgLine :ids="orderInfo.order.FileList" />
                </Suspense>

                <div class="statusContainer">
                    <img :src="statusImg" alt="">
                </div>
            </van-collapse-item>

            <!-- 当前受理工程师 用户角色+处理中状态显示-->
            <van-collapse-item v-if="currentUser.role == 'user'" title="当前受理工程师" size="large" name="1">

                <div v-if="orderInfo.order.Handler.EmpNo">
                    <TextLine title="姓名：" :context="orderInfo.order.Handler.EmpName" />

                    <TextLine v-if="orderInfo.order.Handler.EmpPhone" title="联系电话："
                        :context="orderInfo.order.Handler.EmpPhone" @click="CallPhone(orderInfo.order.Handler.EmpPhone)" />
                </div>

                <div class="noEvaluation" v-else>
                    当前故障单待分配
                </div>


            </van-collapse-item>

            <!-- 处理日志 -->
            <van-collapse-item v-if="orderInfo.order.FollowList.length > 0" title="处理日志" size="large" name="2">
                <van-steps direction="vertical" :active="0">
                    <van-step v-for="item in orderInfo.order.FollowList">
                        <p class="stepAction">{{ item.description }}</p>
                        <p class="stepTime">{{ item.followerEmpName }} &nbsp;&nbsp; {{ item.creationTime }} </p>
                    </van-step>
                </van-steps>
            </van-collapse-item>

            <!-- 故障跟踪 (工程师角色 && 处理工程师存在)-->
            <van-collapse-item title="故障跟踪" v-if="currentUser.role == 'engineer' && orderInfo.order.Handler.EmpNo"
                size="large" name="3">
                <div class="formContainer"
                    v-if="orderInfo.order.Status == 1 && orderInfo.order.Handler.EmpNo == currentUserEmpNo">
                    <div class="inputsContainer">

                        <!-- 描述 -->
                        <textarea class="noTitleTextArea" v-model="orderInfo.handlerForm.params.Desc"
                            placeholder="请输入描述"></textarea>

                        <!-- 故障类型 -->
                        <FaultTypePicker @confirm="orderInfo.handlerForm.SelectFaultType" />

                        <!-- 单选 跟进/已解决 -->
                        <van-field class="vanradiogroupBoder">
                            <template #input>
                                <van-radio-group v-model="selectRe.select" direction="horizontal">
                                    <van-radio class="vanRadioLeft" v-for="item in selectRe.options" :name="item.value">{{
                                        item.label }}</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>
                    </div>

                    <CustomerButton text="提交" style="margin-top: 16px;" @debounce="handlerForm.Submit" />


                </div>

                <div v-if="orderInfo.order.Status == 2 || orderInfo.order.Status == 4">
                    <!-- <TextLine title="备注" :context="orderInfo.order.GetConfirmDescription()" /> -->
                    <TextLine title="故障分类：" :context="orderInfo.order.GetConfirmFaultInfo()" />
                </div>

                <div class="noEvaluation"
                    v-if="orderInfo.order.Status == 1 && orderInfo.order.Handler.EmpNo != currentUserEmpNo">
                    暂无确认信息
                </div>

            </van-collapse-item>

            <!-- 用户评价 -->
            <van-collapse-item title="用户评价" size="large" name="4" v-if="orderInfo.order.Status != 1">
                <div class="formContainer"
                    v-if="orderInfo.order.Status == 2 && orderInfo.order.Uplaoder.EmpNo == currentUserEmpNo">
                    <div class="inputsContainer">

                        <!-- 评价的满意度 -->
                        <van-field class="vanradiogroupBoder">
                            <template #input>
                                <van-radio-group v-model="orderInfo.evaluateForm.params.selected" direction="horizontal">
                                    <van-radio class="vanRadioLeft" v-for="item in orderInfo.evaluateForm.levels"
                                        :key="item.name" :name="item.name">{{
                                            item.label }}</van-radio>
                                </van-radio-group>
                            </template>
                        </van-field>

                        <!-- 描述 -->
                        <div class="line">
                            <div class="left leftTop"><span class="text">评价描述</span></div>
                            <div class="right">
                                <textarea type="textarea" maxlength="200" placeholder="感谢您的评价"
                                    v-model="evaluateForm.params.desc"></textarea>
                            </div>
                        </div>

                    </div>

                    <CustomerButton style="margin-top: 14px;" text="确认评价" @debounce="evaluateForm.Submit" />
                </div>

                <div class="evaluationContainer" v-if="orderInfo.order.Status == 4">
                    <TextLine title="满意度：" :context="orderInfo.order.GetEvaluationLevel()" />
                    <!-- <TextLine title="评价留言" :showLine="3" :context="orderInfo.order.GetEvaluationDescription()" /> -->
                    <div class="text" v-if="orderInfo.order.GetEvaluationDescription()">{{
                        orderInfo.order.GetEvaluationDescription() }}</div>
                    <div class="time">{{ orderInfo.order.GetEvaluationTime() }}</div>
                </div>

                <div class="noEvaluation"
                    v-if="orderInfo.order.Status == 2 && orderInfo.order.Uplaoder.EmpNo != currentUserEmpNo">
                    暂无评价
                </div>

            </van-collapse-item>
        </van-collapse>

    </div>
</template>
   
<script lang="ts" setup>
import { Evaluation, Order, Person } from '@/domains/orderDomain';
import { GetAreaEngineerBaseListAsync } from "@/request/apis/areaEngineerAPI"
import { GetOrderDetailAsync, DistributeOrderAsync, FinishOrderAsync, EvaluateOrderAsync, FollowOrderAsync } from "@/request/apis/orderAPI"
import { storage } from '@/assets/helper/storage'
import { showConfirmDialog, showToast, showLoadingToast, closeToast, UploaderFileListItem } from 'vant';


const route = useRoute();
const router = useRouter();

// use 2 choose img status
const statusImg = ref("");
let currentUser = JSON.parse(localStorage.getItem("currentUser") as string);

const CallPhone = (phone: string) => {
    window.location.href = `tel:${phone}`
}

onMounted(async () => {

    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
        duration: 0
    });

    await orderInfo.getOrderDetails();

    await getEngineers();
})


const currentUserEmpNo = storage.getCurrentUserEmpNo();

console.log('route query:', route.query);

const getEngineers = async () => await GetAreaEngineerBaseListAsync({ Status: 1 })
    .then((res: any) => {
        if (res == -1) return;
        engineers.list = [];

        for (let i = 0; i < res.items.length; i++) {
            var obj = { text: `${res.items[i].empName} ${res.items[i].empNo}`, value: res.items[i].empNo }
            engineers.list.push(obj);
        }
    });

let p = new Person("", "", "", "", "", "");

let order: Order = new Order(
    'id123',
    '121354234523',
    p,
    p,
    p,
    "title",
    "description",
    0,
    '2023-02-22 15:14',
    [
        //'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        //'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg'
    ],
    [],
    ""
);

const selectRe = reactive({
    select: '1',
    options: [
        { label: "跟进", value: '1' },
        { label: "已解决", value: '2' }
    ],
})

const handlerForm = reactive({
    params: {
        Desc: "",
        ConfirmFaultId: null,
        ConfirmSubFaultId: null,
        ConfirmEmpNo: "",
    },
    flagShow: false,
    SelectFaultType(type: any) {
        // console.log("type:", type);
        handlerForm.params.ConfirmFaultId = type.ConfirmFaultId;
        handlerForm.params.ConfirmSubFaultId = type.ConfirmSubFaultId;
    },
    Show(): void {
        handlerForm.flagShow = true;
    },
    Hide(): void {
        handlerForm.flagShow = false;
    },
    async Submit() {

        // 跟进和已解决都需要填写 [202303281430]
        if (handlerForm.params.Desc.trim() == '') {
            return showToast({
                message: "填写/解决操作中，描述为必填项",
                wordBreak: 'break-word',
            });
        }

        // 跟进
        if (selectRe.select == '1') {

            await FollowOrderAsync(
                {
                    Id: route.query.id as string,
                    Description: handlerForm.params.Desc.trim()
                })
                .then((res: any) => {
                    if (res == -1) return;
                    console.log("follow one:", res);
                    handlerForm.params.Desc = "";
                    orderInfo.order.FollowList.unshift(res);
                    console.log("new list:", orderInfo.order.FollowList);
                })
                .catch((err: any) => {
                    console.log("follow err", err)
                })
        }
        // 已解决
        else if (selectRe.select == '2') {

            // 校验故障类型填写
            if (!handlerForm.params.ConfirmFaultId || !handlerForm.params.ConfirmSubFaultId)
                return showToast({
                    message: "解决操作中，故障类型为必填项",
                    wordBreak: 'break-word',
                });

            await FinishOrderAsync(
                {
                    Id: route.query.id as string,
                    ConfirmFaultId: handlerForm.params.ConfirmFaultId ? handlerForm.params.ConfirmFaultId : undefined,
                    ConfirmSubFaultId: handlerForm.params.ConfirmSubFaultId ? handlerForm.params.ConfirmSubFaultId : undefined,
                    ConfirmEmpNo: handlerForm.params.ConfirmEmpNo == "" ? orderInfo.order.Faulter.EmpNo : handlerForm.params.ConfirmEmpNo,
                    Desc: handlerForm.params.Desc.trim()
                })
                .then((res: any) => {
                    if (res == -1) return;
                    orderInfo.getOrderDetails();
                })
                .catch((err: any) => {
                    showToast({
                        message: err.message,
                        wordBreak: 'break-word',
                    });
                })
        }
    }
})


const evaluateForm = {
    params: {
        selected: '2',
        desc: ""
    },
    levels: [
        { name: '1', label: "非常满意" },
        { name: '2', label: "满意" },
        { name: '10', label: "不满意" }
    ],
    async Submit() {

        if (evaluateForm.params.selected == '10' && evaluateForm.params.desc.trim().length <= 0)
            return showToast({
                message: "为提高服务质量，请填写不满意的原因",
                wordBreak: 'break-word',
            });


        await EvaluateOrderAsync(
            {
                Id: route.query.id as string,
                Level: Number(evaluateForm.params.selected),
                Description: evaluateForm.params.desc
            })
            .then((res: any) => {
                console.log("评价res:", res);
                if (res == -1) return;
                orderInfo.getOrderDetails();
            })
            .catch((err: any) => {
                console.log("评价err:", err);
                showToast({
                    message: err.message,
                    wordBreak: 'break-word',
                });
            })
    }
}


const orderInfo = reactive({
    order: order,
    async getOrderDetails() {
        await GetOrderDetailAsync({ OrderId: route.query.id as string })
            .then(async (res: any) => {
                console.log("order details === ", res);

                // statusImg.value = 
                if (res.status == 1)
                    statusImg.value = new URL("@/assets/imgs/detail-handling.png", import.meta.url).href;
                else if (res.status == 2 && currentUser.role == 'user')
                    statusImg.value = new URL("@/assets/imgs/detail-evaluated.png", import.meta.url).href;
                else if (res.status == 2 && currentUser.role == 'engineer')
                    statusImg.value = new URL("@/assets/imgs/detail-finished.png", import.meta.url).href;
                else if (res.status == 4)
                    statusImg.value = new URL("@/assets/imgs/detail-solved.png", import.meta.url).href;

                let uploader = new Person(res.uploaderNo, res.uploaderName, "", res.uploaderEmail, res.uploaderDepartmentName, res.faulterDepartmentFullName);
                let faulter = new Person(res.faulterNo, res.faulterName, res.faulterMobile, res.uploaderEmail, res.faulterDepartmentName, res.faulterDepartmentFullName);
                let handler = new Person(res.engineerNo, res.engineerName, res.engineerMobile, "", "", "");
                let evaluation = res.evaluation ? new Evaluation(res.evaluation.id, res.evaluation.level, res.evaluation.description) : undefined

                // 解决及完结状态下，将工程师填写的解决内容填充至跟进信息中
                if (res.status == 2 || res.status == 4) {
                    res.follows.unshift(
                        {
                            id: "",
                            creationTime: res.finishTime,
                            description: res.confirmDescription,
                            followerEmpName: res.engineerName,
                            followerEmpNo: res.engineerNo
                        })
                }

                let order: Order = new Order(
                    res.id,
                    res.no,
                    uploader,
                    faulter,
                    handler,
                    res.title,
                    res.description,
                    res.status,
                    res.creationTime,
                    res.files,
                    res.follows,
                    res.faulterIP,
                    res.confirmEmpName,
                    res.confirmEmpNo,
                    res.confirmFaultId,
                    res.confirmFaultName,
                    res.confirmSubFaultId,
                    res.confirmSubFaultName,
                    res.confirmDescription,
                    evaluation,
                    res.evaluationTime
                );

                this.order = order;

                // closeToast();
            })
            .catch((err: any) => {
                showToast({
                    message: "获取故障单详情失败",
                    wordBreak: 'break-word',
                });
            })

    },
    handlerForm: handlerForm,
    evaluateForm: evaluateForm

})

const img = ref("");


const activeNames = ref(['0', '1', '2', '3', '4']);


const engineers = reactive({
    flagShow: false,
    selectedId: '',
    list:
        [
            { text: '小宁 123547', value: '123547' }
        ],
    Show() {
        engineers.flagShow = true;
    },
    Hide() {
        engineers.flagShow = false;
    },
    async Confirm(options: any) {
        console.log('options', options);

        // 获取选择的工号值，并请求api及修改本页的内容
        console.log('Confirm', options.selectedOptions[0].value);


        showLoadingToast({
            message: '分配中...',
            forbidClick: true,
            duration: 0
        });

        await DistributeOrderAsync(
            {
                Id: route.query.id as string,
                EmpNo: options.selectedOptions[0].value,
                Desc: ""
            })
            .then(async (res: any) => {
                if (res == -1) return;
                let newHandle = new Person(res.empNo, res.empName, "", "", "", "");
                orderInfo.order.HandlerUpdate(newHandle);
                engineers.Hide();

                await orderInfo.getOrderDetails();
            })
            .catch((err: any) => {
                showToast({
                    message: err.message,
                    wordBreak: 'break-word',
                });
            })
    }

})



</script>
   
<style lang="less" scoped>
.allContainer {
    background-color: rgba(235, 236, 237, 1);
    min-height: 100vh;
    // padding-bottom: 16px;

    .positionContainer {

        position: relative;

        .statusContainer {
            width: 92px;
            height: 92px;

            position: absolute;
            top: 53px;
            right: 14px;

            img {
                width: 100%;
            }
        }
    }


    .stepAction {
        margin: 0;
        font-size: 14px;
        font-weight: 400;
    }

    .stepTime {
        margin: 3px 0 0 0;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0px;
    }

    .formContainer {
        // width: 100%;
        // display: flex;
        // justify-content: space-around;
        // align-items: center;
        // flex-direction: column;

        .inputsContainer {
            // display: flex;
            // justify-content: center;
            // align-items: center;
            // border: 1px solid red;

            .noTitleTextArea {
                padding-left: 8px;
                width: 98%;
                height: 86px;
                border-radius: 2px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                color: rgba(0, 0, 0, 0.7);
            }

            .line {
                display: flex;
                justify-content: space-between;
                align-items: center;
                min-height: 30px;
                line-height: 30px;
                margin-top: 20px;
                // border: 1px solid red;

                .left {
                    display: flex;
                    width: 80px;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 16px;
                    color: rgba(102, 102, 102, 1);

                    .required {
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 16px;
                        color: rgba(212, 48, 48, 1);
                    }
                }

                .leftTop {
                    height: 20px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    padding: 4px 0px 40px 0px;
                    border: none;
                }

                .leftTopUploader {
                    height: 46px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                    padding: 4px 0px 40px 0px;
                    border: none;
                }

                .right {
                    display: flex;
                    width: 100%;
                    flex: 4;
                    font-size: 14px;
                    font-weight: 300;
                    letter-spacing: 0px;
                    line-height: 22px;
                    color: rgba(0, 0, 0, 0.7);
                    position: relative;

                    input {
                        width: 100%;
                        border-radius: 4px;
                        background: rgba(242, 242, 242, 1);
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;
                        padding: 4px 0px 4px 4px;
                        border: none;
                    }

                    textarea {
                        width: 100%;
                        height: 63px;
                        opacity: 1;
                        border-radius: 4px;
                        border: 1px solid rgba(0, 0, 0, 0.1);
                    }


                }
            }
        }

        .btnContainer {
            margin: 2vh 0 0 0;
        }
    }

    .evaluationContainer {

        .text {
            font-size: 12px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.7);
        }

        .time {
            margin-top: 8px;
            font-size: 10px;
            font-weight: 400;
            letter-spacing: 0px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.3);
        }
    }

    .noEvaluation {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 1vh;
    }

    .followContainer {

        p {
            color: #666;
            margin: 6px 0;
        }

        table {
            width: 100%;
            margin: auto;
            text-align: center;
            white-space: normal;
            word-wrap: break-word;
            word-break: break-all;
        }
    }
}

.vanradiogroupBoder {
    margin-top: 8px;
    padding-left: 0;

    .van-radio {
        margin-right: 34px;
    }
}

.vanRadioLeft {
    // margin-left: 10vw;
}

:deep(.van-collapse-item) {
    padding: 0;
    padding-top: 16px;
}

:deep(.van-cell__title) {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0px;
    color: rgba(56, 56, 56, 1);
}

// 去除手风琴标题下的一行细线
:deep(.van-cell::after) {
    border: none;
}

:deep(.van-cell) {
    // padding-top: 0;
}

:deep(.van-step__title) {
    color: rgba(0, 0, 0, 0.5);
}

:deep(.van-step__title--active) {
    color: rgba(2, 86, 255, 1);
}

// 消除处理日志记录中间的border
:deep(.van-step--vertical:not(:last-child):after) {
    border: none;
}

:deep(.van-collapse-item__title--expanded) {
    padding-bottom: 0;
}

input::-webkit-input-placeholder {
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0px;
    line-height: 22px;

    text-align: left;
    vertical-align: top;
}

textarea::-webkit-input-placeholder {
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0px;
    line-height: 22px;
    text-align: left;
    vertical-align: top;
}
</style>@/domains/OrderDomain