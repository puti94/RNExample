/**
 * User: puti.
 * Time: 2018/2/27 下午5:44.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {storage} from './database';
import {Dimensions} from 'react-native'
import {RouteHelper} from '../utils/RouteHelper'
const {width, height} = Dimensions.get('window');


global.storage = storage;
global.screenWidth = width;
global.screenHeight = height;
global.RouteHelper = RouteHelper;