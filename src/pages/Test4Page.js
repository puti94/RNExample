/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    Text,
    Button
} from 'react-native';
import {RouteHelper} from 'react-navigation-easy-helper'
import BaseContainer from "../components/BaseContainer";

export default class Test4Page extends Component {

    render() {
        return (
            <BaseContainer title={'Test4Page'}>

                <Text>页面4</Text>
                <Button onPress={() => {
                    this.props.navigation.pop(2)
                }} title={'返回前两页'}/>
                <Button onPress={() => {
                    this.props.navigation.goBack()
                }} title={'返回上一页'}/>
                <Button onPress={() => {
                    RouteHelper.goBackTo('MainPage')
                }} title={'返回首页'}/>
                <Button onPress={() => {
                    RouteHelper.reset('MainPage')
                }} title={'重置首页'}/>
                <Text>页面4</Text>
            </BaseContainer>
        );
    }
}
