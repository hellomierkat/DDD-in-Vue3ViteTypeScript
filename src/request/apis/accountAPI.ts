import AxiosInstance from '../request'
import {userInputs, userDtos} from '../../dtos/userDtos'



// 工号登陆（测试）
export const userLoginByEmpNoAsync
    = (input: userInputs.UserLoginInput)
    : Promise<userDtos.UserLoginDto> => AxiosInstance({ShowTip: 1, SuccessMessage: "登陆成功！", ErrorMessage: "登陆失败！"})
    .post(`/app/account/login`, input);












// // 企微登陆
// export const QWLoginAsync
//     = (input: space_account.IQWLoginInput)
//     : Promise<any> => AxiosInstance.post(`/app/account/q-wLogin`, input);

// // 根据工号获取员工信息
// export const GetAccountInfoAsync
//     = (input: space_account.IGetEmployeeInfoInput)
//     : Promise<any> => AxiosInstance.get(`/app/account/account-infomation?empNo=${input.EmpNo}`);

// // 根据工号/姓名模糊搜索，得到简单用户信息列表
// export const GetListAccountInfomationBySearchAsync
//     = (input: space_account.IGetListSimpleAccountInfo)
//     : Promise<any> => AxiosInstance.get(`/app/account/account-infomation-by-search?SearchValue=${input.SeachValue}`);
