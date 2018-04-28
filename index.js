import {AppRegistry} from 'react-native';
import './src/base/Config';
import './src/base/Global';
import SplashScreen from 'react-native-splash-screen'

SplashScreen.hide();
import App from './App';
import TestPage from "./TestLifeCycle";

AppRegistry.registerComponent('RNExample', () => App);
