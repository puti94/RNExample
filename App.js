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
import codePush from 'react-native-code-push'
import MoveView from "./src/components/MoveView";
import {Platform, StatusBar, Text, TouchableOpacity, View} from "react-native";
import JPushModule from 'jpush-react-native';
import {Toast} from 'teaset'

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
        this.state={
            source:{html:''}
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent');
            JPushModule.notifyJSDidLoad(res => console.log(res));
        }
        JPushModule.getRegistrationID(registrationId => {
            console.log('registrationId', registrationId);
            Toast.message(registrationId);
        });
        this.notificationListener = event => {
            console.log('addReceiveNotificationListener', event);
            alert(`Notification:${JSON.stringify(event)}`);
        };
        JPushModule.addReceiveNotificationListener(this.notificationListener);
        this.customMsgListener = event => {
            console.log('addReceiveCustomMsgListener', event);
            alert(`Custom:${JSON.stringify(event)}`);
        };
        JPushModule.addReceiveCustomMsgListener(this.customMsgListener);
    }

    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener(this.customMsgListener);
        JPushModule.removeReceiveNotificationListener(this.notificationListener);
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

