/**
 * User: puti.
 * Time: 2018/3/5 下午2:14.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */


import React, {Component, PureComponent} from 'react';
import {
    Text,
} from 'react-native';
import {AutoFlatList} from "./src/components/AutoFlatlist";

export default class TestComponent extends Component {

    render() {
        return <AutoFlatList
            style={{backgroundColor: 'white'}}
            ListHeaderComponent={<Text style={{fontSize: 30, backgroundColor: 'gray'}}>我是头部</Text>}
            ListFooterComponent={<MFooter/>}
            renderItem={({item}) => <Item item={item}/>}
            fetchData={(page) => new Promise((resolve, reject) => {
                setTimeout(() => {
                    let list = [];
                    for (let i = 0; i < (page === 20 ? 4 : 6); i++) {
                        list.push({title: `第${page}页，第${i}个`, id: '' + Date.now() + i})
                    }
                    if (page === 15) {
                        reject();
                    }
                    resolve(list)
                }, 1000)
            })}
            stickyHeaderIndices={[0]}
            ListLoadMoringComponent={<Text>正在加载更多</Text>}
            ListLoadMoredComponent={<Text style={{fontSize: 30}}>加载完成</Text>}
            ListNoMoreDataComponent={<Text>已经没有了</Text>}
            judgeNoMoreData={(newValue) => newValue.length < 5}
        />
    }
}

class MFooter extends PureComponent {

    render() {
        console.log('MFooter,render');
        return <Text style={{height: 100, backgroundColor: 'gray'}}>我是Footer</Text>
    }
}


class Item extends Component {

    render() {
        console.log('item,render');
        return <Text style={{height: 50}}>{this.props.item.title}</Text>
    }
}

