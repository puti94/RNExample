/**
 * User: puti.
 * Time: 2018/2/28 上午9:26.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {Toast, Label} from 'teaset';
import {TextInput, Text} from 'react-native'

/**
 * 这里放置一些全局的不变的配置项
 */


/**
 * 更改三个文件控件字体大小随系统改变的属性,如果想更改其它第三方的默认属性也可以这样改
 */
Text.prototype.constructor.defaultProps.allowFontScaling = false;
TextInput.prototype.constructor.defaultProps.allowFontScaling = false;
Label.prototype.constructor.defaultProps.allowFontScaling = false;

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
