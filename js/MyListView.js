import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ListView,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';

import Util from './util';
import TWebView from './tWebView';



const HOST = "https://www.zuihuibao.cn";

export default class MyListView extends Component {
    static navigatorStyle = {
        tabBarHidden:true
    };
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows([])
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, sectionID, rowID, highlightRow) => (
                        <TouchableOpacity style={[styles.item, styles.row]}
                                          onPress={this._showDetail.bind(this, rowData.title, rowData.detail_url)}
                                          key={`${sectionID}-${rowID}`}>

                            <View style={styles.text}>
                                <Text style={styles.title} numberOfLines={2}>{rowData.title}</Text>
                                <Text style={styles.time}>{rowData.date_time}</Text>
                            </View>
                            <View>
                                <Image style={styles.img} source={{uri: rowData.list_logo}} resizeMode={'cover'}/>
                            </View>
                        </TouchableOpacity>
                    )}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>(
                        <View
                            key={`${sectionID}-${rowID}`}
                            style={{
                                height:  1 * Util.pixel,
                                backgroundColor: '#fff',
                            }}>
                            <View style={{
                                height:  1 * Util.pixel,
                                backgroundColor: '#ccc',
                                marginLeft:15,
                                marginRight:15
                            }}/>
                        </View>
                    )}
                />
            </ScrollView>
        );
    }
    componentDidMount() {
        let self = this;
        let url = HOST + "/yiiapp/piazza/article-list?type=2&index=0&limit=10";
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        Util.get(url, function (datas) {
            console.log("----url----", datas);
            if (datas.return_code) {
                let obj = datas.data.article_list;
                console.log("----url-1---", obj);
                self.setState({
                    dataSource: ds.cloneWithRows(obj)
                });
            } else {
                alert('数据异常,正在紧急修复,请耐心等待!');
            }
        }, function (err) {
            console.log('---error---', err);
            alert('服务异常,正在紧急修复,请耐心等待哦');
        });
    }

    _showDetail(title, url) {
        url = HOST + url;
        console.log("------url-----", url);
        this.props.navigator.push({
            component: TWebView,
            title: title,
            barHintColor: '#ccffffff',
            navigationBarHidden: false,
            passProps: {
                url: url,
                isMargin: 1
            }
        });
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 50,
        height: 100

    },
    item: {
        height: 70
    },
    row: {
        flexDirection: 'row'
    },
    img: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: Util.pixel,
        borderRadius: 3,
        borderColor: '#fff'
    },
    text: {
        marginLeft: 7
    },
    title: {
        fontSize: 15,
        marginTop: 8,
        width: Util.size.width - 80
    },
    time: {
        fontSize: 13,
        color: '#ddd',
        marginTop: 5
    }
});