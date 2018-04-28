/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    ScrollView,
    AsyncStorage,
    NativeModules
} from 'react-native'
import {ListRow} from 'teaset'
import SplashScreen from 'react-native-splash-screen'
import {RouteHelper} from 'react-navigation-easy-helper'
import {BaseContainer} from "../components";
import StateImagePage from "./StateImagePage";
import {codePushCheckForUpdate} from "../utils/UpdateUtils";
import CustomNativeUIPage from "./CustomNativeUIPage";
import Config from '../base/Constant'

export default class LaunchPage extends Component {


    launchApp = async () => {
        let notFirstOpen = await AsyncStorage.getItem('notFirstOpen');
        if (notFirstOpen) {
            RouteHelper.reset('MainPage')
        } else {
            AsyncStorage.setItem('notFirstOpen', 'true');
            RouteHelper.replace('GuidePage')
        }
    };

    componentDidMount() {
        //当启动页完全渲染完毕后隐藏白屏占位图
        SplashScreen.hide();
    }

    componentDidFocus() {
        console.log('componentDidFocus', arguments, this.props)
    }

    componentWillBlur() {
        console.log('componentWillBlur', arguments)
    }


    render() {
        return (<BaseContainer store={this.store} hideLeft title={Config.TEST_TITLE}>
            <ScrollView style={{flex: 1}}>
                <ListRow title={'工具示例'} onPress={() => {
                    RouteHelper.navigate('UtilsPage')
                }}/>
                <ListRow title={'code-push检测更新'} onPress={() => {
                    codePushCheckForUpdate()
                }}/>
                <ListRow title={'模拟通讯录'} onPress={() => {
                    RouteHelper.navigate('NotesPage')
                }}/>
                <ListRow title={'网络图片加载占位图,错误图'} onPress={() => {
                    RouteHelper.navigate('StateImagePage')
                }}/>
                <ListRow title={'路由示例'} onPress={() => {
                    RouteHelper.navigate('RouteUtilPage')
                }}/>
                <ListRow title={'支付示例'} onPress={() => {
                    RouteHelper.navigate('PayPage')
                }}/>
                <ListRow title={'基础页面'} onPress={() => {
                    RouteHelper.navigate('BasePage')
                }}/>
                <ListRow title={'自定义原生UI'} onPress={() => {
                    RouteHelper.navigate('CustomNativeUIPage')
                }}/>

                <ListRow title={'设置页面'} onPress={() => {
                    RouteHelper.navigate('SetPage')
                }}/>
                <ListRow title={'Teaset Example'} onPress={() => {
                    RouteHelper.navigate('TeasetApp')
                }}/>

                <ListRow title={'打开正常App'} onPress={this.launchApp}/>
            </ScrollView>
        </BaseContainer>);
    }

}

