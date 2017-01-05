package com.awesomeproject;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;

/**
 * Created by zhuxiaocheng on 2016/11/10.
 */

public class UIManagerModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "UIManager";

    public UIManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void measureLayout(int tag, int ancestorTag, Promise promise){
        try {
            WritableMap map = Arguments.createMap();
            map.putDouble("relativeX", 100);
            map.putDouble("relativeY", 100);
            map.putDouble("width", 200);
            map.putDouble("height", 200);

            promise.resolve(map);
        }catch (IllegalViewOperationException e){
            promise.reject(e);
        }
    }
}
