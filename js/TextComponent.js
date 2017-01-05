import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

class ContainerView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{color: 'red'}}>
                    My Text One 红色。
                </Text>
                <Text style={styles.text2}> My Text Two 绿色和字体大小。</Text>
                <Text style={styles.text3}> My Text Three 绿色和字体名称。</Text>
                <Text style={styles.text4}> My Text Four 粉色和加粗。</Text>
                <Text style={styles.text5}> My Text Five 灰色和斜体。</Text>
                <Text style={styles.text6}> My Text Six 居中和斜体。</Text>
                <Text numberOfLines={1} style={styles.text6}>测试行数My Text Six 居中和斜体。My
                    Text Six 居中和斜体。 My Text Six 居中和斜体。</Text>
                <Text style={styles.text7}>设置文本的间距,居左，居顶部50</Text>
                <Text numberOfLines={2} style={styles.text8}>
                    测试行高 测试行高 测试行高 测试行高 测试行高 测试行高 测试行高 测试行高 测试行高 测试行高 测试行高
                    测试行高 测试行高 测试行高 测试行高 测试行高 测试行高
                </Text>
            </ScrollView>
        );
    }
}
var styles = StyleSheet.create({
    container:{
        paddingLeft: 10,
        paddingRight: 10
    },
    text1: {
        color: 'red'
    },
    text2: {
        color: 'green',
        fontSize: 20
    },
    text3: {
        color: 'green',
        fontFamily:'Cochin'
    },
    text4: {
        color: 'pink',
        fontWeight: 'bold'
    },
    text5: {
        color: 'gray',
        fontStyle: 'italic'
    },
    text6: {
        textAlign: 'center',
        fontStyle: 'italic'
    },
    text7: {
        marginLeft: 50,
        marginTop: 50,
        textAlign: 'center',
        fontStyle: 'italic'
    },
    text8: {
        lineHeight: 50,
        textAlign: 'center',
        fontStyle: 'italic'
    }
});
module.exports = ContainerView;
