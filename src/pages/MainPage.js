/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    Text,
    BackHandler
} from 'react-native';
import {inject, observer} from 'mobx-react'
import {pageHelper} from '../utils/index'
import {RouteHelper} from '../utils/RouteHelper'
import {TabView, Button} from "teaset";
import HomePage from './HomePage'
import {ShopCarPage} from './ShopCarPage'

const titles = ['首页', '购物车', '我的'];

@inject('userStore', 'baseStore', 'shopCar')
@pageHelper()
@observer
export default class MainPage extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params ? navigation.state.params.title : '首页',
        headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
    });

    lastClickTime = 0;
    seleIndex = 0;

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackHander);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackHander)
    }


    render() {
        return (
            <TabView style={{flex: 1}} type='projector' onChange={this.onTabChange}>
                <TabView.Sheet
                    title='首页'
                    activeTitleStyle={{color: 'red'}}
                    icon={R.images.ic_home}
                >
                    <HomePage/>
                </TabView.Sheet>
                <TabView.Sheet
                    title='购物车'
                    icon={R.images.ic_cart}
                >
                    <ShopCarPage tabChange={this.onTabChange}/>
                </TabView.Sheet>
                <TabView.Sheet
                    title='我的'
                    icon={R.images.ic_mine}
                >
                    <Text>首页</Text>
                </TabView.Sheet>
            </TabView>
        );
    }

    onTabChange = (index) => {
        this.seleIndex = index;
        this.props.navigation.setParams({
            title: titles[index],
            headerRight: this.renderHeaderRight()
        })


    };


    renderHeaderRight = () => {
        switch (this.seleIndex) {
            case 0:
                return null;
            case 1:
                return <ObserverButton/>;
            case 2:
                return <Button type={'link'} title={'设置'} onPress={() => {
                    RouteHelper.push('SetPage')
                }}/>;
            default:
                return null;
        }
    };


    onBackHander = () => {
        if (RouteHelper.routeStack.length === 1 && Date.now() - this.lastClickTime >= 2000) {
            Toast.message('再按一次退出');
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