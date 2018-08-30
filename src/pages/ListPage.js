/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';

import {AutoFlatList} from "../components";

import {BaseContainer} from "../components";
import {Text, TouchableOpacity, View} from "react-native";


export default class ListPage extends Component {

    constructor(props) {
        super(props);
    }

    _fetchData = (page) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(new Array(10)), 1000)
        });
    };

    _renderItem = ({item, index}) => <Item item={item} index={index}/>;

    render() {
        return (<BaseContainer title={'列表页'}>
            <AutoFlatList
                fetchData={this._fetchData}
                renderItem={this._renderItem}/>
        </BaseContainer>);
    }
}

class Item extends Component {
    render() {
        const {item, index} = this.props;
        return <TouchableOpacity style={{
            height: 100,
            backgroundColor: 'blue',
            marginBottom: 5,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text>第{index}页</Text>
        </TouchableOpacity>
    }
}