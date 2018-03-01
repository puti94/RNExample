/**
 * User: puti.
 * Time: 2018/2/27 上午9:23.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */

import {observable, computed, action, autorun} from 'mobx'


export class UserStore {
    @observable
    data: UserData;

    @computed get isLogin() {
        return this.data && this.data.uid && true //其它一些条件
    }

    @action
    setData(user: UserData) {
        this.data = user
    }

    constructor() {
        autorun(() => {
            console.log('用户状态改变', this.isLogin)
        })
    }


    /**
     * 账号密码登录
     * @param account
     * @param password
     */
    login(account, password) {
        setTimeout(() => {
            this.setData(new UserData({uid: '21123', name: '张三', headImg: 'http://'}))
        }, 2000)
    }

    /**
     * 退出登录
     */
    logout() {
        this.setData(null);

    }

    /**
     * 其它登录方式
     * @param openid
     * @param type
     */
    otherLogin(openid, type) {


    }
}

export class UserData {
    uid: string;
    @observable
    name: string;
    @observable
    headImg: string;
    //其它一些用户数据。。。

    constructor(...params) {
        Object.assign(this, ...params)
        autorun(() => {
            console.log('用户信息改变', this.name)
        })
    }

    @action setName(name: string) {
        this.name = name;
    }

    @action setHeaderImg(url: string) {
        this.headImg = url;
    }
}