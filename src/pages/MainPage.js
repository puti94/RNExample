/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    BackHandler, View, ToastAndroid
} from 'react-native';
import {inject, observer} from 'mobx-react'
import {RouteHelper} from 'react-navigation-easy-helper'
import {TabView, Button} from "teaset";
import HomePage from './HomePage'
import {ShopCarPage} from './ShopCarPage'
import MinePage from "./MinePage";
import {ShoppingCarView} from 'react-native-addcarview'
import {images} from "../res";
import {checkNativeUpdate} from "../utils/UpdateUtils";

const titles = ['首页', '购物车', '我的'];

@inject('userStore', 'shopCar')
@observer
export default class MainPage extends Component {


    lastClickTime = 0;
    seleIndex = 0;

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackHander);
        checkNativeUpdate()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackHander)
    }


    render() {
        const {shopCar} = this.props;
        const {isArrayEmpty, data} = shopCar;
        return (
            <View style={{flex: 1}}>
                <TabView style={{flex: 1}} type='projector' activeIndex={this.state.activeIndex}
                         onChange={this.onTabChange}>
                    <TabView.Sheet
                        title='首页'
                        activeTitleStyle={{color: 'red'}}
                        icon={images.ic_home}
                    >
                        <HomePage/>

                    </TabView.Sheet>
                    <TabView.Sheet
                        title='购物车'
                        icon={images.ic_cart}
                        badge={isArrayEmpty ? null : data.length}
                    >
                        <ShopCarPage tabChange={this.onTabChange}/>
                    </TabView.Sheet>
                    <TabView.Sheet
                        title='我的'
                        icon={images.ic_mine}
                    >
                        <MinePage/>
                    </TabView.Sheet>
                </TabView>
                <ShoppingCarView/>
            </View>
        );
    }

    onTabChange = (index) => {
        this.setState({activeIndex: index})
    };


    onBackHander = () => {
        if (RouteHelper.routeStack.length === 1 && Date.now() - this.lastClickTime >= 2000) {
            ToastAndroid.show('再按一次退出', ToastAndroid.LONG);
            this.lastClickTime = Date.now();
            return true;
        }
        return false;
    };
}

@inject('shopCar')
@observer
class ObserverButton extends Component {

    render() {
        return this.props.shopCar.dataLength !== 0 ?
            <Button type={'link'} title={this.props.shopCar.isEditMode ? '完成' : '编辑'}
                    onPress={() => {
                        this.props.shopCar.reversalEdit()
                    }}/> : null;
    }
}