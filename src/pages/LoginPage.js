/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
import {inject, observer} from 'mobx-react'
import {RouteHelper} from 'react-navigation-easy-helper'
import {BaseContainer} from "../components";


@inject('userStore')
@observer
export default class LoginPage extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'LoginPage',
    });

    _login = () => {
        const {userStore, navigation} = this.props;
        const {routeName, params, successCallBack} = navigation.state.params;
        userStore.login({
            account: '157xxxxxxxx',
            password: '111111',
            store: this.store,
            type: 'account',
            callBack: () => {
                if (userStore.isLogin) {
                    if (routeName) {
                        RouteHelper.replace(routeName, params)
                    }
                    if (successCallBack) {
                        RouteHelper.goBack();
                        successCallBack();
                    }
                }
            }
        })
    };

    render() {
        return (
            <BaseContainer title={'LoginPage'} rightTitle={'注册'} rightPress={alert}>
                <Text>登录页面</Text>
                <Button onPress={this._login} title={'登录'}/>

                <Button onPress={() => {
                    this.props.navigation.navigate('LaunchPage')
                }} title={'返回上一页'}/>

            </BaseContainer>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
