import instance from '../request'
import {space_fault } from '.'

export const GetAllFaultAsync
     = (input: space_fault.IGetAllFaultInput)
     : Promise<any> => instance.get(`/app/fault/fault?Status=${input.Status}`);

