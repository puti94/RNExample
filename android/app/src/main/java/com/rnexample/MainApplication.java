package com.rnexample;

import android.app.Application;

import com.example.customlib.CustomPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.puti.paylib.PayReactPackage;
import com.puti.upgrade.UpgradePackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.reactnativecomponent.barcode.RCTCapturePackage;
import com.rnexample.module.NativeConstantPackage;
import com.tencent.bugly.crashreport.CrashReport;
import com.uemnglib.DplusReactPackage;
import com.uemnglib.RNUMConfigure;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.Config;
import com.umeng.socialize.PlatformConfig;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;
import cn.reactnative.httpcache.HttpCachePackage;

public class MainApplication extends Application implements ReactApplication {

    {
        Config.DEBUG = BuildConfig.DEBUG;
        PlatformConfig.setWeixin(BuildConfig.WX_APPKEY, BuildConfig.WX_SECRET);
        PlatformConfig.setSinaWeibo(BuildConfig.SINA_APPID, BuildConfig.SINA_SECRET, "https://api.weibo.com/oauth2/default.html");
        PlatformConfig.setQQZone(BuildConfig.QQ_APPID, BuildConfig.QQ_SECRET);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new UpgradePackage(),
                    new PayReactPackage(),
                    new RCTCapturePackage(),
                    new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
                    new SvgPackage(),
                    new RNDeviceInfo(),
                    new HttpCachePackage(),
                    new SplashScreenReactPackage(),
                    new RNSpinkitPackage(),
                    new CustomPackage(),
                    new NativeConstantPackage(),
                    new DplusReactPackage(),
                    new JPushPackage(!BuildConfig.DEBUG, !BuildConfig.DEBUG)
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        CrashReport.initCrashReport(getApplicationContext(), BuildConfig.BUGLY_ID, BuildConfig.DEBUG);
        RNUMConfigure.init(getApplicationContext(), BuildConfig.UMENG_APPKEY, "android", UMConfigure.DEVICE_TYPE_PHONE, null);
        UMConfigure.setLogEnabled(BuildConfig.DEBUG);
    }
}
