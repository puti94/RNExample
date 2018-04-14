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
import {UtilsPageStore} from '../store/UtilsPageStore'
import {ListRow, Toast} from 'teaset'
import {LoadingUtils} from '../utils/index'
import {images} from "../res";

@observer
export default class UtilsPage extends Component {

    static  navigationOptions = ({navigation}) => ({
        title: '工具类用法'
    });

    store = new UtilsPageStore();

    constructor(props) {
        super(props);
    }

    showChooseCity = () => {
        CommonUtils.showChooseCity((value) => {
            this.store.setChooseArea(value)
        }, (value) => {
            this.store.setChooseArea(value)
        })
    };

    showBigImages = () => {
        CommonUtils.showBigImages(this.clickView, 1,
            [images.ic_photo1, images.ic_photo2, images.ic_photo3],
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

    render() {
        return (<ScrollView style={{flex: 1}}>
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
                title="显示加载框"
                onPress={this.showLoading}
            />
            <ListRow
                title="显示自定义加载框"
                onPress={this.showCustomLoading}
            />
        </ScrollView>);
    }

}
