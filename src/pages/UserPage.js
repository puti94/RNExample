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
import {inject} from 'mobx-react'
@inject('userStore')
@pageHelper()
export default class UserPage extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'UserPage',
    });

    render() {
        console.log('render');
        return (
            <View style={styles.container}>
                <Text>用户个人页面</Text>
                <Button onPress={() => {
                    RouteHelper.pop()
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
