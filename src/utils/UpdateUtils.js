/**
 * User: puti.
 * Time: 2018/4/19 上午12:16.
 */

import CodePush from 'react-native-code-push'
import C from '../base/Constant'

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