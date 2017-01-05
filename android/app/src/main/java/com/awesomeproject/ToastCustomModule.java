package com.awesomeproject;

import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * 测试原生Toast模块
 * Created by zhuxiaocheng on 2016/11/10.
 */

public class ToastCustomModule extends ReactContextBaseJavaModule {
    private static final String MODULE_NAME = "ToastCustomAndroid";
    private static final String DURATION_SHORT = "SHORT";
    private static final String DURATION_LONG = "LONG";

    public ToastCustomModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG, Toast.LENGTH_LONG);
        return constants;
    }

    /**
     * 该方法用于给JavaScript进行调用
     * @param message
     * @param duration
     */
    @ReactMethod
    public void show(String message, int duration){
        Toast.makeText(getReactApplicationContext(),message,duration).show();
    }
    /**
     * 这边只是演示相关回调方法的使用,所以这边的使用方法是非常简单的
     * @param successCallback     数据成功回调函数
     * @param errorCallback       数据错误回调函数
     */
    @ReactMethod
    public void measureLayout(Callback successCallback, Callback errorCallback){
        try {
            successCallback.invoke(100,100,200,200);
        }catch (IllegalViewOperationException e){
            errorCallback.invoke(e.getMessage());
        }
    }


}
