import axios from 'axios'
//const baseURL = process.env.NODE_ENV == 'development' ? '/api' : `/FaultReportingServer/api`;


import { requestHandle, baseURL } from './requestHandle'

const request = axios.create({
    baseURL: baseURL,
    timeout: 80000,
    withCredentials: true,
    headers: {
        'Authorization': localStorage.getItem('Authorization')
    },
    responseType: 'blob'
})

requestHandle(request);

export default request;


