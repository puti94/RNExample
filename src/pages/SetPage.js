/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import {ListRow} from 'teaset'
import {appStateStore} from '../store'
import {inject, observer} from 'mobx-react'
import {RouteHelper} from 'react-navigation-easy-helper'
import BaseContainer from "../components/BaseContainer";

const ITEMS = ['apiLevel', 'applicationName', 'brand', 'buildNumber', 'bundleId', 'carrier',
    'deviceCountry', 'deviceId', 'deviceLocale', 'deviceName', 'firstInstallTime', 'fontScale',
    'freeDiskStorage', 'iPAddress', 'instanceID', 'lastUpdateTime', 'manufacturer', 'maxMemory',
    'phoneNumber', 'model', 'readableVersion', 'serialNumber', 'systemVersion', 'timezone', 'totalDiskCapacity',
    'totalMemory', 'uniqueID', 'userAgent', 'version', 'is24Hour', 'isEmulator', 'mACAddress'];
@inject('userStore')
@observer
export default class SetPage extends Component {


    componentDidMount() {
        appStateStore.syncCacheSize()
    }

    renderItems() {
        return ITEMS.map(item =>
            <ListRow title={item}
                     detail={appStateStore[item] ? `${appStateStore[item]}` : '不支持'}/>)
    }

    render() {
        return (
            <BaseContainer title={'设置'}>
                <ScrollView style={styles.container}>
                    <ListRow title={'检查更新aa'} onPress={() => {
                        RouteHelper.pop(2)
                    }}/>
                    <ListRow title={'清除缓存'} detail={`大小:${appStateStore.cacheSize}`} onPress={() => {
                        appStateStore.clearCache();
                    }}/>


                    {this.props.userStore.isLogin ?
                        <ListRow title={'退出登录'} detail={`用户名:${this.props.userStore.data.name}`} onPress={() => {
                            Alert.alert('确定要退出登录吗？', '下次将不能自动的登录。', [
                                {text: '取消', style: 'cancel'},
                                {text: '确定', onPress: () => this.props.userStore.logout()},
                            ])
                        }}/> :
                        <ListRow title={'模拟登录'} detail={'未登录'} onPress={() => {
                            this.props.userStore.login({type: 111})
                        }}/>}

                    <ListRow title={'清除缓存'} detail={`大小:${appStateStore.cacheSize}`} onPress={() => {
                        appStateStore.clearCache();
                    }}/>
                    {this.renderItems()}
                </ScrollView>
            </BaseContainer>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
