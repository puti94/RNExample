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
@pageHelper
export default class UserPage extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'UserPage',
    });

    constructor(props) {
        super(props);
        console.log('constructor', this)
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentWillFocus(e) {
        console.log('componentWillFocus', e)
    }

    componentDidFocus = (e) => {
        console.log('componentDidFocus', e)
    };

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillBlur(e) {
        console.log('componentWillBlur', e)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    componentDidBlur(e) {
        console.log('componentDidBlur', e)
    }


    render() {
        console.log('render');
        return (
            <View style={styles.container}>
                <Text>用户个人页面</Text>
                <Button onPress={() => {
                    this.props.navigation.navigate('Test3Page')
                }} title={'跳转下一页'}/>

                <Button onPress={() => {
                    this.props.navigation.pop()
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
