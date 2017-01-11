import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

import TWebView from './tWebView';

const nearByURL = './../html/nearby.html';

class ToiletPage extends Component {
    static navigatorStyle = {
        navBarHidden:true
    };
    render(){
        return(
            <TWebView url={nearByURL} isNearBy={true} isMargin={1} />
        );
    }
}

module.exports = ToiletPage;