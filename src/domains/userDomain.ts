import { userLoginByEmpNoAsync } from '@/request/apis/accountAPI'

// 当前登陆对象较为特殊，来源仅【登陆】，所以实例化直接依赖构造函数
class CurrentUser {
    public DepartmentId: string = ""
    public DepartmentName: string = ""
    public EmpId: string = ""
    public EmpName: string = ""
    public EmpNo: string = ""
    public Mobile: string = ""

    // 调用 new CurrentUser()
    constructor(empNo: string) {
        this.EmpNo = empNo;
    }

    async Init () {

        var user = await userLoginByEmpNoAsync({EmpNo: this.EmpNo});

        if (!user) return;

        console.log("user infomation: ", user);

        this.EmpId = user.EmpId;
        this.EmpNo = user.EmpNo;
        this.EmpName = user.EmpName;
        this.DepartmentId = user.DepartmentId;
        this.DepartmentName = user.DepartmentName;
        this.Mobile = user.Mobile;

        // set user's token
        localStorage.setItem('Authorization', `Bearer ${user.JwtToken}`);
        localStorage.setItem("currentUser", JSON.stringify(user));

    }




    // constructor(empID: string, empNo: string, empName: string, departID: string, departName: string, mobile: string ) {
    //     this.EmpId = empID;
    //     this.EmpNo = empNo;
    //     this.EmpName = empName;
    //     this.DepartmentId = departID;
    //     this.DepartmentName = departName;
    //     this.Mobile = mobile;
    // }

}

class SearchUser {
    EmpNo: string
    EmpName: string
    Department: string

    constructor(empNo: string, empName: string, department: string) {
        this.EmpNo = empNo;
        this.EmpName = empName;
        this.Department = department;
    }

    getSimpleUser(): string {
        return `${this.EmpName}(${this.EmpNo}) - ${this.Department}`
    }
}

export {
    SearchUser,
    CurrentUser
}