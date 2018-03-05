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
import {observer} from 'mobx-react'
import Spinkit from 'react-native-spinkit';

@observer
export class LoadingView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.store.isLoading) {
            return null;
        }
        return (
            <View style={style.container}>
                {this.props.loadingView ?
                    this.props.loadingView
                    :
                    <View style={style.loadingContainer}>
                        <Spinkit size={70} type={'9CubeGrid'}/>
                    </View>}
            </View>
        );
    }
}


const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

