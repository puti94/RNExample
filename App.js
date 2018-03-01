/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, Text, View, AsyncStorage} from 'react-native'
import {AppNavigator} from "./src/root";
import {Provider, observer} from 'mobx-react'
import {useStrict} from 'mobx'
import {BaseAppStore} from './src/store/index'
import {RouteHelper} from './src/utils/index'


useStrict(true);


const store = new BaseAppStore();
const needLoginPage = ['UserPage'];

//设置路由拦截器,项目所有跳转方法推荐都用RouteHelper.navigate()
RouteHelper.routeInterceptor = (routeName, params) => {
    if (!store.userStore.isLogin && needLoginPage.indexOf(routeName) !== -1) {
        RouteHelper.navigate('LoginPage', {
            routeName,
            params
        });
        return false;
    }
    console.log(store, params);
    return true
};


export default class App extends Component<Props> {

    render() {
        return <Provider {...store} baseStore={store}>
            <View style={{flex: 1}}>
                <AppNavigator/>
                {__DEV__ ? <RouteMessage/> : null}
            </View>
        </Provider>


    }
}

@observer
class RouteMessage extends Component {
    render() {
        return <FlatList
            style={{position: 'absolute', width: 100, bottom: 0, height: 300, opacity: 0.7, backgroundColor: 'gray'}}
            data={RouteHelper.routeStack.slice()}
            keyExtractor={(item, i) => item.key}
            renderItem={({item}) => <Text
                style={{color: 'white'}}
                onPress={() => RouteHelper.goBackto(item.routeName)}>{item.routeName}</Text>}
        />
    }
}