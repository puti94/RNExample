/**
 * User: puti.
 * Time: 2018/1/27 下午9:55.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react'
/**
 * 默认加载视图,如果想自定义加载视图可继承此类重载renderErrorView()方法并声明成observer。
 */
@observer
export class LoadingView extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired
    };

    renderLoadingView() {
        return (<View style={style.container}>
            <View style={{
                width: 80,
                height: 80,
                backgroundColor: '#0009',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size={'large'}/>
                <Text numberOfLines={2} style={{color: 'white'}}>{this.props.store.loadingMsg}</Text>
            </View>
        </View>)
    }


    render() {
        return this.props.store.isLoading ? this.renderLoadingView() : null;
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#0005'
    },
    btn_style: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'red'
    }
});

