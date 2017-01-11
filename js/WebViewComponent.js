import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    Dimensions,
} from 'react-native';

import TWebView from './tWebView';

const nearByURL = './../html/nearby.html';
const url = "http://www.baidu.com";

const {width, height} = Dimensions.get('window');

class WebViewComponent extends Component {
    static navigatorStyle = {
        tabBarHidden:true
    };
    constructor(props){
        super(props);
        this.state = {
            url: this.props.url,
            isShowErrorPage:false,
        };
    }

    render(){
        console.log("----url---",this.state.url);
        return(
            this.state.isShowErrorPage?
                <View style={styles.errorInfo}>
                    <Text style={styles.text}>不好意思,请检查网络连接情况或者报告错误</Text>
                </View>
                :
                <WebView
                    style={[styles.container]}
                    source={{uri:this.state.url,method: 'GET'}}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                    onError={this._loadError.bind(this)}
                />
        );
    }
    _loadError(){
        this.setState({
            isShowErrorPage:true
        });
    }
}
var styles = StyleSheet.create({
    container:{
        flex:1
    },
    errorInfo:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:16,
        fontWeight:'300'
    }
});

module.exports = WebViewComponent;