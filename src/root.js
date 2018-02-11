/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation'
import Test1Page from './Test1Page'
import Test2Page from './Test2Page'
import Test3Page from './Test3Page'
import Test4Page from './Test4Page'
import {route, newRoute} from './base/route'
export const AppNavigator = StackNavigator(
    {
        Test1Page: {screen: Test1Page},
        Test2Page: {screen: newRoute(Test2Page)},
        Test3Page: {screen: Test3Page},
        Test4Page: {screen: Test4Page},
    }
);
// export const AppNavigator = StackNavigator(
//     {
//         Test1Page: {screen: route(Test1Page)},
//         Test2Page: {screen: route(Test2Page)},
//         Test3Page: {screen: route(Test3Page)},
//         Test4Page: {screen: route(Test4Page)},
//     }
// );

