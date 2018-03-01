/**
 * User: puti.
 * Time: 2018/2/10 下午3:49.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */


import React, {Component} from 'react'
import {RouteHelper} from './RouteHelper'
import {View} from "react-native";
import {ErrorView} from "../component/ErrorView";
import {LoadingView} from "../component/LoadingView";
import {BasePageStore} from "../base/BasePageStore";

/**
 * 使用装饰模式给组件添加一些功能，将RouteHelper模块必须的功能加上,
 * 并结合新版react-navigation的API,为每个page页面添加一下生命周期函数
 * 用法 routeHelper(PageComponent) or 使用装饰器@routeHelper
 * @param Obj StackNavigator注册的组件。
 * @returns {function(...[*])} 返回的还是原有对象
 */
export const routeHelper = (Obj) => {

    let NewPage = (...args) => {
        let _instance = new Obj(...args);
        if (!(_instance instanceof Component)) {
            console.error('此装饰器对非组件无效');
            return null;
        }
        if (!_instance.props.navigation) {
            console.error('此组件不是StackNavigation的子组件');
            return null;
        }
        if (!_instance.props.navigation.addListener || typeof _instance.props.navigation.addListener !== 'function') {
            console.error('请更新最新版本的react-navigation');
            return null;
        }

        let _mComponentDidMount = _instance.componentDidMount ? _instance.componentDidMount.bind(_instance) : null;
        let _mComponentWillUnmount = _instance.componentWillUnmount ? _instance.componentWillUnmount.bind(_instance) : null;


        _instance.componentDidMount = () => {
            RouteHelper.addStack(_instance.props.navigation);
            _mComponentDidMount && _mComponentDidMount();
        };

        _instance.componentWillUnmount = () => {
            RouteHelper.remove(_instance.props.navigation);
            _mComponentWillUnmount && _mComponentWillUnmount();
        };

        _instance.params = _instance.props.navigation.state.params;

        //注册监听
        _instance.props.navigation.addListener('willBlur', (e) => {
            if (_instance.componentWillBlur && typeof _instance.componentWillBlur === 'function') {
                _instance.componentWillBlur.call(_instance, e)
            }
        });
        _instance.props.navigation.addListener('willFocus', (e) => {
            if (_instance.componentWillFocus && typeof _instance.componentWillFocus === 'function') {
                _instance.componentWillFocus.call(_instance, e)
            }
        });
        _instance.props.navigation.addListener('didBlur', (e) => {
            if (_instance.componentDidBlur && typeof _instance.componentDidBlur === 'function') {
                _instance.componentDidBlur.call(_instance, e)
            }
        });
        _instance.props.navigation.addListener('didFocus', (e) => {
            if (_instance.componentDidFocus && typeof _instance.componentDidFocus === 'function') {
                _instance.componentDidFocus.call(_instance, e)
            }
        });

        return _instance
    };
    Object.assign(NewPage, Obj);
    return NewPage
};


/**
 * 给一个页面添加正在加载视图，加载错误视图，每个页面都需要一个自己的store包含一个BasePageStore的数据，可以继承BasePageStore
 * @param Obj
 * @returns {function(...[*])}
 */
export const viewHelper = (Obj) => {
    let NewPage = (...args) => {
        let _instance = new Obj(...args);
        if (!(_instance instanceof Component)) {
            console.error('此装饰器对非组件无效');
            return null;
        }
        let _mRender = _instance.render.bind(_instance);
        _instance.render = () => {
            return <View style={{flex: 1}}>
                {_mRender()}
                { !_instance.renderErrorView ? <ErrorView store={_instance.store}/> : _instance.renderErrorView()}
                { !_instance.renderLoadingView ?
                    <LoadingView store={_instance.store}/> : _instance.renderErrorView()}
            </View>
        };
        if (_instance.store) {
            console.warn('store已经自己定义,请确保含有需要的数据,否则可能一些功能无法使用');
            return _instance
        }
        if (typeof _instance.getStore !== 'function' || !_instance.getStore()) {
            _instance.store = new BasePageStore();
        } else {
            _instance.store = _instance.getStore();
        }
        return _instance
    };
    Object.assign(NewPage, Obj);
    return NewPage
};

/**
 * 组合了viewHelper和routeHelper的功能
 * @param Obj
 * @returns {function(...[*])}
 */
export const pageHelper = (Obj) => {
    return viewHelper(routeHelper(Obj))
};