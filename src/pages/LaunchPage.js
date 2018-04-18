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
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native'
import {ListRow} from 'teaset'
import SplashScreen from 'react-native-splash-screen'
import {RouteHelper} from 'react-navigation-easy-helper'
import PropTypes from "prop-types";
import {observer} from 'mobx-react'
import {Theme} from "../store";
import {images} from "../res";
import ShadowView from "react-native-shadow-view";
import {BaseContainer} from "../components";
import StateImagePage from "./StateImagePage";

const {width} = Dimensions.get('window');
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
        console.log('版本', Platform.Version)
    }

    render() {
        return (<BaseContainer store={this.store} hideLeft title={'LaunchPage'}>
            <ScrollView style={{flex: 1}}>
                <ListRow title={'工具示例'} onPress={() => {
                    RouteHelper.navigate('UtilsPage')
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
                <ListRow title={'基础页面'} onPress={() => {
                    RouteHelper.navigate('BasePage')
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

