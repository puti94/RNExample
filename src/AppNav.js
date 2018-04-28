/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import TeasetApp from '../node_modules/teaset/example/App'
import {configRoute} from 'react-navigation-easy-helper'
import NotesPage from "./pages/NotesPage";
import StateImagePage from "./pages/StateImagePage";
import WebPage from "./pages/WebPage";
import CustomNativeUIPage from "./pages/CustomNativeUIPage";
import PayPage from "./pages/PayPage";


export const AppNavigator = StackNavigator(
    configRoute({
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
        NotesPage: {screen: NotesPage},
        WebPage: {screen: WebPage},
        PayPage: {screen: PayPage},
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
        }
    }
);
