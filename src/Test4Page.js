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

export default class Test4Page extends Component {

    constructor(props) {
        super(props);
        console.log(this)
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>页面4</Text>
                <Button onPress={() => {
                    this.props.navigation.pop(2)
                }} title={'返回前两页'}/>
                <Button onPress={() => {
                    this.props.navigation.goBack()
                }} title={'返回上一页'}/>
                <Text>页面4</Text>
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
