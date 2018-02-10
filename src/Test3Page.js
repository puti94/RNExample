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

export default class Test3Page extends Component {

    constructor(props) {
        super(props);
        console.log(this)
    }

    render() {
        return (
            <View style={styles.container}>

                <Text>页面3</Text>
                <Button onPress={() => {
                    RouteHelper.getBackto('Test1Page')
                }} title={'返回第一页'}/>
                <Button onPress={() => {
                    RouteHelper.navigate('Test4Page')
                }} title={'进入第四页'}/>
                <Button onPress={() => {
                    RouteHelper.navigate('Test1Page');

                    // this.props.navigation.navigate('Test1Page')
                }} title={'进入第1页'}/>
                <Text>页面3</Text>
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
