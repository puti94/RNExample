/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {ScrollView} from 'react-native'
import {observer} from 'mobx-react'
import {ListRow, Toast} from 'teaset'
import {appStateStore} from '../store'


import {BaseContainer} from "../components";
import XPay from 'react-native-puti-pay'

@observer
export default class PayPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modelShow: false
        };
        XPay.setWxId('wxb4ba3c02aa476ea1');
        //设置	支付宝URL Schemes
        XPay.setAlipayScheme('ap2017102209453437')
    }


    wxPay = async () => {
        if (!appStateStore.isWXInstall) {
            alert('微信未安装');
            return;
        }
        const res = await fetch('http://wxpay.wxutil.com/pub_v2/app/app_pay.php');
        const params = await res.json();
        console.log('支付参数', params);
        const {partnerid, noncestr, timestamp, prepayid, sign} = params;
        XPay.wxPay({
                partnerId: partnerid,
                prepayId: prepayid,
                packageValue: params.package,
                nonceStr: noncestr,
                timeStamp: String(timestamp),
                sign: sign
            },
            res => {
                console.log('回调', res);
                const {errCode} = res;
                if (errCode === 0 || errCode === '0') {
                    Toast.success('充值成功')
                } else {
                    Toast.fail('充值失败')
                }
            })
    };

    aliPay = () => {
        XPay.alipay('app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D',
            res => {
                console.log('回调', res);
                const {result, memo, resultStatus} = res;
                if (resultStatus === '9000') {
                    Toast.success('充值成功')
                } else {
                    Toast.fail('充值失败')
                }
            })
    };

    render() {
        return (<BaseContainer title={'支付'}>
            <ScrollView style={{flex: 1}}>

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
