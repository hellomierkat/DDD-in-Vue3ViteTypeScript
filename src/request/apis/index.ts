export namespace space_areaEngineer {
    
    export interface IGetAreaEngineerBaseListInput {
        Status: Number | null 
    }
    
    export interface GetAreaEngineerBaseList {
        EmpNo: String,
        EmpName: String
    }
}

export namespace space_account {
    export interface IQWLoginInput {
        userid: string,
        accesskey: string,
        timestamp: string,
        nonce: string,
        signature: string
    }

    export interface IGetEmployeeInfoInput {
        EmpNo: string
    }

    export interface IGetListSimpleAccountInfo {
        SeachValue: string
    }

    export interface ISimpleEemployeeDto {
        EmpNo: string,
        EmpName: string
    }
}

export namespace space_order {
    // input 创建工单 
    export interface ICreateOrderInput {
        Title: string,
        Description: string,
        FaulterNo: string,
        FaulterMobile: string,
        FaulterIP: string,
        FileGroupId?: string| null,
        FileIds: Array<string>
    }

    // output 创建工单 && 工单详情
    export interface IOrderDto {
        No: Number,
        Title: string,
        Description: string,
        UploaderNo: string,
        uploaderName: string,
        UploaderDepartmentId: string,
        UploaderDepartmentName: string,
        FaulterNo: string,
        FaulterName: string,
        FaulterMobile: string,
        FaulterDepartmentId: string,
        FaulterDepartmentName: string,
        FaulterIP?: string | null,
        EngineerNo?: string | null,
        EngineerName?: string | null,
        EngineerMobile?: string | null,
        CorfirmEmpNo?: string | null,
        CorfirmEmpName?: string | null,
        ConfirmDepartmentId?: string | null,
        ConfirmDepartmentName?: string | null,
        CorfirmFaultId?: string | null,
        CorfirmFaultName?: string | null,
        CorfirmSubFaultId?: string | null,
        CorfirmSubFaultName?: string | null,
        OrderHandleType: number,
        Status: number,
        FinishTime?: string | null,
        EvaluationTime?: string | null,
        HandleTime: number,
        Distributions: Array<IDistributionDto>,
        Evaluation?: IEvaluation,
        CreationTime: string
    }

    // output 工单分配记录
    export interface IDistributionDto {
        Id: string,
        OrderAggregationId: string,
        FromEmpNo: string,
        FromEmpName: string,
        ToEmpNo: string,
        ToEmpName: string,
        Description: string,
        HandleOnTime: number,
        CreationTime: string
    }

    // output 工单评价
    export interface IEvaluation {
        Id: string,
        OrderAggregationId: string,
        Level: number,
        Description: string
    }

    export interface IGetPageOrderInput {
        No: string,
        Status: Number | string,
        Filter: string,
        Sorting: string,
        SkipCount: number | 0,
        MaxResultCount: number | 10
    }

    export interface ISearchOrderInput {
        OrderNo: string,
        Status: string
    }

    export interface ISimpleOrderOutput {
        Id: string,
        No: string,
        Title: string,
        Description: string,
        creationTime: string,
        status: number
    }

    export interface IOrderDetailInput {
        OrderId: string
    }

    export interface IDistributeOrderInput {
        Id: string,
        EmpNo: string,
        Desc: string
    }

    export interface IFollowOrderInput {
        Id: string,
        Description: string
    }

    export interface IFinishOrderInput {
        Id: string,
        ConfirmEmpNo?: string,
        ConfirmFaultId?: string,
        ConfirmSubFaultId?: string,
        Desc: string
    }

    export interface IEvaluateOrderInput {
        Id: string,
        Level: number,
        Description: string
    }
    
}


export namespace space_fault {
    export interface IGetAllFaultInput {
        Status: number | null
    }
}


export namespace space_file {
    export interface IDeleteFileInput {
        delFileIds: Array<string>
    }

    export interface IFileDownLoadInput {
        id: string
    }
}