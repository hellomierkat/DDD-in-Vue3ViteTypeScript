// 工单列表搜索栏
class Search {
    Value: string | ''
    Submit: Boolean = false

    // 获取搜索值
    getSearchValue() : string | null {
        console.log("search value is: ", this.Value);
        return this.Value ? this.Value : null;
    }

    // 监听用户提交行为
    submitSearchValue(): void {
        this.Submit = true;
        setTimeout(() => {
            this.Submit = false;
        }, 200);
    }

    constructor(value: string) {
        this.Value = value;
    }
}


export default Search;