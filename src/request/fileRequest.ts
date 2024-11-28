import axios from 'axios'
// const baseURL = process.env.NODE_ENV == 'development' ? '/api' : `/FaultReportingServer/api`;

import { requestHandle, baseURL } from './requestHandle'

const request = axios.create({
    baseURL: baseURL,
    timeout: 80000,
    withCredentials: true,
    headers: {
        'Authorization': localStorage.getItem('Authorization'),
        'Content-Type': 'application/x-www-form-urlencoded'     // delete 方法需要设置本项
    }
})

requestHandle(request);

export default request;


