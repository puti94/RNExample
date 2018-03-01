/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation'
import MainPage from './page/MainPage'
import Test2Page from './page/Test2Page'
import Test3Page from './page/Test3Page'
import Test4Page from './page/Test4Page'
import LoginPage from './page/LoginPage'
import LaunchPage from './page/LaunchPage'
import UserPage from './page/UserPage'
import UtilsPage from './page/UtilsPage'

export const AppNavigator = StackNavigator(
    {
        LaunchPage: {screen: LaunchPage},
        MainPage: {screen: MainPage},
        Test2Page: {screen: Test2Page},
        Test3Page: {screen: Test3Page},
        Test4Page: {screen: Test4Page},
        LoginPage: {screen: LoginPage},
        UtilsPage: {screen: UtilsPage},
        UserPage: {screen: UserPage},
    }
);
// export const AppNavigator = StackNavigator(
//     {
//         MainPage: {screen: route(MainPage)},
//         UserPage: {screen: route(UserPage)},
//         UtilsPage: {screen: route(UtilsPage)},
//         Test4Page: {screen: route(Test4Page)},
//     }
// );

