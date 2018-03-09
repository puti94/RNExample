/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {ScrollView, AsyncStorage, Text} from 'react-native'
import {observer, inject} from 'mobx-react'
import {ListRow} from 'teaset'
import SplashScreen from 'react-native-splash-screen'

@observer
@inject('baseStore')
export default class LaunchPage extends Component {

    static  navigationOptions = ({navigation}) => ({
        title: 'LaunchPage',
    });


    launchApp = async () => {
        let notFirstOpen = await AsyncStorage.getItem('notFirstOpen');
        if (notFirstOpen) {
            RouteHelper.reset('MainPage')
        } else {
            AsyncStorage.setItem('notFirstOpen', 'true');
            RouteHelper.replace('GuidePage')
        }
    };

    componentDidMount() {
        //当启动页完全渲染完毕后隐藏白屏占位图
        SplashScreen.hide();
        console.log('ee', this);
    }

    render() {
        return (<ScrollView style={{flex: 1}}>

            <ListRow title={'工具示例'} onPress={() => {
                RouteHelper.navigate('UtilsPage')
            }}/>
            <ListRow title={'路由示例'} onPress={() => {
                RouteHelper.navigate('RouteUtilPage')
            }}/>
            <ListRow title={'基础页面'} onPress={() => {
                RouteHelper.navigate('BasePage')
            }}/>

            <ListRow title={'Teaset Example'} onPress={() => {
                RouteHelper.navigate('TeasetApp')
            }}/>

            <ListRow title={'显示加载框'} onPress={() => {

                this.props.customStore.setLoading(true);
                setTimeout(() => {
                    this.props.customStore.setLoading(false)
                }, 1000)
            }}/>

            <ListRow title={'显示错误框'} onPress={() => {

                this.props.customStore.setError(true, '发生错误', () => {
                    alert('哈哈a');
                    this.props.customStore.setError(false)
                });
                // setTimeout(() => {
                //     this.props.customStore.setLoading(false)
                // }, 1000)
            }}/>

            <ListRow title={'打开正常App'} onPress={this.launchApp}/>

        </ScrollView>);
    }

}
