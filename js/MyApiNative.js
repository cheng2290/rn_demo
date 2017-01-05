import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    requireNativeComponent
} from 'react-native';

var DeviceExtension= require("NativeModules").DeviceExtension;

import RCTImageTestView from './RCTImageTestView';



DeviceExtension.getDynamicDimensions((error,dimensions)=>{
    console.log("----123---",dimensions);
});
class MyApiNative extends Component{
    constructor(props){
        super(props);
        this.state = {
            content:''
        }
    }
    render(){
        return(
            <ScrollView>
                <View>
                <Text>{this.state.content}</Text>
                </View>
                <View>
                   <RCTImageTestView  style={{width:500,height:500,backgroundColor:'#f0f0f0'}}/>
                </View>
            </ScrollView>
        );
    }
    componentDidMount(){
        var that  = this;
        DeviceExtension.getDynamicDimensions((error,dimensions)=>{
            that.setState({
                content:"width:"+dimensions.width+"   height:"+dimensions.height+"   scale:"+dimensions.scale
            });
        });
    }
}
module.exports = MyApiNative;