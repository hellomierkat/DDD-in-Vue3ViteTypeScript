// 用户领域的传参数据定义
export namespace userInputs {

    // 用户登陆API-入参
    export class UserLoginInput {

        public EmpNo: string = "";


        constructor(empNo: string) {
            this.EmpNo = empNo;
        }
    }
}

// 用户领域的服务传输对象定义
export namespace userDtos {

    // 用户登陆API-数据传输对象
    export class UserLoginDto {
        public DepartmentId: string = "";
        public DepartmentName: string = "";
        public EmpId: string = "";
        public EmpName: string = "";
        public EmpNo: string = "";
        public Mobile: string = "";

        public JwtToken: string = "";
    }
}

