/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    ImageBackground
} from 'react-native';
import {images} from "../res";

export default class MinePage extends Component {

    render() {
        return (
            <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
                <ImageBackground style={{height: 200}} source={images.ic_photo3}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
