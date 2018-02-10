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
import {RouteHelper} from "./base/index";

export default class Test1Page extends Component {

    constructor(props) {
        super(props);
        console.log(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>页面1</Text>
                <Button onPress={() => {
                    RouteHelper.navigate('Test2Page', {params: '参数'})
                }} title={'跳转下一页'}/>

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
