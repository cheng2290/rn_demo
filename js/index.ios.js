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
    ListView,
    TouchableOpacity,
    NavigatorIOS
} from 'react-native';
import Util from './util';

import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import InputTextComponent from './InputTextComponent';
import ScrollViewComponent from './ScrollViewComponent';
import MyApiNative from './MyApiNative';
import QaPage from './QaPage';
import ModelComponent from './ModelComponent';

class ContainerView extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {title:'Text',component: TextComponent},
                {title:'Image(美团首页)',component: ImageComponent},
                {title:'InputText(QQ登录)',component: InputTextComponent},
                {title:'ScrollView',component:ScrollViewComponent},
                {title:'MyApiNative(自定义API Native组件)',component:MyApiNative},
                {title:'增员列表',component: QaPage},
                {title:'Model',component: ModelComponent},
            ])
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID, highlightRow) => (
                        <TouchableOpacity style={styles.item_view} onPress={this._showDetail.bind(this, rowData.component,rowData.title)}
                                          key={`${sectionID}-${rowID}`}>
                            <Text style={styles.text}>{rowData.title}</Text>
                        </TouchableOpacity>
                    )}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>(
                        <View
                            key={`${sectionID}-${rowID}`}
                            style={{
                                height: adjacentRowHighlighted ? 4 : 1*Util.pixel,
                                backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCCCC'
                            }}
                        />
                    )}
                />
            </View>
        );
    }

    _showDetail(component,title) {
        this.props.navigator.push({
            component: component,
            title: title,
            navigationBarHidden: false,
            passProps: {
                isMargin: 1
            }
        });
    }
}
export default  class AwesomeProject extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: ContainerView,
                    title: '首页',
                    passProps: {myProp: 'foo'},
                }}
                barTintColor={Util.navigationBarBgColor}
                tintColor="#fff"
                titleTextColor="#fff"
                style={{flex: 1}}
                navigationBarHidden={false}
            />
        );
    }
}
const styles = StyleSheet.create({
    item_view: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
       fontSize: 15
    }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
