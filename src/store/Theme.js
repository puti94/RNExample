/**
 * User: puti.
 * Time: 2018/2/27 上午9:53.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {observable, action} from 'mobx'
import {Platform, StatusBar, DeviceInfo} from 'react-native'

export const Theme = {
    //主题颜色
    @observable  baseColor: '#E6C3A1',
    line: '#CCCCCC',
    backgroundColor: '#FBFBFB',
    navigationTitle: '#363636',
    title: '#2A2A2A',
    content: '#7A7A7A',
    hint: '#dedede',
    //标签色
    primary: '#006DCC',
    //信息颜色
    info: '#49AFCD',
    //成功色
    success: '#5BB75B',
    //警告色
    warning: '#FAA732',
    //危险色
    danger: '#DA4F49',
    //链接颜色
    link: '#0088CC',
    //禁用颜色
    disabled: '#EFF3F8',
    @action
    setColors: colors => Object.assign(Theme, colors),


    isIPhoneX: DeviceInfo.isIPhoneX_deprecated,

    get statusBarHeight() {
        if (Theme.isIPhoneX) {
            return 44;
        }
        if (Platform.OS === 'android') {
            if (Platform.Version < 21) return 0;
            return StatusBar.currentHeight;
        }
        return 20;
    }
};
