/**
 * User: puti.
 * Time: 2018/4/19 上午12:16.
 */
import {Platform, Alert} from 'react-native'
import CodePush from 'react-native-code-push'
import C from '../base/Constant'
import {upgrade, openAPPStore} from 'react-native-app-upgrade'

/**
 * codepush检查更新
 * @returns {Promise<void>}
 */
export const codePushCheckForUpdate = async () => {

    try {
        const message = await  CodePush.checkForUpdate(C.CODE_PUSH_KEY);
        if (message) {
            const {
                appVersion,
                deploymentKey,
                description,
                failedInstall,
                isFirstRun,
                isMandatory,
                isPending,
                label,
                packageHash,
                packageSize,
                download,
                downloadUrl
            } = message;
            console.log('size', packageSize);
            CodePush.sync(
                {
                    deploymentKey: C.CODE_PUSH_KEY,
                    installMode: CodePush.InstallMode.IMMEDIATE,
                    updateDialog: {
                        appendReleaseDescription: true,//是否显示更新description，默认为false
                        descriptionPrefix: "更新内容：",//更新说明的前缀。 默认是” Description:
                        mandatoryContinueButtonLabel: "立即更新",//强制更新的按钮文字，默认为continue
                        mandatoryUpdateMessage: "",//- 强制更新时，更新通知. Defaults to “An update is available that must be installed.”.
                        optionalIgnoreButtonLabel: '稍后',//非强制更新时，取消按钮文字,默认是ignore
                        optionalInstallButtonLabel: '后台更新',//非强制更新时，确认文字. Defaults to “Install”
                        optionalUpdateMessage: '有新版本了，是否更新？',//非强制更新时，更新通知. Defaults to “An update is available. Would you like to install it?”.
                        title: '更新提示'//要显示的更新通知的标题. Defaults to “Update available”.
                    }
                },
                state => console.log('code-push-state', state),
                progress => console.log('code-push-progress', progress))
        } else {
            CodePush.sync();//就算没有更新也需要调用一次，不然会执行回滚
            if (__DEV__) {
                alert('code-push没有新版')
            }
        }
    } catch (e) {
        console.log('checkForUpdate--error', e)
    }

};

/**
 * 检测更新
 * @returns {Promise<void>}
 */
export const checkNativeUpdate = async () => {
    //模拟服务器放回结果
    const result = await new Promise((resolve, reject) => {
        setTimeout(() => resolve({
            apkUrl: 'http://ofgkyri4t.bkt.clouddn.com/app-release.apk',
            versionCode: 2,
            description: '我是更新信息',
            appId: '414478124'
        }), 2000)
    });
    //对比服务器
    if (C.BUILD_NUMBER < result.versionCode) {
        Alert.alert('有新版本',
            result.description,
            [{
                text: '取消', type: 'cancel'
            }, {
                text: Platform.OS === 'ios' ? '立即前往' : '立即更新',
                onPress: () => {
                    if (Platform.OS === 'ios') {
                        openAPPStore(result.appId)
                        // upgrade(result.appId, alert);
                    } else {
                        upgrade(result.apkUrl, progress => console.log('下载进度', progress + '%'))
                    }
                }
            }]);
    } else {
        await  codePushCheckForUpdate()
    }

};