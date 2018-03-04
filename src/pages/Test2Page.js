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
    Button,
    ScrollView
} from 'react-native';
import {pageHelper} from "../utils/index";
import {ListRow} from 'teaset'

@pageHelper()
export default class Test2Page extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Test2Page',
    });

    constructor(props) {
        super(props);
        console.log('constructor', this)
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>页面2</Text>
                <ListRow title={'返回前两页 pop(number)'} onPress={() => {
                    RouteHelper.pop(2)
                }}/>
                <ListRow title={'返回指定页 goBack(routeName) success'} onPress={() => {
                    if (!RouteHelper.goBackTo('LaunchPage')) {
                        Toast.fail('返回失败')
                    }
                }}/>
                <ListRow title={'返回指定页 goBack(routeName) fail'} onPress={() => {
                    if (!RouteHelper.goBackTo('MainPage')) {
                        Toast.fail('返回失败')
                    }
                }}/>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
