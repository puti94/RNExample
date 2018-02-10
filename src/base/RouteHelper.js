/**
 * Created by puti on 2017/11/1.
 * 路由管理类
 */

import {DeviceEventEmitter}  from 'react-native';
import {NavigationActions} from 'react-navigation'

export class RouteHelper {
    //app唯一导航组件的实例
    static navigation = null;
    //上次执行to方法的时间
    static lastActionTime = 0;
    //重复点击判断间隔时间,单位毫秒
    static INTERVAL = 500;
    //栈顶变化通知名
    static STACKCHANGE = 'STACK_TOP_CHANGE_LISTENER';
    //列表保存路由栈信息
    static routeStack = [];

    /**
     * 添加到导航栈中
     * @param navigation
     */
    static addStack(navigation) {
        if (RouteHelper.routeStack.indexOf(navigation.state) === -1) {
            //给navigation赋值
            RouteHelper.navigation = navigation;
            //将状态保存到本地
            RouteHelper.routeStack.push(navigation.state);
            //添加一个index的state
            navigation.state.index = RouteHelper.routeStack.length;
            //发送栈顶变化的通知
            this.postStackTopChange(navigation.state);
            console.log('添加新的页面', navigation, '路由', RouteHelper.routeStack)
        }
    }

    /**
     * 添加栈顶变化的监听
     * @param callBack
     */
    static addStackTopChangeListener(callBack) {
        return DeviceEventEmitter.addListener(this.STACKCHANGE, callBack)
    }

    /**
     * 发送栈顶的state
     * @param state
     */
    static postStackTopChange(state) {
        DeviceEventEmitter.emit(this.STACKCHANGE, state);
    }

    /**
     * 从导航栈中移除
     * @param navigation
     */
    static remove(navigation) {
        let index = RouteHelper.routeStack.indexOf(navigation.state);
        if (index !== -1) {
            RouteHelper.routeStack.splice(index, 1);
            console.log('移除页面', navigation, '路由', RouteHelper.routeStack);
            if (index !== 0)
                this.postStackTopChange(RouteHelper.routeStack[index - 1]);
        }
    }

    /**
     * 初始化,在最早能获取到导航栏组件索引的地方执行此方法，如导航栏初始化页面的构造方法中获取this.props.navigation
     * @param nav
     */
    static init(nav) {
        RouteHelper.navigation = nav;
    }

    /**
     *
     * 全局的路由跳转方法,可以在任意地方使用
     * @param routeName
     * @param params
     * @param delay
     * @param action
     */
    static navigate(routeName, params, delay = true, action) {
        //防止重复点击
        let nowTime = new Date().getTime();
        if ((nowTime - RouteHelper.lastActionTime) <= this.INTERVAL && delay) {
            //重复点击了
            return
        }
        if (!RouteHelper.navigation) {
            console.error('请先初始化路由');
            return
        }
        RouteHelper.lastActionTime = nowTime;
        RouteHelper.navigation.navigate(routeName, params, action);
    }

    /**
     * 返回第一个routeName 原理。StackNavigation能使用goBack(key)返回指定页面的上一页。
     * 所以根据想回到routeName页面就需要查找路由栈列表有这个routeName第一个的索引。获取索引+1值的key,就能回到第一个routeName的页面
     * @param routeName  声明的组件名
     * @returns {boolean} 正确则表示返回成功
     */
    static getBackto(routeName) {
        this.routeStack.map((state, i) => {
            //判断routeName相同并且不是列表最后一个表示匹配成功
            if (state.routeName === routeName && i < this.routeStack.length - 1) {
                //获取+1的key
                let key = this.routeStack[i + 1].key;
                //需要移除导航栈索引后面的值
                let deleteCount = this.routeStack.length - i - 1;
                RouteHelper.routeStack.splice(i + 1, deleteCount);
                console.log('从Route移除', '数量', deleteCount, RouteHelper.routeStack);
                //执行StackNavigation的goBack(key)方法
                this.navigation.goBack(key);
                //发送栈顶变化的通知
                this.postStackTopChange(RouteHelper.routeStack[i]);
                return true
            }
        });
        return false;
    }

    static reset(routeName) {
        let resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: routeName})
            ]
        });
        RouteHelper.navigation.dispatch(resetAction);
        this.routeStack = [];
    }
}


