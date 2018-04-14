/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    FlatList, Image,
    StyleSheet,
    Text,
    TouchableOpacity, View
} from 'react-native';

import {Checkbox, Stepper} from "teaset";
import ListRow from "teaset/components/ListRow/ListRow";
import {startAddShopAnim} from 'react-native-addcarview'
import {inject, observer} from 'mobx-react'
import {images} from "../res";
import {Theme} from "../store";

@inject('shopCar')
@observer
export class ShopCarPage extends Component {

    renderItem(item) {
        return <ShopCarItem item={item}/>
    };

    render() {
        return (
            <View style={styles.container}>
                <ListRow ref={'view'} title={'添加商品'} onPress={() => {

                    startAddShopAnim(<Image style={{height: 50, width: 50, margin: 10, borderRadius: 20}}
                                            source={images.ic_shop_img}/>,
                        {
                            beforeView: this.refs['view'],
                            afterValue: {
                                x: SCREEN_WIDTH / 2 - 25, y: SCREEN_HEIGHT - 110
                            },
                            beforeValue: {
                                x: 10,
                                y: 0
                            },
                            duration: 1000,
                            endRotateZ: 1440,
                            endScale: 0.1,
                            callBack: () => {
                                this.props.shopCar.addShop({
                                    number: 1,
                                    title: `商品名称${this.props.shopCar.dataLength}`,
                                    price: (Math.random() * 10000).toFixed(2),
                                    img: 'http://www.xxxx.com/thumb/xx.png',
                                    id: `${Date.now()}${parseInt(Math.random() * 100)}`
                                })
                            }
                        });


                }}/>
                {this.props.shopCar.dataLength !== 0 ? <View style={styles.container}>
                    <FlatList
                        style={{flex: 1}}
                        data={this.props.shopCar.data.slice()}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => this.renderItem(item)}
                    />
                    <BottomView/>
                </View> : <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                    <Text style={{fontSize: 18, color: 'black', marginTop: 15}}>购物车没有商品</Text>
                    <TouchableOpacity
                        style={{
                            marginTop: 20,
                            backgroundColor: Theme.baseColor,
                            borderRadius: 5,
                            height: 30,
                            width: 100,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            this.props.tabChange && this.props.tabChange(0)
                        }}>
                        <Text
                            style={{color: 'white'}}>前往首页</Text>
                    </TouchableOpacity>
                </View>}
            </View>
        );
    }
}

@inject('shopCar')
@observer
class ShopCarItem extends Component {

    render() {
        let item = this.props.item;
        return <View
            style={{
                height: 80,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 1,
                backgroundColor: 'white',
                paddingLeft: 10
            }}>

            <Checkbox checkedIconStyle={{tintColor: Theme.baseColor}} size={'lg'}
                      checked={item.check || this.props.shopCar.isAllCheck}
                      onChange={check => item.setCheck(check, this.props.shopCar)}/>
            <Image style={{height: 50, width: 50, margin: 10}} source={images.ic_shop_img}/>
            <View style={{flex: 1, height: 60, justifyContent: 'space-around'}}>

                <Text numberOfLines={1} style={{fontSize: 14}}>{item.title}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 12, flex: 1}}>商品价格:¥{item.price}</Text>
                    <Stepper style={{marginRight: 5}} max={99} min={1} defaultValue={item.number}
                             onChange={(value) => {
                                 item.setNumber(value)
                             }}/>
                </View>
                <Text numberOfLines={1} style={{
                    fontSize: 12
                }}>总价格:¥{(item.price * item.number).toFixed(2)}</Text>
            </View>

            {this.props.shopCar.isEditMode ?
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        this.props.shopCar.deleShop(item)
                    }}
                >
                    <Text style={{width: 20, height: 20, fontSize: 20}}>X</Text>
                </TouchableOpacity> : null}

        </View>
    }

}


@inject('shopCar')
@observer
class BottomView extends Component {
    render() {
        return (<View style={{
            flexDirection: 'row', height: 40, alignItems: 'center',
            paddingLeft: 10, borderTopColor: Theme.line, borderTopWidth: 1
        }}>
            <Checkbox
                checkedIconStyle={{tintColor: Theme.baseColor}} size={'lg'}
                checked={this.props.shopCar.isAllCheck} title={'全选'}
                onChange={(check) => this.props.shopCar.setAllCheck(check)}/>

            <Text
                style={{
                    color: 'black',
                    marginHorizontal: 5,
                    flex: 1
                }}>合计:<Text style={{color: Theme.baseColor}}>¥{this.props.shopCar.allPrice}</Text></Text>
            <TouchableOpacity style={{
                width: 80,
                height: '100%',
                backgroundColor: this.props.shopCar.isEditMode ? 'red' : Theme.baseColor,
                alignItems: 'center',
                justifyContent: 'center'
            }} onPress={() => {
                if (this.props.shopCar.isEditMode) {
                    this.props.shopCar.filterCheckShop();
                    return;
                }
                alert('结算')
            }}>
                <Text style={{
                    color: 'white',
                    fontSize: 13
                }}>{`${this.props.shopCar.isEditMode ? '删除' : '结算'}:(${this.props.shopCar.checkNumber})`}</Text>
            </TouchableOpacity>
        </View>)
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});