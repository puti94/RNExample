/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native'
import {AppNavigator} from "./src/NavigationConfig";
import {Provider} from 'mobx-react'
import {useStrict} from 'mobx'
import {BaseAppStore} from './src/store/index'
import RouteMessageView from './src/components/RouteMessageView'

useStrict(true);


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


export default class App extends Component<Props> {

    render() {
        return __DEV__ ?
            <Provider {...store} baseStore={store}>
                <View style={{flex: 1}}>
                    <AppNavigator/>
                    <RouteMessageView/>
                </View>
            </Provider>
            :
            <Provider {...store} baseStore={store}>
                <AppNavigator/>
            </Provider>
    }
}

