/**
 * User: puti.
 * Time: 2018/2/10 下午3:49.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */

import {Component} from 'react'
import {RouteHelper} from "./RouteHelper";
export const route = (Obj) => {
    return (...args) => {
        let _instance = new Obj(...args);
        if (!(_instance instanceof Component)) {
            console.error('此装饰器对非组件无效');
            return null;
        }
        if (!_instance.props.navigation) {
            console.error('此组件不是StackNavigation的子组件');
            return null;
        }
        _instance.params = _instance.props.navigation.state.params;
        let _mComponentDidMount = _instance.componentDidMount ? _instance.componentDidMount.bind(_instance) : null;
        let _mComponentWillUnmount = _instance.componentWillUnmount ? _instance.componentWillUnmount.bind(_instance) : null;

        _instance.isInStackTop = () => {
            return _instance.props.navigation.state.index === RouteHelper.routeStack.length
        };

        _instance.componentDidMount = () => {
            //添加栈顶变化的监听,逻辑是默认最后入栈的为用户可见的，为栈顶
            _instance.stackTopChangeListener = RouteHelper.addStackTopChangeListener((state) => {
                if (_instance.topChange && typeof _instance.topChange === 'function') {
                    _instance.topChange(state)
                }
            });
            RouteHelper.addStack(_instance.props.navigation);
            _mComponentDidMount && _mComponentDidMount();
        };

        _instance.componentWillUnmount = () => {
            RouteHelper.remove(_instance.props.navigation);
            _instance.stackTopChangeListener && _instance.stackTopChangeListener.remove()
            _mComponentWillUnmount && _mComponentWillUnmount();
        };
        return _instance
    }
};