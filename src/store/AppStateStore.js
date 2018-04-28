/**
 * User: puti.
 * Time: 2018/3/3 下午9:36.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import * as CacheManager from 'react-native-http-cache'
import {StringUtils} from '../utils/index'
import {Platform, Linking} from 'react-native'
import {LoadingUtils} from '../utils/index'
import DeviceInfo from 'react-native-device-info';
import {observable, action} from 'mobx'

class AppStateStore {

    @observable
    cacheSize = '0KB';
    isQQInstall = true;
    isWXInstall = true;
    isSinaInstall = true;
    apiLevel = DeviceInfo.getAPILevel();
    applicationName = DeviceInfo.getApplicationName();
    brand = DeviceInfo.getBrand();
    buildNumber = DeviceInfo.getBuildNumber();
    bundleId = DeviceInfo.getBundleId();
    carrier = DeviceInfo.getCarrier();
    deviceCountry = DeviceInfo.getDeviceCountry();
    deviceId = DeviceInfo.getDeviceId();
    deviceLocale = DeviceInfo.getDeviceLocale();
    deviceName = DeviceInfo.getDeviceName();
    firstInstallTime = DeviceInfo.getFirstInstallTime();
    fontScale = DeviceInfo.getFontScale();
    freeDiskStorage = DeviceInfo.getFreeDiskStorage();
    iPAddress = Platform.OS === 'android' ? DeviceInfo.getIPAddress() : null;
    instanceID = DeviceInfo.getInstanceID();
    lastUpdateTime = DeviceInfo.getLastUpdateTime();
    manufacturer = DeviceInfo.getManufacturer();
    maxMemory = DeviceInfo.getMaxMemory();
    phoneNumber = DeviceInfo.getPhoneNumber();
    model = DeviceInfo.getModel();
    readableVersion = DeviceInfo.getReadableVersion();
    serialNumber = DeviceInfo.getSerialNumber();
    systemVersion = DeviceInfo.getSystemVersion();
    timezone = DeviceInfo.getTimezone();
    totalDiskCapacity = DeviceInfo.getTotalDiskCapacity();
    totalMemory = DeviceInfo.getTotalMemory();
    uniqueID = DeviceInfo.getUniqueID();
    userAgent = DeviceInfo.getUserAgent();
    version = DeviceInfo.getVersion();
    is24Hour = DeviceInfo.is24Hour();
    isEmulator = DeviceInfo.isEmulator();
    mACAddress;


    constructor() {
        this.syncCacheSize();
        this.syncAppInstall();
        Platform.OS === 'android' && DeviceInfo.getMACAddress().then(mac => this.mACAddress = mac).catch(e => console.log('获取macAddress失败', e))
    }

    syncCacheSize() {
        CacheManager.getCacheSize().then(size => this.setCacheSize(size))
    }

    @action
    async syncAppInstall() {
        const [isQQInstall, isWXInstall, isSinaInstall] = await Promise.all(
            ['mqq://', 'weixin://', 'weibo://'].map(item =>
                Linking.canOpenURL(item)
            )
        );
        this.isQQInstall = isQQInstall;
        this.isWXInstall = isWXInstall;
        this.isSinaInstall = isSinaInstall;
    }


    @action
    setCacheSize(size) {
        this.cacheSize = StringUtils.bytesToSize(size)
    }

    clearCache() {
        LoadingUtils.show('清除中', 'FadingCircleAlt');
        CacheManager.clearCache().then(() => {
            this.syncCacheSize();
            LoadingUtils.hide()
        }).catch(e => LoadingUtils.hide())
    }
}

export const appStateStore = new AppStateStore();