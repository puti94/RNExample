/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    WebView,
    Platform, TouchableOpacity, Text, BackHandler
} from 'react-native';
import Spinkit from 'react-native-spinkit';
import {Theme} from "../store";
import BaseContainer from "../components/BaseContainer";

export default class WebPage extends Component {

    navState = {};

    constructor(props) {
        super(props);
        this.state = {
            source: {uri: this.props.url || 'https://www.baidu.com'},
        };
    }

    onBackPressed = () => {
        if (this.navState.canGoBack) {
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
        // this.setState({source: {uri: navState.url}, canGoback: navState.canGoBack})
        this.navState = navState;
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
            <Spinkit size={70} color={Theme.baseColor} type={'9CubeGrid'}/>
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
                    backgroundColor: Theme.baseColor,
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
            <BaseContainer>
                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text onPress={() => {
                        console.log(this.navState);
                        // if (this.navState.canGoBack) {
                        this.webView.goBack();
                        // }
                    }}>上一页</Text>
                    <Text onPress={() => {
                        // this.setState({source: {uri: 'https://reactnative.cn'}})
                        this.forceUpdate()
                    }}>首页</Text>
                    <Text onPress={() => {
                        console.log(this.navState);
                        // if (this.navState.canGoBack) {
                        this.webView.goForward()
                        // }
                    }}>下一页</Text>
                    <Text onPress={() => {
                        this.webView.reload();
                    }}>重新刷新</Text>
                </View>
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
                    // onMessage={this.onMessage}
                />
            </BaseContainer>
        );
    }

}

