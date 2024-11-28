
// 申请单领域的传参数据定义

export class OrderPagedListInput {
    No: string = "";
    Status: Number | String = "";
    SkipCount: number = 0;
    MaxResultCount: number = 10;
    Filter: string = "";
    Sorting: string = "";

    constructor(no: string, status: number | string, skipCount: number, maxResultCount: number, filter?: string, sorting?: string) {
        this.No = no;
        this.Status = status;
        this.SkipCount = skipCount;
        this.MaxResultCount = maxResultCount;
        filter && (this.Filter = filter);
        sorting && (this.Sorting = sorting);
    }
}


// 申请单领域的服务传输对象定义

export interface ISimpleOrderDto {
    Id: string                  // 工单id
    No: string                  // 工单编号
    EnginnerName: string        // 主题
    Description: string         // 描述
    Status: number              // 状态
    CreationTime: string        // 创建时间
}

export interface IOrderPagedListDto {
    TotalCount: number;
    Items: Array<ISimpleOrderDto>;

}
