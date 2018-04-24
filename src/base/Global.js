/**
 * User: puti.
 * Time: 2018/4/14 下午6:36.
 * 设置一些全局变量，global需慎用
 */
import {Dimensions, Platform} from 'react-native'

const {width, height} = Dimensions.get('window');
global.SCREEN_WIDTH = width;
global.SCREEN_HEIGHT = height;
global._IOS_ = Platform.OS === 'ios';
global._ANDROID_ = Platform.OS === 'android';