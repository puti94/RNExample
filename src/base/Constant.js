/**
 * User: puti.
 * Time: 2018/3/4 上午11:11.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 * 保存一些常量
 */
import {Platform, NativeModules} from 'react-native'
import {getBuildNumber, getVersion} from 'react-native-device-info'
//从原生导出常量
const nativeConstant = NativeModules.nativeConstant;
//构建类型
const BUILD_TYPE = nativeConstant.BUILD_TYPES;

const debug = {
    TEST_TITLE: 'debug模式',
    TYPE: 'debug',
    CODE_PUSH_KEY: Platform.OS === 'ios' ?
        'GJf_gAWqYPwRg_jzh5YtT5qXWrwO06deade4-1f87-4d67-b199-fbf216d3f314' :
        'mENSa_WNjzP6HOMmq9ECK8lEr8qQ06deade4-1f87-4d67-b199-fbf216d3f314'
};

const staging = {
    TEST_TITLE: 'staging模式',
    TYPE: 'staging',
    CODE_PUSH_KEY: Platform.OS === 'ios' ?
        'GJf_gAWqYPwRg_jzh5YtT5qXWrwO06deade4-1f87-4d67-b199-fbf216d3f314' :
        'mENSa_WNjzP6HOMmq9ECK8lEr8qQ06deade4-1f87-4d67-b199-fbf216d3f314'
};

const release = {
    TEST_TITLE: 'release模式',
    TYPE: 'release',
    CODE_PUSH_KEY: Platform.OS === 'ios' ?
        'gm-Zizg975oJztUDW4sgymi6_jm_06deade4-1f87-4d67-b199-fbf216d3f314' :
        'aSqHmmeAAa9an1VvrRjoA4vXkptm06deade4-1f87-4d67-b199-fbf216d3f314'
};

const common = {
    BUILD_TYPE: BUILD_TYPE,
    VERSION: getVersion(),
    BUILD_NUMBER: getBuildNumber(),
    //是否是测试模式
    _STAGING_: BUILD_TYPE === 'STAGING',
    //是否是正式模式
    _RELEASE_: BUILD_TYPE === 'RELEASE',
};

const divisive = __DEV__ ? debug : (common._STAGING_ ? staging : release);
export default {
    ...common,
    ...divisive
}


//网易新闻最新新闻列表
export const WANGYINEWS = {
    url: 'https://c.m.163.com/recommend/getSubDocPic',
    params: {
        from: 'toutiao',
        prog: 'Rpic2',
        devId: '1UbcrWtzxBDULoGcTB1hJexA9PUp90A1Y7H508AYIe7shny%2BRe2OunGz5qjWxQeW',
        version: '32.0',
        spever: 'false',
        net: 'wifi',
        lat: 'uUQaeM4SZQ49aiKb64rOyQ%3D%3D',
        lon: 'RCWxwvYCYWkgmT7G9bPeeA%3D%3D',
        ts: Date.now(),
        sign: 'G33LNmnOoSLg8cNxDc8oRe5DN0yFAQZvZ7%2Bpxyt0PBl48ErR02zJ6/KXOnxX046I',
        encryption: '1',
        canal: 'appstore',
        offset: '0',
        size: '20',
        fn: '5',
        spestr: 'shortnews'
    }
};
