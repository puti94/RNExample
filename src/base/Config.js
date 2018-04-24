/**
 * User: puti.
 * Time: 2018/2/28 上午9:26.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {Toast, Label, ListRow, Button} from 'teaset';
import {TextInput, Text, TouchableOpacity, Platform, StatusBar} from 'react-native'
import {configure} from 'mobx'
import {addCustomProps} from '../utils'

/**
 * 更改三个文件控件字体大小随系统改变的属性,如果想更改其它第三方的默认属性也可以这样改
 */
addCustomProps(Text, {allowFontScaling: false});
addCustomProps(TextInput, {allowFontScaling: false});
// addCustomProps(Label, {allowFontScaling: false});
addCustomProps(TouchableOpacity, {activeOpacity: 0.7});
// addCustomProps(ListRow, {activeOpacity: 0.7});
// addCustomProps(Button, {activeOpacity: 0.7});

if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent')
}
/**
 * 这里放置一些全局的不变的配置项
 */
//开启mobx严格模式
configure({enforceActions: true});

//非开发模式下关闭日志打印
if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        }
    };
}

/**
 * 由于teaset的Toast组件弹出的时候不会隐藏上一个，视图叠加起来效果不太好，更改默认的show方法
 */
let key;
const show = Toast.show.bind(Toast);
Toast.show = (options) => {
    Toast.hide(key);
    key = show(options);
    return key;
};
