import { space_areaEngineer } from '.'
import instance from '../request'


// 获取区域工程师配置列表
export const GetAreaEngineerBaseListAsync
    = (input: space_areaEngineer.IGetAreaEngineerBaseListInput)
    : Promise<space_areaEngineer.GetAreaEngineerBaseList> => instance.get(`/app/area-engineer-setting/area-engineer-base-list?Status=${input.Status}`);


