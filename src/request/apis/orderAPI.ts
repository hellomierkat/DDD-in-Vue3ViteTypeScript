import AxiosInstance from '../request'
import {space_order} from '.'
import { OrderPagedListInput, IOrderPagedListDto  } from '@/dtos/orderDtos'

// 创建工单
export const CreateOrderAsync
    = (input: space_order.ICreateOrderInput)
    : Promise<any> => AxiosInstance().post(`/app/order/order`, input);


// 分页获取工单
export const GetPagedOrderAsync
    = async (input: OrderPagedListInput)
    : Promise<IOrderPagedListDto> => AxiosInstance()
    .get(`/app/order/paged-order?SkipCount=${input.SkipCount}&MaxResultCount=${input.MaxResultCount}&No=${input.No}&Status=${input.Status}`);







// 根据工单编号和状态搜索工单
export const GetSearchOrderAsync
    = (input: space_order.ISearchOrderInput)
    : Promise<any> => AxiosInstance().get(`/app/order/search-order?OrderNo=${input.OrderNo}&Status=${input.Status}`)

// 根据工单id获取工单详情
export const GetOrderDetailAsync
    = (input: space_order.IOrderDetailInput)
    : Promise<any> => AxiosInstance().get(`/app/order/order-detail/${input.OrderId}`)

// 工程师分配工单
export const DistributeOrderAsync
    = (input: space_order.IDistributeOrderInput)
    : Promise<any> => AxiosInstance().post(`/app/order/distribute-order`, input);

export const FollowOrderAsync
    = (input: space_order.IFollowOrderInput)
    : Promise<any> => AxiosInstance().post(`/app/order/follow-order`, input);

// 工程师结束工单
export const FinishOrderAsync
    = (input: space_order.IFinishOrderInput)
    : Promise<any> => AxiosInstance().post(`/app/order/finish-order`, input);

// 用户评价工单
export const EvaluateOrderAsync
    = (input: space_order.IEvaluateOrderInput)
    : Promise<any> => AxiosInstance().post(`/app/order/evaluate-order`, input);
