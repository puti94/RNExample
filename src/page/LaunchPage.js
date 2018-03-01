/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {View, Text, Button, TextInput, ScrollView} from 'react-native'
import {pageHelper} from '../utils/index'
import {NavigationActions} from 'react-navigation'
import {observer, inject} from 'mobx-react'
@inject('baseStore')
@pageHelper
@observer
export default class LaunchPage extends Component {

    static  navigationOptions = ({navigation}) => ({
        title: 'LaunchPage',
        headerRight: <Text onPress={() => navigation.navigate('MainPage')}>点击</Text>
    });


    constructor(props) {
        super(props);
        console.log(this)
    }

    render() {
        return (<ScrollView style={{flex: 1}}>
            <Button title="打开" onPress={() => {
                storage.getAllDataForKey('first').then(res => console.log(res))
            }}/>

            <Button title="保存" onPress={() => {
                storage.save({key: 'first', data: true})
            }}/>

            <Button title="显示加载视图" onPress={() => {
                this.store.setLoading(true, '我是自定义加载');
                setTimeout(() => {
                    this.store.setLoading(false)
                }, 2000)
            }}/>
            <Button title="显示错误视图" onPress={() => {
                this.store.setError(true, '我是自定义加载');
                setTimeout(() => {
                    this.store.setLoading(false)
                }, 2000)
            }}/>

            <Button title="到首页" onPress={() => {
                let resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'MainPage'}),
                        NavigationActions.navigate({routeName: 'Test3Page'})
                    ]
                });
                this.props.navigation.dispatch(resetAction);
            }}/>

            <View style={{height: 200}}/>
            <TextInput style={{height: 40, backgroundColor: 'blue'}}/>
        </ScrollView>);
    }

}
