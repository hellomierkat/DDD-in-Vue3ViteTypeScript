import {GetPagedOrderAsync} from '../request/apis/orderAPI'
import { OrderPagedListInput, ISimpleOrderDto } from '../dtos/orderDtos'

// 数据查询不应该属于领域对象，它应该归属于领域服务
// 鉴于前端请求数据列表或数据详情其内里结果为领域对象，所以在此块中添加查询的空间
// 好处： 1，列表元素可在同模块中进行构建(统一来源)  2，减少ts/js代码在page页面中的裸调用   3，弱化强领域观念，符合js本身的性质
export namespace Query {

    // 获取简易的申请单列表信息
    // 本方法包括：1，调用请求api数据  2，处理api返回数据，并提供业务方法   3，不返回可渲染的对象 ！！！
    export const simpleOrderListAsync = async (input: OrderPagedListInput): Promise<{TotalCount: number, Orders: Array<OrderAggregation>}> => {

        const result = await GetPagedOrderAsync(input);

        // 构建渲染对象(由原本数据对象修饰和扩展)
        // 例如：1，元素添加单位  2，元素添加方法
        let orders : OrderAggregation[] = [];
        for(let i = 0; i < result.TotalCount; i++) {
            let item = result.Items[i];

            // 不要试图在Dto中进行数据操作，Dto定义为接口，就算定义为class，其方法在API映射后也无法获取到。
            // Dto仅仅用于数据传输。 而Dto到业务的业务映射，应该在Domain中完成。
            console.log("item: ", item);

            // 所以需要处理的是  SimpleOrderDto => 转为 Order充血模型，Order充血模型携带所有的业务方法
            let order : OrderAggregation = new OrderAggregation(item.Id);
            order.InitSimpleOrder(item);

            orders.push(order);
        }

        return {TotalCount: result.TotalCount, Orders: orders};
    }
}


class Person {
    public EmpNo: string
    public EmpName: string
    public EmpPhone: string
    public Email: string
    public Department: string
    public DepartmentFull: string


    constructor(empNo: string, empName: string, empPhone: string, email: string, department: string, departmentFull: string) {
        this.EmpNo = empNo;
        this.EmpName = empName;
        this.EmpPhone = empPhone;
        this.Email = email;
        this.Department = department;
        this.DepartmentFull = departmentFull;
    }

    getSimpleInfo(): string {
        return this.EmpNo ? `${this.EmpName}(${this.EmpNo})`: `${this.EmpName}`;
    }

    isSameEmpNo(person: Person) {
        return person.EmpNo == this.EmpNo;
    }

    getEmail(): string {
        return this.Email;
    }
}

interface Follow {
    Id: string,
    followerEmpNo: string,
    followerEmpName: string,
    description: string,
    creationTime: string
}

class Evaluation {
    Id: string
    Level: number
    Description: string

    constructor(id: string, level: number, description: string) {
        this.Id = id;
        this.Level = level;
        this.Description = description;
    }

    GetEvaluation() {

        switch (this.Level) {
            case 1: return "非常满意";
            case 2: return "满意";
            case 10: return "不满意";
            default: return "";
        }
    }
}

// 订单聚合类
// 属性照理说应该定义为private属性，管控其修改，但是由于在模板中需要使用，故定义为public属性
// 业务逻辑方法 ？？？
// 还需要进一步考虑 代码量工程量与聚合类之间的冲突 ？？？
class OrderAggregation {
    Id: string                  // 工单id
    No?: string                 // 工单编号

    Uplaoder?: Person           // 上传人
    Faulter?: Person            // 上传人填写的真实报障人
    Handler?: Person            // 处理工程师

    Title?: string              // 主题
    Description?: string        // 描述
    Status?: number             // 状态
    CreationTime?: string       // 创建时间
    Files?: Array<string>       // 文件s
    Follows?: Array<Follow>     // 跟进s
    FinishTime?: string         // 完成时间
    EvaluateTime?: string       // 评价时间
    SpendTime?: number          // 完成持续时间

    ConfirmEmpName?: string
    ConfirmEmpNo?:string
    ConfirmFaultId?:string
    ConfirmFaultName?:string
    ConfirmSubFaultId?:string
    ConfirmSubFaultName?:string
    ConfirmDescription?:string
    Evaluation?: Evaluation
    FaulterIP?:string

    // 构造函数仅需传入聚合根
    constructor(id: string) {
        if(!id) throw new Error("aggreation root id is null");

        this.Id = id;
    }

    InitSimpleOrder( input: ISimpleOrderDto) {
        this.No = input.No;
        this.Description = input.Description;
        this.Status = input.Status;
        this.CreationTime = input.CreationTime;

        this.Handler = new Person("", input.EnginnerName, "", "", "", "");
    }

    GetSimpleOrder() :  ISimpleOrderDto {
        return {
            Id: this.Id,
            No: this.No ? this.No : "",
            Description: this.Description ? this.Description : "",
            Status: this.Status ? this.Status : 0,
            CreationTime: this.CreationTime ? this.CreationTime : "",
            EnginnerName: this.Handler && this.Handler.EmpName ? this.Handler.EmpName : ""
        };
    }

    // 处理状态
    handleStatus() {

    }

    // 更新处理人
    HandlerUpdate(newPerson: Person): void {
        if (this.Handler && this.Handler.isSameEmpNo(newPerson)) return;

        this.Handler = newPerson;
    }
    GetConfirmDescription(): string {
        if(this.ConfirmDescription)
            return this.ConfirmDescription;
        return "";
    }

    GetConfirmFaultInfo(): string {
        if(this.ConfirmFaultId)
            return `${this.ConfirmFaultName}-${this.ConfirmSubFaultName}`;
        return "";
    }

    GetConfirmFaulterInfo(): string {
        if(this.ConfirmEmpNo)
            return `${this.ConfirmEmpName}-${this.ConfirmEmpNo}`;
        return "";
    }

    GetEvaluationLevel(): string {
        return this.Evaluation ? this.Evaluation?.GetEvaluation() : "";
    }

    GetEvaluationDescription(): string {
        return this.Evaluation ? this.Evaluation?.Description : "";
    }

    GetEvaluationTime(): string {
        return this.EvaluateTime || "";
    }
}




export { Person, Evaluation, OrderAggregation }