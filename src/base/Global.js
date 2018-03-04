/**
 * User: puti.
 * Time: 2018/2/27 下午5:44.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {storage} from './Database';
import {Dimensions, PixelRatio, Platform} from 'react-native'
import {RouteHelper} from '../utils/RouteHelper'
import {Toast} from 'teaset'
import * as R from '../res/index'
import {pageHelper} from '../utils/index'
import {appTheme} from '../store/Theme'
import {inject, observer} from 'mobx-react'
import {observable, computed, autorun, action} from 'mobx'
const {width, height} = Dimensions.get('window');


const FontSize = (size) => {
    if (PixelRatio === 2) {
        // iphone 5s and older Androids
        if (width < 360) {
            return size * 0.95;
        }
        // iphone 5
        if (height < 667) {
            return size;
            // iphone 6-6s
        } else if (height >= 667 && height <= 735) {
            return size * 1.15;
        }
        // older phablets
        return size * 1.25;
    }
    if (PixelRatio === 3) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (width <= 360) {
            return size;
        }
        // Catch other weird android width sizings
        if (height < 667) {
            return size * 1.15;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (height >= 667 && height <= 735) {
            return size * 1.2;
        }
        // catch larger devices
        // ie iphone 6s plus / 7 plus / mi note 等等
        return size * 1.27;
    }
    if (PixelRatio === 3.5) {
        // catch Android font scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (width <= 360) {
            return size;
            // Catch other smaller android height sizings
        }
        if (height < 667) {
            return size * 1.20;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (height >= 667 && height <= 735) {
            return size * 1.25;
        }
        // catch larger phablet devices
        return size * 1.40;
    }
    // if older device ie pixelRatio !== 2 || 3 || 3.5
    return size;
};


/**
 *全局变量统一管理
 */
global.Toast = Toast;
global.storage = storage;

global.RouteHelper = RouteHelper;
global.R = R;
global.FontSize = FontSize;
global.pageHelper = pageHelper;
global.observable = observable;
global.computed = computed;
global.action = action;
global.observer = observer;
global.inject = inject;
global.autorun = autorun;
global.SCREEN_WIDTH = width;
global.SCREEN_HEIGHT = height;
global._IOS_ = Platform.OS === 'ios';
global._ANDROID_ = Platform.OS === 'android';
global.appTheme = appTheme;