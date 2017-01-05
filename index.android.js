/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

export default class AwesomeProject extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <View>
                    <Text style={styles.welcome}>
                        自定义弹出Toast消息
                    </Text>
                    <CustomButton
                        text="点击弹出Toast消息"
                        onPress={()=>NativeModules.ToastCustomAndroid.show("我是ToastCustomAndroid弹出消息",
                            NativeModules.ToastCustomAndroid.SHORT)}
                    />
                    <CustomButton
                        text="点击获取measure方法"
                        onPress={
                            ()=>NativeModules.ToastCustomAndroid.measureLayout((x, y, width, height) => {
                                var toastStr = x + '坐标,' + y + '坐标,' + width + '宽,' + height + '高';
                                console.log('---success---', toastStr );
                                NativeModules.ToastCustomAndroid.show(toastStr,
                                    NativeModules.ToastCustomAndroid.SHORT)
                            }, (msg) => {
                                console.log('---error---', msg);
                                NativeModules.ToastCustomAndroid.show(msg,
                                    NativeModules.ToastCustomAndroid.SHORT)
                            })
                        }
                    />
                </View>
            </View>
        );
    }
}
var {NativeModules} = require('react-native');
class CustomButton extends React.Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        margin: 5,
        backgroundColor: 'white',
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
