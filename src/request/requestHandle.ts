import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import {space_setting} from './BaseSetting'
import { closeToast, showToast, Toast } from 'vant';

export const baseURL = process.env.NODE_ENV == 'development' ? '/api' : `/FaultReportingServer/api`;

// 提示设置对象
class tipSetting implements space_setting.ITipConfig {
    ShowTip: number = 0
    SuccessMessage: string = ""
    ErrorMessage: string = ""

    constructor(config?: InternalAxiosRequestConfig<any>) {
        this.ShowTip = config?.headers['ShowTip'];

        if(config) {
            this.SuccessMessage = decodeURIComponent(config?.headers['SuccessMessage']);
            this.ErrorMessage =  decodeURIComponent(config?.headers['ErrorMessage']);
        }
    }

    ShowMessage(httpcode: number, code?: number, otherMessage?: string) {

        let msg : string = "";

        switch (httpcode) {
            case 200: {
                if(this.ShowTip == 1)
                    msg = code == -1 ? this.ErrorMessage : this.SuccessMessage;

                else if(this.ShowTip == 2 && otherMessage != null)
                    msg = otherMessage;

                else if(this.ShowTip == 3)
                    return;

                else
                    msg = otherMessage ? otherMessage : "" ;

                break;
            }
            case 401:
                msg = "登陆已过期，请重新登录!";
                break;
            case 403: {
                msg = "您没有权限访问本页面，请登陆后重试!";

                // 过期删除本地缓存
                localStorage.removeItem('Authorization');
                localStorage.removeItem("currentUser");
                break;
            }
            case 500:
                msg = "服务器开小差了";
                break;
        }

        showToast({
            message: msg,
            wordBreak: 'break-word',
            duration: 2000
        });

    }
}

let tip : tipSetting;

export const requestHandle = (request: AxiosInstance) => {

    request.interceptors.request.use(
        config => {

            tip = new tipSetting(config);

            config.headers.Authorization = localStorage.getItem('Authorization');
            return config;
        },
        error => {
            Promise.reject(error);
        }
    )


    request.interceptors.response.use(
        response => {

            console.log("response: ", response);

            // 业务逻辑引发的错误
            if (response.data.error) {

                tip.ShowMessage(200, response.data.error.code, response.data.error.message);

                return response.data.error.code;
            }

            return response.data
        },
        error => {

            console.log("error: ", error);

            tip.ShowMessage(error.response.status);

            return Promise.reject("error");
        }
    )

}



