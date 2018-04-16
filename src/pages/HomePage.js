/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';
import ListRow from "teaset/components/ListRow/ListRow";
import {NewsStore} from '../store/NewsStore'
import {toJS} from 'mobx'
import {BaseContainer} from "../components";
import {observer} from 'mobx-react'

@observer
export default class HomePage extends Component {

    store = new NewsStore();

    render() {
        return (
            <BaseContainer store={this.store} hideLeft title={'Home'} rightTitle={'哈'}>
                <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
                    <ListRow title={'重新刷新'} onPress={() => {
                        this.store.loadData();
                        console.log(toJS(this.store.data.tid));
                    }}/>
                    {this.store.data.tid && this.store.data.tid.map((item, index) => <Text
                        key={item.title}>{JSON.stringify(item)}</Text>)}
                </ScrollView>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
