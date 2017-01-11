/**
 * Created by zhuxiaocheng on 2016/11/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActionSheetIOS,
    KeyBoard,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import TWebView from './tWebView';

const QQ_RULER = 'https://ssl.zc.qq.com/chs/agreement1_chs.html';
var ActionSheets = [
    '找回密码',
    '短信验证登录',
    '取消'
];

const dismissKeyboard = require('dismissKeyboard');

import {toastShort} from './components/ToastUtil';
class InputTextComponent extends Component {
    static navigatorStyle = {
        tabBarHidden:true
    };
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=> {dismissKeyboard()}} >
                <View style={{backgroundColor: '#f4f4f4', paddingTop: 70, flex: 1}}>
                    <Image
                        style={styles.style_image}
                        source={require('./img/qq.png')}/>
                    <TextInput
                        style={styles.style_user_input}
                        placeholder='QQ号/手机号/邮箱'
                        numberOfLines={1}
                        autoFocus={true}
                        underlineColorAndroid={'transparent'}
                        textAlign='center'
                        keyboardType='numbers-and-punctuation'
                        onChangeText={(text)=>this.setState({username: text})}
                    />
                    <View
                        style={{height: 1, backgroundColor: '#f4f4f4'}}
                    />
                    <TextInput
                        style={styles.style_pwd_input}
                        placeholder='密码'
                        numberOfLines={1}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                        textAlign='center'
                        returnKeyType="join"
                        onChangeText={(text)=>this.setState({password: text})}
                        onSubmitEditing={this._login.bind(this)}
                    />
                    <TouchableOpacity onPress={this._login.bind(this)}
                                      style={styles.style_view_commit}>
                        <Text style={{color: '#fff'}}>
                            登录
                        </Text>

                    </TouchableOpacity>
                    <View style={{flex: 1, flexDirection: 'row', top: 20}}
                    >
                        <Text style={styles.style_rule_tip}>我已阅读并同意</Text>
                        <TouchableOpacity style={{height: 40}} onPress={this._showRule.bind(this)}>
                            <Text style={styles.style_rule}>服务条款</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', bottom: 15}}>
                        <TouchableOpacity onPress={this._showActionSheet.bind(this)}>
                            <Text style={styles.style_view_unlogin}>
                                无法登录?
                            </Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity onPress={()=> {
                            toastShort('正在开发中...')
                        }}>
                            <Text style={styles.style_view_register}>
                                新用户注册
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View >
            </TouchableWithoutFeedback>
        );
    }

    _login() {
        let name = this.state.username;
        let pwd = this.state.password;
        if (name == null || name == '' || name == undefined) {
            toastShort('用户名不能为空');
            return;
        }
        if (pwd == null || pwd == '' || pwd == undefined) {
            toastShort("密码不能为空")
            return;
        }
        this.props.navigator.pop();
    }

    _showRule() {
        this.props.navigator.push({
            screen: "com.WebViewComponent",

            title: 'QQ号规则',
            passProps: {
                url: QQ_RULER,
            }

        });
    }

    _showActionSheet() {
        if (Platform == 'ios') {
             ActionSheetIOS.showActionSheetWithOptions({
             options: ActionSheets,
             cancelButtonIndex: 2,
             },
             (buttonIndex) => {
             if (buttonIndex !== 2)
             alert(ActionSheets[buttonIndex]);
             // this.setState({clicked: ActionSheets[buttonIndex]});
             });
        }else {
            toastShort('正在开发中...');
        }
    }
}
const styles = StyleSheet.create({
    style_image: {
        borderRadius: 35,
        height: 70,
        width: 70,
        marginTop: 40,
        alignSelf: 'center',
    },
    style_user_input: {
        backgroundColor: '#fff',
        marginTop: 10,
        height: 40,
    },
    style_pwd_input: {
        backgroundColor: '#fff',
        height: 40,
    },
    style_view_commit: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#63B8FF',
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    style_rule_tip: {
        fontSize: 13,
        color: '#999999',
        marginLeft: 15
    },
    style_rule: {
        fontSize: 13,
        color: '#63B8FF',
        marginLeft: 10,
    },
    style_view_unlogin: {
        fontSize: 13,
        color: '#63B8FF',
        marginLeft: 15,
    },
    style_view_register: {
        fontSize: 13,
        color: '#63B8FF',
        marginRight: 15,
        textAlign: 'right',
    }
});

module.exports = InputTextComponent;
