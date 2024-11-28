<template>
    <div class="orderCreateContextContainer">

        <!--  <van-form @submit="onSubmit">
            <div class="title">请不要多次提交相同的工单</div>
            <van-cell-group inset>
                <van-field required v-model="form.params.Title" label="主题" placeholder="请输入主题" />
                <van-field required v-model="form.params.EmpName" label="报障人" placeholder="请输入报告故障实际人员姓名"
                    @focus="Nav2SelectFaulter" />
                <FaultPersonSelect v-show="form.flagShowSelectFaulter" @save="form.FaulterChange"
                    @cancel="form.flagShowSelectFaulter = false" />
                <van-field v-model="form.params.EmpName" label="报障人" placeholder="请输入报告故障实际人员姓名" disabled />
                <van-field v-model="form.params.EmpNo" label="报障人工号" placeholder="" disabled />
                <van-field v-model="form.params.Department" label="所属部门" placeholder="" disabled />
                <van-field required v-model="form.params.EmpPhone" label="联系电话" placeholder="请输入故障联系人电话" />
                <van-field v-model="form.params.Ip" label="IP地址" placeholder="用于提供远程服务" />
                <van-field required v-model="form.params.Desc" rows="3" autosize label="描述" type="textarea" maxlength="200"
                    placeholder="请输入故障描述" show-word-limit />
                <p class="inputTitle">文件</p>
                <van-uploader style="margin-left: 6%;" v-model="form.params.FileList" multiple :max-count="3"
                    :max-size="1000 * 1024" /> 
                <van-field name="uploader" label="文件上传">
                    <template #input>
                        <van-uploader v-model="form.params.FileList" multiple :max-count="2" :max-size="10 * 1000 * 1024"
                            @oversize="form.Oversize" :after-read="form.AfterRead" @delete="form.Delete" />
                    </template>
                </van-field>
             </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    确认创建
                </van-button>
            </div> 
        </van-form>-->

        <!-- ------------------------ 以上 按最新ui版本弃用 20230327 ---------------------- -->

        <div class="line">
            <div class="left"> <span class="required">*</span> <span class="text">报障人：</span></div>
            <div class="right"><span class="context">{{ form.params.EmpName }}</span></div>
        </div>

        <div class="line">
            <div class="left"> <span class="required">*</span> <span class="text">联系电话：</span></div>
            <div class="right"><input type="text" v-model="form.params.EmpPhone"></div>
        </div>

        <!-- <div class="line">
            <div class="left"><span class="text">IP地址：</span></div>
            <div class="right"><input type="text" placeholder="用于提供远程服务" v-model="form.params.Ip"></div>
        </div> -->

        <div class="line">
            <div class="left leftTop"><span class="text">故障描述：</span></div>
            <div class="right">
                <textarea type="textarea" maxlength="200" placeholder="请输入故障描述" v-model="form.params.Desc"></textarea>
                <!-- <span class="leftWords">100/200</span> -->
            </div>
        </div>

        <div class="line">
            <div class="left leftTopUploader"><span class="text">图片上传：</span></div>
            <div class="right">
                <van-uploader v-model="form.params.FileList" multiple :max-count="2" :max-size="10 * 1000 * 1024"
                    @oversize="form.Oversize" :after-read="form.AfterRead" @delete="form.Delete" />

            </div>
        </div>

        <div class="buttonContainer">
            <CustomerButton text="故障提交" @debounce="onSubmit" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CheckEmpty, CheckUsefulPhone, CheckValidIP } from '@/assets/helper/utils';
import { storage } from '@/assets/helper/storage'
import { SearchUser } from '@/domains/UserDomain';
import { showConfirmDialog, showToast, showLoadingToast } from 'vant';
import { CreateOrderAsync } from '@/request/apis/orderAPI'
import { UploadFileAsync, DeleteFileAsync } from '@/request/apis/fileAPI'

const router = useRouter();


// 原始工单提交信息 + 示例
let originForm = reactive({
    Title: "",
    EmpNo: "",
    EmpName: "",
    Department: "",
    EmpPhone: "",
    Ip: "",
    Desc: "",
    fileGroupId: "",
    fileIds: new Array<string>(),
    FileList: [
        { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        //{ url: 'https://cloud-image', isImage: true },
    ],

    update(empNo: string, empName: string, departmentFullName: string, empPhone: string) {
        this.EmpNo = empNo;
        this.EmpName = empName;
        this.Department = departmentFullName;
        this.EmpPhone = empPhone;

        this.FileList = [];
    },

    afterFileUpload(fileGroupId: string, fileIds: Array<string>) {
        this.fileGroupId = fileGroupId;
        this.fileIds = this.fileIds.concat(fileIds);
    },

    afterFileDelete(fileId: string) {
        let index = this.fileIds.findIndex(el => el == fileId);
        if (index != -1)
            this.fileIds.splice(index, 1)
    },

    async getInfo() {

        var currentUser = JSON.parse(storage.getCurrentUser() as string);


        // console.log("currentUser ==", currentUser);

        // 初始化报障工单信息
        originForm.update(currentUser.empNo, currentUser.empName, currentUser.departmentName, currentUser.mobile);

        return this;
    }
});


onMounted(async () => {

    await originForm.getInfo();
})

const form = reactive({
    params: originForm,
    flagShowSelectFaulter: false,
    Oversize(file: any): void {
        console.log("over size function")
        showToast("文件大小不能超过 10M");
    },
    async AfterRead(file: any) {
        console.log("after read:", file);

        // 初始化文件上传对象
        let formData = new FormData();
        // 添加文件
        formData.append(file.name, file.file);
        // 添加自定义参数
        formData.set("fileGroupId", form.params.fileGroupId);
        formData.set("fileIds", form.params.fileIds.toString());


        await UploadFileAsync(formData)
            .then((res: any) => {
                console.log("upload file res:", res);
                if (res == -1) return;
                file.fileId = res.fileIds[0];
                form.params.afterFileUpload(res.fileGroupId, res.fileIds);

                console.log("GG", form.params)
            })
            .catch((err: any) => {
                console.log("upload file err:", err);
                file.status = 'failed';
                file.message = '上传失败';
            })
    },
    async Delete(file: any) {


        // console.log("after delete:", file);
        // console.log("after delete:", file.fileId);
        // console.log("aaaaaaaaaa:", { delFileIds: [file.fileId] });

        await DeleteFileAsync({ delFileIds: [file.fileId] })
            .then((res: any) => {
                if (res == -1) return;
                //console.log("删除文件 res:", res);

                form.params.afterFileDelete(res[0])

                // console.log("TT", form.params)

            })
            .catch((err: any) => {
                console.log("删除文件 err:", err);
            })
    },
    updateFaulter(newFaulter: SearchUser): void {
        if (this.params.EmpNo == newFaulter.EmpNo) return;

        this.params.EmpNo = newFaulter.EmpNo;
        this.params.EmpName = newFaulter.EmpName;
        this.params.Department = newFaulter.Department;
    },
    validation(): string {
        let message = '';
        // if (CheckLengthGt(this.params.Title, 32))
        //     message = '主题超出长度32，细节请在描述中表达';

        // else if (CheckEmpty(this.params.Title))
        //     message = '主题内容不能为空';

        if (CheckEmpty(this.params.EmpName))
            message = '实际报障人不能为空';

        else if (CheckEmpty(this.params.EmpPhone))
            message = '实际报障人号码不能为空';

        else if (!CheckUsefulPhone(this.params.EmpPhone))
            message = '实际报障人号码格式有误';

        else if (!CheckEmpty(this.params.Ip) && !CheckValidIP(this.params.Ip))
            message = 'ip地址格式错误'

        else if (CheckEmpty(this.params.Desc.trim()))
            message = '故障描述不能为空'

        return message;
    },
    FaulterChange(faulter: SearchUser) {
        console.log("selected faulter: ", faulter);

        form.flagShowSelectFaulter = false;
        form.updateFaulter(faulter);
    },

})

const onSubmit = () => {
    // console.log('submit', form.params);
    // return;

    let { Title, EmpNo, EmpPhone, Ip, Desc, FileList, fileGroupId, fileIds } = form.params;

    // 验证参数
    let msg = form.validation();
    if (!CheckEmpty(msg)) {
        return showToast({
            message: msg,
            wordBreak: 'break-word',
        });
    }

    showConfirmDialog({
        title: '故障单创建提示',
        message: '创建故障单将无法撤回，确认创建?'
    })
        .then(async () => {
            // on confirm
            showLoadingToast({
                message: '故障单创建中...',
                forbidClick: true,
                duration: 0
            });

            await CreateOrderAsync(
                {
                    Title: Title,
                    Description: Desc,
                    FaulterNo: EmpNo,
                    FaulterMobile: EmpPhone,
                    FaulterIP: Ip,
                    FileGroupId: fileGroupId == "" ? null : fileGroupId,
                    FileIds: fileIds
                }
            ).then((res: any) => {
                console.log("createRes ==", res);
                if (res != null && res.id) {
                    if (res == -1) return;
                    // closeToast();
                    // nav to success page
                    router.replace({ name: 'orderSuccess' })
                }
            })
        })
        .catch(() => {
            // on cancel
        });

    return;
};


const Nav2SelectFaulter = (): void => {
    form.flagShowSelectFaulter = true;
}

</script>

<style lang="less" scoped>
.orderCreateContextContainer {

    margin-bottom: 10vh; // 用于内容过多
    padding: 0 18px;

    .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 30px;
        line-height: 30px;
        margin-top: 20px;
        // border: 1px solid red;

        .left {
            flex: 1;
            display: flex;
            // width: 86px;
            font-size: 16px;
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
            height: 136px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 4px 0px 40px 0px;
            border: none;
        }

        .leftTopUploader {
            height: 70px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            padding: 4px 0px 40px 0px;
            border: none;
        }

        .right {
            display: flex;
            // width: 100%;
            flex: 2.6;
            font-size: 14px;
            font-weight: 300;
            letter-spacing: 0px;
            line-height: 22px;
            color: rgba(0, 0, 0, 0.7);
            position: relative;
            // border: 1px solid pink;
            // overflow: hidden;

            input {
                width: 100%;
                border-radius: 2px;
                background: rgba(242, 242, 242, 1);
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                padding: 4px 0px 4px 4px;
                border: none;
            }

            textarea {
                width: 100%;
                height: 136px;
                border-radius: 2px;
                background: rgba(242, 242, 242, 1);
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                padding: 4px 0px 40px 4px;
                border: none;
            }

            input::-webkit-input-placeholder {
                font-size: 12px;
                font-weight: 300;
                letter-spacing: 0px;
                line-height: 22px;
                color: rgba(0, 0, 0, 0.25);
                text-align: left;
                vertical-align: top;
            }

            textarea::-webkit-input-placeholder {
                font-size: 12px;
                font-weight: 300;
                letter-spacing: 0px;
                line-height: 22px;
                color: rgba(0, 0, 0, 0.25);
                text-align: left;
                vertical-align: top;
            }

            // .leftWords {
            //     position: absolute;
            //     right: 4px;
            //     bottom: 2px;
            // }
        }
    }

    .buttonContainer {
        margin-top: 20px;
    }
}

:deep(.van-uploader__upload) {
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.04);
    border: 1px dotted rgba(0, 0, 0, 0.15);

}

:deep(.van-uploader__preview-image) {
    width: 100px;
    height: 100px;
}
</style>@/domains/UserDomain