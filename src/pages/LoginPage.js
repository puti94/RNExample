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
import {pageHelper} from "../utils/index";
import {inject, observer} from 'mobx-react'
import {autorun} from 'mobx'


@inject('userStore')
@pageHelper()
@observer
export default class LoginPage extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'LoginPage',
    });

    constructor(props) {
        super(props);
    }


    _login = () => {
        this.props.userStore.login({
            account: '157xxxxxxxx',
            password: '111111',
            store: this.store,
            type: 'account',
            callBack: () => {
                if (this.props.userStore.isLogin) {
                    const {routeName, params, successCallBack} = this.props.navigation.state.params;
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
            <View style={styles.container}>
                <Text>登录页面</Text>
                <Button onPress={this._login} title={'登录'}/>

                <Button onPress={() => {
                    this.props.navigation.navigate('LaunchPage')
                }} title={'返回上一页'}/>

            </View>
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
