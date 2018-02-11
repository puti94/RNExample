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
import {RouteHelper, newRoute} from "./base/index";
import {withNavigation} from 'react-navigation'
export default class Test2Page extends Component {

    constructor(props) {
        super(props);
        console.log('constructor')
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
                <Text>页面2</Text>
                <Button onPress={() => {
                    this.props.navigation.navigate('Test3Page')
                }} title={'跳转下一页'}/>

                <Button onPress={() => {
                    this.props.navigation.pop()
                }} title={'返回上一页'}/>

                <WithButton/>
            </View>
        );
    }
}


class MButton extends Component {


    componentWillMount() {
        console.log('子componentWillMount')
    }

    componentWillFocus(e) {
        console.log('子componentWillFocus', e)
    }

    componentDidFocus = (e) => {
        console.log('子componentDidFocus', e)
    };

    componentDidMount() {
        console.log('子componentDidMount')
    }

    componentWillBlur(e) {
        console.log('子componentWillBlur', e)
    }

    componentWillUnmount() {
        console.log('子componentWillUnmount')
    }

    componentDidBlur(e) {
        console.log('子componentDidBlur', e)
    }


    render() {
        return <Button onPress={() => {
            console.log(this);
            this.props.navigation.push('Test3Page')
        }} title={'打印并跳转下一页'}/>

    }
}
//利用contextAPI传递navigation
const WithButton = withNavigation(newRoute(MButton));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
