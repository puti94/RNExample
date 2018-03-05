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
    ScrollView,
    StatusBar,
    ImageBackground
} from 'react-native';

@inject('userStore')
@pageHelper(true, false)
@observer
export default class MinePage extends Component {


    render() {
        return (
            <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
                <ImageBackground style={{height: 200}} source={R.images.ic_photo3}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
