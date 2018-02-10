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
import {RouteHelper} from "./base/RouteHelper";

export default class Test2Page extends Component {

    constructor(props) {
        super(props);
        console.log(this)
    }

    topChange = (state) => {
        console.log('页面2栈顶变化', state)
    }


    render() {
        console.log(this);
        return (
            <View style={styles.container}>
                <Text>页面2</Text>
                <Button onPress={() => {
                    RouteHelper.navigate('Test3Page')
                }} title={'跳转下一页'}/>
                <Button onPress={() => {
                    this.props.navigation.navigate('Test3Page')
                }} title={'跳转下一页'}/>

                <Button onPress={() => {
                    this.props.navigation.goBack()
                }} title={'放回上一页'}/>

                <Text>{this.props.msg}</Text>
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
