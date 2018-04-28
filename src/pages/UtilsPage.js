/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native'
import {CommonUtils} from '../utils/index'
import {observer} from 'mobx-react'
import {UtilsPageStore, Theme} from '../store'
import {ListRow, Toast} from 'teaset'
import {LoadingUtils} from '../utils/index'
import {images} from "../res";

const IMAGES = [images.ic_photo1, images.ic_photo2, images.ic_photo3];

import BaseContainer from "../components/BaseContainer";
import {RouteHelper} from "react-navigation-easy-helper";
import XPay from 'react-native-puti-pay'

@observer
export default class UtilsPage extends Component {


    store = new UtilsPageStore();

    constructor(props) {
        super(props);
        this.state = {
            modelShow: false
        };
    }

    showChooseCity = () => {
        CommonUtils.showChooseCity((value) => {
            this.store.setChooseArea(value)
        }, (value) => {
            this.store.setChooseArea(value)
        })
    };

    showBigImages = () => {
        CommonUtils.showBigImages(this.clickView, 1, IMAGES,
            (index) => {
                Toast.message(`点击了第${index + 1}张`)
            })
    };

    showLoading = () => {
        LoadingUtils.show();
        setTimeout(() => {
            LoadingUtils.hide()
        }, 2000)
    };

    showCustomLoading = () => {
        LoadingUtils.show('', '', <View style={{width: 100, height: 100, backgroundColor: 'blue'}}>
            <Text>我是自定义加载框</Text>
        </View>)
    };

    showQCord = () => {
        CommonUtils.showQCord(e => {
            if (e.code.startsWith('http')) {
                Toast.message('扫描结果:' + e.code);
                RouteHelper.navigate('WebPage', {url: e.code})
            }
        })
    };

    changeTheme = () => {
        Theme.setColors({baseColor: 'red'})
    };

    render() {
        return (<BaseContainer title={'工具类用法'}>
            <ScrollView style={{flex: 1}}>
                <ListRow
                    title="城市选择"
                    onPress={this.showChooseCity}
                    detail={`${this.store.chooseArea.province}-${this.store.chooseArea.city}-${this.store.chooseArea.area}`}/>
                <ListRow
                    ref={ref => this.clickView = ref}
                    title="图片放大"
                    onPress={this.showBigImages}
                />

                <ListRow
                    title="修改主题"
                    onPress={this.changeTheme}
                />
                <ListRow
                    title="二维码扫描"
                    onPress={this.showQCord}
                />
                <ListRow
                    title="显示加载框"
                    onPress={this.showLoading}
                />
                <ListRow
                    title="显示自定义加载框"
                    onPress={this.showCustomLoading}
                />

            </ScrollView>
        </BaseContainer>);
    }

}
