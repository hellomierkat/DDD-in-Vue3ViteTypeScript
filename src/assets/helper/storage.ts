import { showToast } from 'vant';

const storage = {
    getCurrentUser: () => localStorage.getItem("currentUser"),
    getCurrentUserEmpNo: () => {
        var target = JSON.parse(localStorage.getItem("currentUser") as string);

        if(target) return target.empNo;

        return showToast({
            message: "登陆已过期，请重新回到工作台进行登陆",
            wordBreak: 'break-word',
            duration: 0
        });
    },
    getCurrentUserRole: () => {
        var target = JSON.parse(localStorage.getItem("currentUser") as string);

        if(target) return target.role;

        return showToast({
            message: "登陆已过期，请重新回到工作台进行登陆",
            wordBreak: 'break-word',
            duration: 0
        });
    }
}




export {
    storage
}