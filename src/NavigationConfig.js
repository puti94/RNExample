/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation'
import MainPage from './pages/MainPage'
import Test2Page from './pages/Test2Page'
import Test3Page from './pages/Test3Page'
import Test4Page from './pages/Test4Page'
import LoginPage from './pages/LoginPage'
import LaunchPage from './pages/LaunchPage'
import UserPage from './pages/UserPage'
import UtilsPage from './pages/UtilsPage'
import RouteUtilPage from './pages/RouteUtilPage'
import GuidePage from './pages/GuidePage'
import BasePage from './pages/BasePage'
import SetPage from './pages/SetPage'
import CustomBasePage from './pages/CustomBasePage'
import TeasetApp from '../node_modules/teaset/example/App'
import {addToRoute} from './utils/PageUtils'

export const AppNavigator = StackNavigator(
    ConfigRouteHelper({
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
        CustomBasePage: {screen: CustomBasePage},
        TeasetApp: {screen: pageHelper()(TeasetApp)},
    }), {
        initialRouteName: 'LaunchPage'
    }
);

function ConfigRouteHelper(routeConfig) {
    for (let name in routeConfig) {
        let Component = routeConfig[name].screen;
        routeConfig[name].screen = addToRoute(Component)
    }
    return routeConfig
}