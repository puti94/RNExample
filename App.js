/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppNavigator} from "./src/AppNav";
import {Provider} from 'mobx-react'
import {BaseAppStore} from './src/store/index'
import {RouteHelper} from 'react-navigation-easy-helper'
import {reInit} from "./src/base/Constant";
import codePush from 'react-native-code-push'

const store = new BaseAppStore();
const needLoginPage = ['UserPage'];

//设置路由拦截器,项目所有跳转方法推荐都用RouteHelper.navigate()
RouteHelper.routeInterceptor = (routeName, params) => {
    if (!store.userStore.isLogin && needLoginPage.indexOf(routeName) !== -1) {
        RouteHelper.navigate('LoginPage', {
            routeName,
            params
        });
        return false;
    }
    console.log(store, params);
    return true
};

@codePush
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        switch (this.props['BUILD_TYPES']) {
            case 'DEBUG':
                break;
            case 'STAGING':
                global._STAGING_ = true;
                break;
            case 'RELEASE':
                global._RELEASE_ = true;
                break;
        }
        reInit();
    }

    render() {
        return <Provider {...store}>
            <AppNavigator/>
        </Provider>
    }
}

