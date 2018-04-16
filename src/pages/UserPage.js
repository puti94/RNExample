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
import {RouteHelper} from "react-navigation-easy-helper";
import {inject} from 'mobx-react'
import BaseContainer from "../components/BaseContainer";

@inject('userStore')
export default class UserPage extends Component {


    render() {
        console.log('render');
        return (
            <BaseContainer title={'UserPage'}>
                <Text>用户个人页面</Text>
                <Button onPress={() => {
                    RouteHelper.pop()
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
