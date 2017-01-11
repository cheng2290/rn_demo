/**
 * Created by zhuxiaocheng on 2016/12/5.
 * 在需要使用的地方 先引入组件

 * import LoadingModel from '../components/LoadingModel'
 * 然后在 render() 中添加组件

 * render() {
 *    return (
 *        <View style={ styles.mainView }>
 *
 *            ...
 *
 *           <LoadingModel showLoading={ this.state.showLoading } />
 *       </View>
 *    )
 * }
 * 组件的 showLoading 属性是必需的，显示与隐藏是通过 showLoading 控制的
 * 组件支持自定义背景不透明度 opacity ，默认0.6
 * 组件支持自定义背景颜色 backgroundcolor ，默认 gray
 * 组件支持gif图点击事件 loadingViewClick （可选）
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Text
} from 'react-native';
const { width, height } = Dimensions.get('window')
class LoadingModel extends Component{
    constructor(props) {
        super(props);
    }
    _close(){
        console.log("onRequestClose ---- ")
    }
    render() {
        const { showLoading, opacity, backgroundColor } = this.props
        return (
            <Modal onRequestClose={() => this._close()} visible={showLoading} transparent>
                <View style={ [styles.loadingView, {opacity: opacity||0.3, backgroundColor: backgroundColor||'gray'}]}></View>
                <View style={ styles.loadingImageView }>
                    <View style={ styles.loadingImage }>
                        {
                            this.props.loadingViewClick?
                                <TouchableOpacity onPress={ this.props.loadingViewClick }>
                                    <View style={styles.loading}>
                                        <ActivityIndicator
                                            size="small"
                                            color="#3e9ce9"
                                        />
                                        <Text style={styles.loadingText}>数据加载中...</Text>
                                    </View>
                                </TouchableOpacity>
                                :
                                <View style={styles.loading}>
                                    <ActivityIndicator
                                        size="small"
                                        color="#3e9ce9"
                                    />
                                    <Text style={styles.loadingText}>请您稍等...</Text>
                                </View>
                        }
                    </View>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        height,
        width,
        position: 'absolute'
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center'
    },
    loadingImage: {
        width: 150,
        height: 100,
        borderRadius:5,
        backgroundColor:'white'
    },
    loadingImageView: {
        position: 'absolute',
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
LoadingModel.propTypes = {
    loadingViewClick: React.PropTypes.func, //.isRequired,
    showLoading: React.PropTypes.bool.isRequired,
    opacity: React.PropTypes.number,
    backgroundColor: React.PropTypes.string
}


export default LoadingModel
