/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {View, ScrollView, Text, Modal} from 'react-native'
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
        XPay.setWxId('wxb4ba3c02aa476ea1');
        //设置	支付宝URL Schemes
        XPay.setAlipayScheme('ap2017102209453437')
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
                Toast.message('扫描结果:' + e.code)
                RouteHelper.navigate('WebPage', {url: e.code})
            }
        })
    };

    changeTheme = () => {
        Theme.setColors({baseColor: 'red'})
    };


    wxPay = async () => {
        const res = await fetch('http://wxpay.wxutil.com/pub_v2/app/app_pay.php');
        const params = await res.json();
        console.log('支付参数', params);
        const {partnerid, appid, noncestr, timestamp, prepayid, sign} = params;
        XPay.wxPay({
                partnerId: partnerid,
                prepayId: prepayid,
                packageValue: params.package,
                nonceStr: noncestr,
                timeStamp: String(timestamp),
                sign: sign
            },
            res => {
                alert(JSON.stringify(res));
                // if (res.errCode == 0) {
                //     alert('支付成功')
                // } else {
                //     alert('支付失败')
                // }
            })
    };

    aliPay = () => {
        XPay.alipay('app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D',
            res => alert(JSON.stringify(res)))
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

                <ListRow
                    title="微信支付"
                    onPress={this.wxPay}
                />

                <ListRow
                    title="支付宝支付"
                    onPress={this.aliPay}
                />
            </ScrollView>
        </BaseContainer>);
    }

}
