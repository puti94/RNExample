package com.rnexample;

import android.app.Application;

import com.example.customlib.CustomPackage;
import com.facebook.react.ReactApplication;
import com.reactnativecomponent.barcode.RCTCapturePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.react.rnspinkit.RNSpinkitPackage;
import com.tencent.bugly.crashreport.CrashReport;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import cn.reactnative.httpcache.HttpCachePackage;

public class MainApplication extends Application implements ReactApplication {

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
                    new RCTCapturePackage(),
                    new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
                    new SvgPackage(),
                    new RNDeviceInfo(),
                    new HttpCachePackage(),
                    new SplashScreenReactPackage(),
                    new RNSpinkitPackage(),
                    new CustomPackage()
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
    }
}
