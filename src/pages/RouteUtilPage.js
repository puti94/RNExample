/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {ScrollView} from 'react-native'
import {RouteHelper} from 'react-navigation-easy-helper'
import {NavigationActions} from 'react-navigation'
import {observer, inject} from 'mobx-react'
import {ListRow} from 'teaset'
import BaseContainer from "../components/BaseContainer";

@observer
@inject('userStore')
export default class RouteUtilPage extends Component {

    render() {
        return (<BaseContainer title={'路由辅助类使用方法'}>
            <ScrollView style={{flex: 1}}>
                <ListRow title={'跳转页面 navigate(routeName)'} onPress={() => {
                    RouteHelper.navigate('Test2Page')
                }}/>
                <ListRow title={'跳转页面 push(routeName)'} onPress={() => {
                    RouteHelper.push('Test2Page')
                }}/>
                <ListRow title={'返回上一页 goBack()'} onPress={() => {
                    RouteHelper.goBack()
                }}/>
                <ListRow title={'返回上一页 pop()'} onPress={() => {
                    RouteHelper.pop();
                }}/>
                <ListRow title={'重置路由 reset(routeName)'} onPress={() => {
                    RouteHelper.reset('LaunchPage')
                }}/>
                <ListRow title={'重置路由 reset() 自定义'} onPress={() => {
                    let resetAction = NavigationActions.reset({
                        index: 1,
                        actions: [
                            NavigationActions.navigate({routeName: 'LaunchPage'}),
                            NavigationActions.navigate({routeName: 'MainPage'}),
                        ]
                    });
                    RouteHelper.navigation.dispatch(resetAction);
                }}/>
                <ListRow title={'isFocused()用法'} onPress={() => {
                    RouteHelper.push('Test3Page', {params: '我是参数'})
                }}/>
                <ListRow title={'拦截器的用法'} onPress={() => {
                    let needLoginPage = ['UserPage'];
                    RouteHelper.routeInterceptor = (routeName, params) => {
                        if (!this.props.userStore.isLogin && needLoginPage.indexOf(routeName) !== -1) {
                            // RouteHelper.navigate('LoginPage', {
                            //     routeName,
                            //     params
                            // });

                            RouteHelper.push('LoginPage', {
                                successCallBack: () => {
                                    RouteHelper.push(routeName, params)
                                }
                            });
                            return false;
                        }
                        return true
                    };
                    RouteHelper.navigate('UserPage', {params: '我是参数'})
                }}/>
            </ScrollView>
        </BaseContainer>);
    }

}
