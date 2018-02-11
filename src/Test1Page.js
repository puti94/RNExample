/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button, LayoutAnimation
} from 'react-native';

export default class Test1Page extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <Text>页面1</Text>

                <Button onPress={() => {
                    this.props.navigation.navigate('Test2Page', {params: '参数'})
                }} title={'跳转下一页'}/>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
