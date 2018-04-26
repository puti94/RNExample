/**
 * User: puti.
 * Time: 2018/3/4 上午11:11.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 * 保存一些常量
 */
import {Platform} from 'react-native'
import {getBuildNumber} from 'react-native-device-info'

const debug = {
    TYPE: 'debug',
    CODE_PUSH_KEY: Platform.OS === 'ios' ?
        'GJf_gAWqYPwRg_jzh5YtT5qXWrwO06deade4-1f87-4d67-b199-fbf216d3f314' :
        'mENSa_WNjzP6HOMmq9ECK8lEr8qQ06deade4-1f87-4d67-b199-fbf216d3f314'
};

const staging = {
    TYPE: 'staging',
    CODE_PUSH_KEY: Platform.OS === 'ios' ?
        'GJf_gAWqYPwRg_jzh5YtT5qXWrwO06deade4-1f87-4d67-b199-fbf216d3f314' :
        'mENSa_WNjzP6HOMmq9ECK8lEr8qQ06deade4-1f87-4d67-b199-fbf216d3f314'
};

const release = {
    TYPE: 'release',
    CODE_PUSH_KEY: Platform.OS === 'ios' ?
        'gm-Zizg975oJztUDW4sgymi6_jm_06deade4-1f87-4d67-b199-fbf216d3f314' :
        'aSqHmmeAAa9an1VvrRjoA4vXkptm06deade4-1f87-4d67-b199-fbf216d3f314'
};

const common = {
    BUILD_NUMBER: getBuildNumber()
};
/**
 * 重新赋值
 */
export const reInit = () => {
    const divisive = __DEV__ ? debug : (global._STAGING_ ? staging : release);
    Object.assign(common, divisive)
};
export default common


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
