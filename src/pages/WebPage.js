/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    WebView,
    Platform, TouchableOpacity, Image, Text, BackHandler, ActivityIndicator
} from 'react-native';
import {pageHelper} from '../utils/index'
import Spinkit from 'react-native-spinkit';
import {inject} from 'mobx-react'
@pageHelper()
export default class WebPage extends Component {

    canGoBack = false;


    onBackPressed = () => {
        if (this.state.canGoBack && this.isVisiable) {
            this.webView.goBack();
            return true;
        } else {
            return false;
        }
    };

    /**
     * 接收从HTML调用window.postMessage('')发来的参数
     * @param msg
     */
    onMessage = (msg) => {
        //Html传来的字符串
        let data = msg.nativeEvent.data;
        console.log('onMessage', data);
    };


    componentDidMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
        }
    }


    onLoadStart = () => {
        console.log('onLoadStart');
    };

    onLoadEnd = () => {
        console.log('onLoadEnd');
    };

    onNavigationStateChange = (navState) => {
        console.log("onNavigationStateChange", navState);
        this.url = navState.url;
        this.canGoBack = navState.canGoBack;
    };

    /**
     * 调用Html的JS代码
     * @param js  js代码
     */
    callJs(js) {
        if (this.webView) {
            this.webView.injectJavaScript(js);
        }
    }

    /**
     * 返回一个正在加载的视图
     * @returns {XML}
     */
    renderLoading = () => {
        return (<View style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 100
        }}>
            <Spinkit size={70} color={appTheme.themeColor} type={'9CubeGrid'}/>
        </View>)
    };

    /**
     * 返回一个网页加载错误的视图
     * @returns {XML}
     */
    renderError = () => {
        return (<View style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 100
        }}>
            <Text style={{
                fontSize: 14,
                marginTop: 15
            }}>页面加载错误</Text>
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    backgroundColor: appTheme.hint,
                    borderRadius: 5,
                    height: 30,
                    width: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={() => this.reload()}>
                <Text
                    style={{color: 'white'}}>重新加载</Text>
            </TouchableOpacity>
        </View>)

    };


    render() {
        return (
            <View style={{flex: 1}}>
                <WebView
                    source={this.state.source}
                    ref={ref => this.webView = ref}
                    style={{flex: 1}}
                    onLoadStart={this.onLoadStart}
                    scalesPageToFit={true}
                    onLoadEnd={this.onLoadEnd}
                    onNavigationStateChange={this.onNavigationStateChange}
                    javaScriptEnabled={true}
                    renderError={this.renderError}
                    startInLoadingState={true}
                    renderLoading={this.renderLoading}
                    onMessage={this.onMessage}
                />
            </View>
        );
    }

}

