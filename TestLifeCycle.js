/**
 * User: puti.
 * Time: 2018/4/27 下午3:58.
 */


import React, {Component} from 'react';
import {
    StyleSheet, Text,
    View,
    Button
} from 'react-native';

export default class TestLifeCycle extends Component {
    state = {
        text: 'props',
        text1: 'props',
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title='点击' onPress={() => this.setState({text: '改变prop'})}/>
                <CustomView text={this.state.text} text1={this.state.text1}/>
            </View>
        );
    }
}

class CustomView extends Component {
    constructor(props) {
        super(props);
        console.log('constructor');
        this.state = {
            text: '未改变'
        };
    }

    getDerivedStateFromProps(nextProps) {
        console.log('getDerivedStateFromProps', nextProps);
        return {
            text: '我是根据prop跟新的'
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('componentWillReceiveProps', nextProps)
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState);
        return true;
    }

    componentDidMount() {
        console.log('componentDidMount')
    }


    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }


    render() {
        console.log('render');
        return <View>
            <Text>测试</Text>
            <Text>{this.props.text}</Text>
            <Text>{this.props.text1}</Text>
            <Text onPress={() => this.setState({text: '改变'})}>点击</Text>
            <Text>{this.state.text}</Text>
        </View>
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
