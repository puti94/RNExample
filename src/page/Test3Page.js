/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Button,
    ScrollView
} from 'react-native';
import {pageHelper} from '../utils/PageUtils'
import  {observable, action} from 'mobx'
import {ListRow} from 'teaset'
import  {observer} from 'mobx-react'
@pageHelper()
@observer
export default class Test3Page extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Test3Page',
    });

    @observable megList = [];

    @action push(params) {
        this.megList.push(params)
    }

    constructor(props) {
        super(props);
        console.log('哈哈', this);
        this.push(`constructor,isFocus:${this.isFocus}`)
    }

    componentWillMount() {
        console.log('componentWillMount')
        this.push(`componentWillMount,isFocus:${this.isFocus}`)
    }

    componentWillFocus(e) {
        console.log('componentWillFocus', e);
        this.push(`componentWillFocus,isFocus:${this.isFocus}`)
        Toast.message('页面WillFocus')
    }

    componentDidFocus = (e) => {
        console.log('componentDidFocus', e);
        this.push(`componentDidFocus,isFocus:${this.isFocus}`)
        Toast.message('页面DidFocus')
    };

    componentDidMount() {
        console.log('componentDidMount')
        this.push(`componentDidMount,isFocus:${this.isFocus}`)
    }

    componentWillBlur(e) {
        this.push(`componentWillBlur,isFocus:${this.isFocus}`)
        console.log('componentWillBlur', e);
        Toast.message('页面WillBlur')
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        this.push(`componentWillUnmount,isFocus:${this.isFocus}`)
        this.action && clearInterval(this.action)
    }

    componentDidBlur(e) {
        console.log('componentDidBlur', e);
        this.push(`componentDidBlur,isFocus:${this.isFocus}`)
        Toast.message('页面DidBlur')
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ListRow title={'开启定时器 可见限制'} onPress={() => {
                    this.action && clearInterval(this.action)
                    this.action = setInterval(() => {
                        if (this.isFocus)
                            Toast.message('定时任务')
                    }, 2000)
                }}/>
                <ListRow title={'开启定时器 没有限制'} onPress={() => {
                    this.action && clearInterval(this.action)
                    this.action = setInterval(() => {
                        Toast.message('定时任务')
                    }, 2000)
                }}/>
                <ListRow title={'进入下一页'} onPress={() => {
                    RouteHelper.push('UserPage')
                }}/>
                <Text>生命周期历程</Text>
                {this.megList.slice().map((item, index) => <Text key={index}>{item}</Text>)}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
