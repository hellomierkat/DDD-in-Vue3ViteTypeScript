import { AxiosRequestConfig } from 'axios';

export namespace space_setting {


    // axios 请求设置
    export interface ITipConfig {
        ShowTip: number;        // 是否使用全局提示语(0:不使用 1:使用 3: 任何情况都不提示) [注：使用number类型为A后续扩展B该值放在header中是转为字符型]
        SuccessMessage?: string; // 全局拦截 & 请求成功
        ErrorMessage?: string;   // 全局拦截 & 请求失败
    }

}

