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
import RouteUtilPage from './page/RouteUtilPage'
import GuidePage from './page/GuidePage'
import BasePage from './page/BasePage'
import SetPage from './page/SetPage'
import TeasetApp from '../node_modules/teaset/example/App'

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
        RouteUtilPage: {screen: RouteUtilPage},
        GuidePage: {screen: GuidePage},
        BasePage: {screen: BasePage},
        SetPage: {screen: SetPage},
        TeasetApp: {screen: pageHelper()(TeasetApp)},
    }, {
        initialRouteName: 'LaunchPage'
    }
);

