import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { space_setting } from './BaseSetting'

// const baseURL = process.env.NODE_ENV == 'development' ? '/api' : `/FaultReportingServer/api`;

import { requestHandle, baseURL } from './requestHandle'



const http = (tipConfig?: space_setting.ITipConfig) : AxiosInstance => {

    let instance = axios.create({
        baseURL: baseURL,
        timeout: 80000,
        withCredentials: true,
        data: {},
        headers: {
            'ShowTip': tipConfig && tipConfig.ShowTip ? tipConfig.ShowTip : 0,
            'SuccessMessage': tipConfig && tipConfig.SuccessMessage ? encodeURIComponent(tipConfig.SuccessMessage) : "",
            'ErrorMessage': tipConfig && tipConfig.ErrorMessage ? encodeURIComponent(tipConfig.ErrorMessage): "",
            'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'application/json'
        }
    })

    requestHandle(instance);

    return instance;
}


// const request = axios.create({
//     baseURL: baseURL,
//     timeout: 80000,
//     withCredentials: true,
//     headers: {
//         'Authorization': localStorage.getItem('Authorization')
//     }
// })


export default http;