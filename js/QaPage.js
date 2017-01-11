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
    TouchableOpacity,
    RefreshControl,
    ActivityIndicator,
    InteractionManager
} from 'react-native';

import Util from './util';
import TWebView from './tWebView';
import LoadMoreFooter from './components/LoadMoreFooter';
import GiftedListView from 'react-native-gifted-listview';
import Swiper from 'react-native-swiper';
import LoadingView from './components/LoadingView';

const HOST = "https://www.zuihuibao.cn";

export default class QaPage extends Component {

    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            index:0,
            isLoading: false,
            isAllLoaded:false,
            isRefreshing: false,
            isLoadingMore: false,
            totalCount: 50,
            imgList: [],
            data: [],
            dataSource: ds.cloneWithRows([])
        }
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView netError={this.state}/>;
        }
        return (

            <View style={styles.container}>


                <ListView
                    enableEmptySections={true}
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    onEndReached={ this._toEnd.bind(this) }
                    onEndReachedThreshold={10}
                    renderFooter={this._renderFooter.bind(this)}
                    renderRow={this._renderRow.bind(this)}
                    renderSeparator={this._renderSeparator.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="gray"
                            title="正在加载中..."
                            titleColor="gray"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }

                />
            </View>
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity
                style={[styles.item, styles.row]}
                onPress={this._showDetail.bind(this, rowData.title, rowData.detail_url)}
                key={`${sectionID}-${rowID}`}>

                <View style={styles.text}>
                    <Text style={styles.title} numberOfLines={3}>{rowData.title}</Text>
                    <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                        <Text style={styles.time}>{rowData.view_num}</Text>
                        <Text style={[styles.time, {marginLeft: 5}]}>阅读</Text>
                        <Text style={[styles.time, {marginLeft: 10, marginRight: 10}]}>
                            {rowData.date_time}
                        </Text>
                        {
                            rowData.tags.map((item, i) => {
                                let  borderColor = "#CCCCCC";
                                let bgColor = '#CCCCCC';
                                let textColor = "#212121";
                                if (item == "置顶"){
                                    borderColor = "red";
                                    bgColor = 'white';
                                    textColor = 'red';
                                }else if(item == '最热'){
                                    borderColor = "orange";
                                    bgColor = 'orange'
                                    textColor = 'white';
                                }
                                return (
                                    <View style={[styles.radius_view,{borderColor:borderColor,backgroundColor:bgColor}]}
                                          key={i}>
                                        <Text style={{fontSize:10,color:textColor}}>{item}</Text>
                                    </View>
                                );
                                }
                            )
                        }

                    </View>
                </View>
                <View>
                    <Image style={styles.img} source={{uri: rowData.list_logo}} resizeMode={'cover'}/>
                </View>
            </TouchableOpacity>
        )
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: 1 * Util.pixel,
                    backgroundColor: '#fff',
                }}>
                <View style={{
                    height: 1 * Util.pixel,
                    backgroundColor: '#ccc',
                    marginLeft: 15,
                    marginRight: 15
                }}/>
            </View>
        );
    }
    _isShowLoading(isLoading) {
        this.setState({
            isLoading: isLoading
        });
    }
    _onScroll() {
        console.log("----1233");
    }

    _toEnd() {
        console.log("----renderEnd---加载更多？ ", this.state.isLoadingMore, this.state.data.length, this.state.totalCount, this.state.isRefreshing);
        //ListView滚动到底部，根据是否正在加载更多 是否正在刷新 是否已加载全部来判断是否执行加载更多
        if (this.state.isLoadingMore || this.state.data.length >= this.state.totalCount || this.state.isRefreshing) {
            return;
        }
        ;
        InteractionManager.runAfterInteractions(() => {
            console.log("触发加载更多 toEnd() --> ");
            this._loadMoreData();
        });
    }

    _loadMoreData() {
        _this = this;
        let url = HOST + "/yiiapp/piazza/article-list?type=2&limit=10&index="+this.state.index;
        Util.get(url, function (datas) {
            console.log("----url----", datas);
            if (datas.return_code) {
                let obj = datas.data.article_list;
                console.log("----url---obj-", obj);
                let data = _this.state.data.concat(obj);
                console.log("----url---obj-", data);
                let isAllLoaded = false;
                if (obj.length<10){
                    isAllLoaded = true;
                }
                _this.setState({
                    index:data.length,
                    data: data,
                    isAllLoaded: isAllLoaded,
                    dataSource: _this.state.dataSource.cloneWithRows(data)
                });
            } else {
                console.log('数据异常,正在紧急修复,请耐心等待!');
            }
        }, function (err) {
            console.log('---error---', err);
        });
    }

    _onRefresh() {
        this.setState({isRefreshing: true,index:0});
        let self = this;
        let url = HOST + "/yiiapp/piazza/article-list?type=2&limit=10&index="+this.state.index;
        Util.get(url, function (datas) {
            self.setState({isRefreshing: false});
            console.log("----url----",url, datas);
            if (datas.return_code) {
                let obj = datas.data.article_list;
                let isAllLoaded = false;
                if (obj.length<10){
                    isAllLoaded = true;
                }
                self.setState({
                    index: obj.length(),
                    data: obj,
                    isAllLoaded: isAllLoaded,
                    dataSource: self.state.dataSource.cloneWithRows(obj)
                });
            } else {
                console.log('数据异常,正在紧急修复,请耐心等待!');
            }
        }, function (err) {
            self.setState({isRefreshing: false});

            console.log('---error---', err);
        });
    }

    _renderFooter() {
        console.log("-----renderFooter-加载更多？ ",this.state.index, this.state.isLoadingMore, this.state.data.length, this.state.totalCount, this.state.isRefreshing);

        //通过当前product数量和刷新状态（是否正在下拉刷新）来判断footer的显示
        if (this.state.data.length < 1 || this.state.isRefreshing) {
            return null
        }
        ;
        if (!this.state.isAllLoaded) {
            //还有更多，默认显示‘正在加载更多...’
            return <LoadMoreFooter isLoadAll={false}/>
        } else {
            // 加载全部
            return <LoadMoreFooter isLoadAll={true}/>
        }
    }

    componentDidMount() {
        let self = this;
        let url = HOST + "/yiiapp/piazza/article-list?type=2&index=0&limit=10";
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this._isShowLoading(true);
        Util.get(url, function (datas) {
            self._isShowLoading(false);
            console.log("----url----", datas);
            if (datas.return_code) {
                let obj = datas.data.article_list;
                let isAllLoaded = false;
                if (obj.length<10){
                    isAllLoaded = true;
                }
                self.setState({
                    index:obj.length,
                    isAllLoaded:isAllLoaded,
                    data:obj,
                    dataSource: self.state.dataSource.cloneWithRows(obj)
                });
            } else {
                alert('数据异常,正在紧急修复,请耐心等待!');
            }
        }, function (err) {
            self._isShowLoading(false);
            console.log('---error---', err);
            alert('服务异常,正在紧急修复,请耐心等待哦');
        });
        /* let bannerUrl = HOST + "/yiiapp/piazza/get-list-banner?type=1";
         */

    }

    _showDetail(title, url) {
        url = HOST + url;
        console.log("------url-----", url);
        this.props.navigator.push({
            screen: "com.WebViewComponent",
            title: title,
            passProps:{
                url: url,
            }
        });
        /*this.props.navigator.push({
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

let styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 50,
        height: 100

    },
    item: {
        height: 100,
        justifyContent: 'center',
        paddingTop: 10
    },
    row: {
        flexDirection: 'row'
    },
    img: {
        width: 100,
        height: 80,
        marginLeft: 10,
        borderWidth: Util.pixel,
        borderColor: '#eeeeee'
    },
    text: {
        marginLeft: 7
    },
    title: {
        fontSize: 15,
        width: Util.size.width - 140,
        lineHeight: 18,
    },
    time: {
        fontSize: 12,
        color: '#AAAAAA',
    },
    radius_view: {
        height:18,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 6,
        paddingRight: 6,
        borderWidth: Util.pixel,
        marginLeft: 5,
        borderRadius:9
    }
});