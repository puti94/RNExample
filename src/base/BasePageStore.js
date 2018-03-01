/**
 * User: puti.
 * Time: 2018/1/27 下午9:53.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */

import {observable, action} from 'mobx'

/**
 * 抽出一个页面store共有的状态类。
 */
export class BasePageStore {
    //默认页面的数据变量
    @observable
    data: any;
    //此观察变量控制Page页面是否显示加载视图
    @observable
    isLoading: boolean;
    //此观察变量控制Page页面是否显示错误视图
    @observable
    isError: boolean;
    loadingMsg: string;
    errorMsg: string;

    constructor(data = {}, isLoading = false, isError = false, loadingMsg = '加载中...', errorMsg = '发生错误了') {
        this.setData(data);
        this.isLoading = isLoading;
        this.isError = isError;
        this.loadingMsg = loadingMsg;
        this.errorMsg = errorMsg;
    }

    /**
     * 加载数据的方法
     */
    loadData() {

    }

    /**
     * 改变data的值
     * @param data
     */
    @action setData(data) {
        this.data = data
    }

    /**
     * 改变isError的值
     * @param isError  是否错误
     * @param errorMsg 错误的信息
     */
    @action setError(isError: boolean = true, errorMsg: string = '发生错误了') {
        if (this.isLoading) {
            this.isLoading = false;
        }
        this.isError = isError;
        this.errorMsg = errorMsg;
    }

    /**
     * 改变isLoading的值
     * @param isLoading  是否加载
     * @param loadingMsg 加载提示
     */
    @action setLoading(isLoading: boolean = true, loadingMsg: string = '加载中...') {
        this.isLoading = isLoading;
        this.loadingMsg = loadingMsg;
    }
}
