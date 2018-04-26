package com.example.customlib;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by puti on 2018/1/14.
 */

public class RCTUITestManager extends SimpleViewManager<RCTUITest> {

    @Override
    public String getName() {
        return "RCTUITest";
    }

    @Override
    protected RCTUITest createViewInstance(ThemedReactContext reactContext) {
        return new RCTUITest(reactContext);
    }

    @ReactProp(name = "customText")
    public void setCustomText(RCTUITest view, String text) {
        view.setText(text);
    }

}
