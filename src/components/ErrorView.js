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
    TouchableOpacity,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react'
import {appTheme} from '../store/Theme'

/**
 * 默认错误视图,如果想自定义错误视图可继承此类重载renderErrorView()方法并声明成observer。
 */
@observer
export class ErrorView extends Component {
    static propTypes = {
        btnTitle: PropTypes.string,
        onPress: PropTypes.func,
        store: PropTypes.object.isRequired,
        errorView: PropTypes.object
    };

    static defaultProps = {
        btnTitle: '重新加载'
    };

    render() {
        if (!this.props.store.isError) {
            return null;
        }
        return <View style={styles.container}>
            {this.props.errorView ?
                this.props.errorView
                :
                <View style={styles.errorContainer}>
                    <Text>{this.props.store.errorMsg}</Text>
                    <TouchableOpacity style={[styles.btn_style, {borderColor: appTheme.themeColor}]}
                                      onPress={() => {
                                          this.props.store.errorPress();
                                          // if (this.props.onPress) {
                                          //     this.props.onPress()
                                          // } else {
                                          //
                                          // }
                                      }}>
                        <Text>{this.props.btnTitle}</Text>
                    </TouchableOpacity>
                </View>}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    btn_style: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 3,
        borderWidth: 1,

    },
    errorContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

