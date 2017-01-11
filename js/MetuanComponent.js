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
import TWebView  from './tWebView';
class MetuanComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 20, marginRight: 10}}>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, '美食')}>
                        <Image source={require('./img/ic_category_0.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>美食</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, '电影')}>
                        <Image source={require('./img/ic_category_1.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>电影</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, '酒店')}>
                        <Image source={require('./img/ic_category_2.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>酒店</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, 'KTV',)}>
                        <Image source={require('./img/ic_category_3.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>KTV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, '外卖')}>
                        <Image source={require('./img/ic_category_4.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>外卖</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', marginLeft: 10, marginTop: 10, marginRight: 10}}>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, '优惠买单')}>
                        <Image source={require('./img/ic_category_5.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>优惠买单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, '周边游')}>
                        <Image source={require('./img/ic_category_6.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>周边游</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, '休闲娱乐')}>
                        <Image source={require('./img/ic_category_7.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>休闲娱乐</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, '今日新单')}>
                        <Image source={require('./img/ic_category_8.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>今日新单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item_view} onPress={this._onClick.bind(this, '丽人')}>
                        <Image source={require('./img/ic_category_9.png')}
                               resizeMode={'contain'}
                               style={styles.item_image}/>
                        <Text style={styles.item_text}>丽人</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _onClick(title) {
        let url = "https://www.baidu.com";
        this.props.navigator.push({
            screen: "com.WebViewComponent",
            title: title,
            passProps:{
                url: url,
            }
        });
       /* this.props.navigator.push({
            component: TWebView,
            title: title,
            barHintColor: '#ccffffff',
            navigationBarHidden: false,
            passProps: {
                url: url,
                isMargin: 1
            }
        });*/
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

module.exports = MetuanComponent;
