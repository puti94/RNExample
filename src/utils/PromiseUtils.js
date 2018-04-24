/**
 * User: puti.
 * Time: 2018/4/20 上午11:59.
 */

import {Platform, Alert} from 'react-native'
import Permissions from 'react-native-permissions';


/**
 * 检查权限
 * @param promise 权限
 * @returns {Promise<boolean|*>}
 */
export const checkPermission = async ({promise = 'camera'} = {}) => {
    try {
        const res = await Permissions.check(promise);
        console.log('check', res);
        return await decideAction(res, promise);
    } catch (e) {
        console.log('error', e);
        return false;
    }
};

const decideAction = async (res, promise) => {
    switch (res) {
        case 'authorized':
            return true;
        case 'denied':
        case 'restricted':
            const canOpen = await Permissions.canOpenSettings();
            if (canOpen && Platform.OS === 'ios') {
                await new Promise(resolve => {
                    Alert.alert('您已关闭此授权', '请前往设置开启权限', [
                        {
                            text: '立即前往',
                            onPress: () => resolve(Permissions.openSettings())
                        },
                        {text: '取消', onPress: () => resolve(false)}
                    ]);
                });
            }
            return false;
        case 'undetermined':
            const request = await Permissions.request(promise);
            console.log('request', request);
            return await decideAction(request, promise);
    }
};
;