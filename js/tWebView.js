import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

 class TWebView extends Component{
     static navigatorStyle = {
         tabBarHidden:true
     };
	constructor(props){
		super(props);
		this.state = {
			url: this.props.url,
			isShowErrorPage:false,
			isNearBy: this.props.isNearBy,
			isWeather: this.props.isWeather,
			isMargin: this.props.isMargin
		};
	}

	//加载网络html：source={{uri:this.state.url}}
	 //加载本地html：source={require('./../html/nearby.html')
	render(){
        console.log("--url-1-",this.state.url);
		let url = {url:this.state.url,method: 'GET'};
		if(this.state.isNearBy){
			url = require('./../html/nearby.html');
            console.log("--url1--",url,this.state.isNearBy)
		}else if (this.state.isWeather){
			url = require('./../html/nearby.html');
		}
		console.log("--url--",url,this.state.isNearBy)
		return(
			<View style={styles.container}>
				{  
					this.state.isShowErrorPage?
			            <View style={styles.errorInfo}>
			              <Text style={styles.text}>不好意思,请检查网络连接情况或者报告错误</Text>
			            </View>
		            :
			            <WebView
			              style={[styles.container,{marginTop: this.state.isMargin || -20}]}
			              startInLoadingState={true}
						  javaScriptEnabled={true}
						  domStorageEnabled={true}
                          allowsInlineMediaPlayback={true}
                          onError={this._loadError.bind(this)}
						  source={url}>
			            </WebView>
				}	
			</View>
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
module.exports = TWebView;