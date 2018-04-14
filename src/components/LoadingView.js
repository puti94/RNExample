/**
 * User: puti.
 * Time: 2018/1/14 上午9:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Spinkit from 'react-native-spinkit';

export class LoadingView extends Component {

    render() {
        return (
            <View style={style.container}>
                <View style={style.loadingContainer}>
                    <Spinkit size={70} type={'9CubeGrid'}/>
                </View>
            </View>
        );
    }
}


const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

