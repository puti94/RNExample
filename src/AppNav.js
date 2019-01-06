/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react'
import {Platform} from 'react-native'
import {CardStackStyleInterpolator, StackNavigator, NavigationActions} from 'react-navigation'
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";

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
import TeasetApp from '../node_modules/teaset/example/App'
import {configRoute} from 'react-navigation-easy-helper'
import NotesPage from "./pages/NotesPage";
import StateImagePage from "./pages/StateImagePage";
import WebPage from "./pages/WebPage";
import CustomNativeUIPage from "./pages/CustomNativeUIPage";
import PayPage from "./pages/PayPage";
import ListPage from "./pages/ListPage";

const configStackRouter = function (StackNavigator) {
    const oldGetStateForAction = StackNavigator.router.getStateForAction;
    StackNavigator.router.getStateForAction = function (action, state) {
        console.log('action', action, 'state', state);
        if (action.type === NavigationActions.NAVIGATE) {
            console.log('导航事件')
        }
        if (action.type === NavigationActions.PUSH) {
            console.log('导航事件')
        }
        if (action.type === NavigationActions.PUSH) {
            console.log('导航事件')
        }
        return oldGetStateForAction(action, state);
    };
    return StackNavigator;
};
const prefix = Platform.OS === 'android' ? 'example://example/' : 'example://';
const Navigator = configStackRouter(StackNavigator(
    configRoute({
        LaunchPage: {screen: LaunchPage},
        MainPage: {screen: MainPage},
        Test2Page: {screen: Test2Page},
        Test3Page: {screen: Test3Page},
        Test4Page: {screen: Test4Page},
        LoginPage: {screen: LoginPage},
        UtilsPage: {screen: UtilsPage},
        UserPage: {screen: UserPage},
        ListPage: {screen: ListPage},
        RouteUtilPage: {screen: RouteUtilPage},
        GuidePage: {screen: GuidePage},
        BasePage: {screen: BasePage},
        SetPage: {screen: SetPage, path: 'set/:name'},
        NotesPage: {screen: NotesPage},
        WebPage: {screen: WebPage},
        PayPage: {screen: PayPage, path: 'pay/:pay'},
        StateImagePage: {screen: StateImagePage},
        CustomNativeUIPage: {screen: CustomNativeUIPage},
        TeasetApp: {
            screen: TeasetApp, navigationOptions: {
                header: null
            }
        },
    }), {
        initialRouteName: 'LaunchPage',
        navigationOptions: {
            header: null
        },
        transitionConfig: () => ({
            /**
             * 修改切换动画。
             * forVertical
             * forHorizontal
             * forFadeFromBottomAndroid
             * forFade
             */
            screenInterpolator: CardStackStyleInterpolator.forHorizontal
        })
    }
));

export const AppNavigator = () => <Navigator uriPrefix={prefix}/>