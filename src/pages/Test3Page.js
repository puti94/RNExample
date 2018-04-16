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
import {ListRow, Toast} from 'teaset'
import {observer} from 'mobx-react'
import {RouteHelper} from 'react-navigation-easy-helper'
import BaseContainer from "../components/BaseContainer";

@observer
export default class Test3Page extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Test3Page',
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillUnmount() {
        this.action && clearInterval(this.action)
    }


    render() {
        const {navigation} = this.props;
        return (
            <BaseContainer title={'Test3Page'}>
                <ScrollView style={styles.container}>
                    <ListRow title={'开启定时器 可见限制'} onPress={() => {
                        this.action && clearInterval(this.action);
                        this.action = setInterval(() => {
                            if (navigation.isFocused())
                                Toast.message('定时任务')
                        }, 2000)
                    }}/>
                    <ListRow title={'开启定时器 没有限制'} onPress={() => {
                        this.action && clearInterval(this.action)
                        this.action = setInterval(() => {
                            Toast.message('定时任务')
                        }, 2000)
                    }}/>
                    <ListRow title={'进入下一页'} onPress={() => {
                        RouteHelper.push('UserPage')
                    }}/>
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
