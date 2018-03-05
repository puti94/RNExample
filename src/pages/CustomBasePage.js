/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {ScrollView, View, ActivityIndicator, TouchableOpacity, Text} from 'react-native'
import {ListRow} from 'teaset'

@inject('baseStore')
@pageHelper()
@observer
export default class CustomBasePage extends Component {

    static  navigationOptions = ({navigation}) => ({
        title: '自定义加载用法'
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.store.loadData();
    }

    renderLoadingView() {
        return <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
        }}>
            <ActivityIndicator/>
        </View>
    };

    renderErrorView() {
        return <TouchableOpacity
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white'
            }}
            activeOpacity={1}
            onPress={() => {
                this.store.setLoading(true);
                setTimeout(() => {
                    this.store.setLoading(false)
                }, 2000)
            }}>
            <Text>发生错误了</Text>
            <Text>点击页面重新加载</Text>
        </TouchableOpacity>
    };

    render() {
        return (<ScrollView style={{flex: 1}}>
            <ListRow
                title="显示加载组件"
                onPress={() => {
                    this.store.setLoading(true);
                    setTimeout(() => {
                        this.store.setLoading(false)
                    }, 2000)
                }}
            />
            <ListRow
                title="显示错误组件"
                onPress={() => {
                    this.store.setError(true, '发生不明错误', () => {
                        this.store.loadData();
                    });
                }}
            />
        </ScrollView>);
    }

}
