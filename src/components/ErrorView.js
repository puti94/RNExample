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

export class ErrorView extends Component {
    static propTypes = {
        btnTitle: PropTypes.string,
        onPress: PropTypes.func,
        btnStyle: PropTypes.any,
        errorText: PropTypes.string,
        textStyle: PropTypes.any
    };

    static defaultProps = {
        btnTitle: '重新加载',
        errorText: '网络连接失败',
    };

    render() {
        const {onPress, btnStyle, errorText, btnTitle, textStyle} = this.props;
        return <View style={styles.container}>
            <View style={styles.errorContainer}>
                <Text style={textStyle}>{errorText}</Text>
                <TouchableOpacity
                    style={[styles.btn_style, btnStyle]}
                    onPress={onPress}>
                    <Text>{btnTitle}</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
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

