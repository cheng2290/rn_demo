import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Detail from './detail';
import TWebView  from './tWebView';
import SwiperView from './swiperView';
import SwiperWithLoading from './swiperWithLoading';
import Swiper from 'react-native-swiper';
import MetuanComponent from './MetuanComponent';
class ImageComponent extends Component {
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <SwiperView />

                <MetuanComponent navigator={this.props.navigator}/>
                <View style={{marginTop:20}}>
                    <SwiperWithLoading/>
                </View>
            </ScrollView>
        );
    }

}

var styles = StyleSheet.create({
    item_view: {
        flex: 1
    },
    item_image: {
        alignSelf: 'center',
        width: 45,
        height: 45
    },
    item_text: {
        marginTop: 5,
        alignSelf: 'center',
        fontSize: 11,
        color: "#555555",
        textAlign: 'center'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

module.exports = ImageComponent;
