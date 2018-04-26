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
import MoveView from "./src/components/MoveView";
import {Platform, StatusBar, Text, TouchableOpacity, View} from "react-native";

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

    componentDidMount() {
        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent')
        }
    }

    render() {
        return <Provider {...store}>
            <View style={{flex: 1}}>
                <AppNavigator/>
                <MoveView style={{top: SCREEN_HEIGHT - 140, left: SCREEN_WIDTH - 120}}>
                    <TouchableOpacity
                        onPress={() => alert('')}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40,
                            backgroundColor: '#0008',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{color: 'white'}}>悬浮窗口</Text>
                    </TouchableOpacity>
                </MoveView>
            </View>
        </Provider>
    }
}

