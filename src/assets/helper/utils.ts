const CheckEmpty = (val: string | undefined | null) => {
    return val == undefined || val == null || val.length == 0;
}

// 检测长度是否大于某个长度值
const CheckLengthGt = (val: any, len: Number) => {
    return val.toString().length > len;
}

const CheckUsefulPhone = (val: string) => {
    // 号码规则可能随时间规则会变化，所以当前只验证开头和总长度
    // var reg_tel = /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])d{8}$/;  

    var reg_tel = /^1(3|4|5|6|7|8|9)\d{9}$/;
    return reg_tel.test(val);
}

const CheckValidIP = (ip: string) => {
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(ip);
}

// 获取url地址上的参数
const GetUrlItems = (url: string) : any => {
    url = decodeURIComponent(url); // 将特殊字符转为正常字符，例如 %20 -> ' '
    let arr = url.split('?');
    let res = arr[1].split('&');
    let items : any = {};
    
    for (let i = 0; i < res.length; i++) {

        let a = res[i].split('=');
        items[a[0]] = a[1];
    }

    return items
}



export {
    CheckEmpty,
    CheckLengthGt,
    CheckUsefulPhone,
    CheckValidIP,
    GetUrlItems
}