/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {ScrollView} from 'react-native'
import {ListRow} from 'teaset'
import BaseContainer from "../components/BaseContainer";
import {BasePageStore} from "../store/BasePageStore";

export default class BasePage extends Component {

    static  navigationOptions = ({navigation}) => ({
        title: 'BaseContainer用法'
    });

    store = new BasePageStore();

    componentDidMount() {
        this.store.loadData();
    }

    render() {
        return (<BaseContainer store={this.store} title={'BaseContainer用法'}>
            <ScrollView style={{flex: 1}}>
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
            </ScrollView>
        </BaseContainer>);
    }

}
