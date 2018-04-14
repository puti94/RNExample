/**
 * User: puti.
 * Time: 2018/2/27 上午9:53.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {observable} from 'mobx'
import {Platform, StatusBar, DeviceInfo} from 'react-native'

export const Theme = {
    //主题颜色
    @observable  baseColor: '#E6C3A1',
    line: '#cccccc',
    backgroundColor: '#f5f5f5',
    isIPhoneX: DeviceInfo.isIPhoneX_deprecated,
    get statusBarHeight() {
        if (Theme.isIPhoneX) {
            return 44;
        }
        if (Platform.OS === 'android') {
            return StatusBar.currentHeight;
        }
        return 20;
    }
}
