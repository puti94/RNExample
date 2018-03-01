/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {View, Button, TextInput, ScrollView} from 'react-native'
import {pageHelper, CommonUtils} from '../utils/index'
import {NavigationActions} from 'react-navigation'
import {observer, inject} from 'mobx-react'
import {UtilsPageStore} from '../store/UtilsPageStore'
import {ListRow} from 'teaset'
import {LoadingUtils} from '../utils/index'

@inject('baseStore')
@pageHelper
@observer
export default class UtilsPage extends Component {

    static  navigationOptions = ({navigation}) => ({
        title: '工具类用法'
    });

    getStore() {
        return new UtilsPageStore()
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (<ScrollView style={{flex: 1}}>
            <ListRow
                title="城市选择"
                onPress={() => {
                    CommonUtils.showChooseCity((value) => {
                        this.store.setChooseArea(value)
                    }, (value) => {
                        this.store.setChooseArea(value)
                    })
                }}
                detail={`${this.store.chooseArea.province}-${this.store.chooseArea.city}-${this.store.chooseArea.area}`}/>
            <ListRow
                ref={ref => this.clickView = ref}
                title="图片放大"
                onPress={() => {
                    CommonUtils.showBigImages(this.clickView, 1,
                        [R.images.ic_photo1, R.images.ic_photo2, R.images.ic_photo3],
                        (index) => {
                            Toast.message(`点击了第${index + 1}张`)
                        })
                }}
            />
            <ListRow
                title="显示加载框"
                onPress={() => {
                    LoadingUtils.show();
                    setTimeout(() => {
                        LoadingUtils.hide()
                    }, 2000)
                }}
            />

            <ListRow
                title="显示自定义加载框"
                onPress={() => {
                    LoadingUtils.show('', '', <View style={{width: 100, height: 100, backgroundColor: 'blue'}}/>)
                }}
            />


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

            <Button title="到登录页面" onPress={() => {
                RouteHelper.navigate('LoginPage')
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
