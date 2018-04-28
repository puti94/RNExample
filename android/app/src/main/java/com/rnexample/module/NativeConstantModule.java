package com.rnexample.module;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.rnexample.BuildConfig;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by puti on 2018/4/28.
 */

public class NativeConstantModule extends ReactContextBaseJavaModule {
    public NativeConstantModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "nativeConstant";
    }


    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<>();
        constants.put("BUILD_TYPES", BuildConfig.BUILD_TYPE);
        return constants;
    }
}
