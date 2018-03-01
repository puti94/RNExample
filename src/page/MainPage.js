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
import {inject, observer} from 'mobx-react'
import {routeHelper} from '../utils/index'
import {RouteHelper} from '../utils/RouteHelper'

// @inject('userStore', 'baseStore', 'themeStore')
@routeHelper
// @observer
export default class MainPage extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'MainPage',
    });

    constructor(props) {
        super(props);
        console.log(this)
    }

    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <Text >页面1</Text>

                <Button onPress={() => {
                    RouteHelper.navigate('UserPage')
                }} title={'跳转下一页'}/>

                <Button onPress={() => {

                }} title={'切换'}/>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    view: {
        height: 60,
        backgroundColor: 'gray',
        marginTop: 10
    }
});
