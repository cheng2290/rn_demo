import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';

var NUM_ITEMS = 20;

class ScrollViewComponent extends Component {

    static navigatorStyle = {
        tabBarHidden:true
    };

    render() {
        // One of the items is a horizontal scroll view
        var items = this._makeItems(NUM_ITEMS, styles.itemWrapper);
        items[4] = (
            <ScrollView key={'scrollView'} horizontal={true}>
                {this._makeItems(NUM_ITEMS, [styles.itemWrapper, styles.horizontalItemWrapper])}
            </ScrollView>
        );

        var verticalScrollView = (
            <ScrollView style={styles.verticalScrollView}>
                {items}
            </ScrollView>
        );
        return verticalScrollView;
    }
    _makeItems(nItems, styles) {
        var items = [];
        for (var i = 0; i < nItems; i++) {
            items[i] = (
                <TouchableOpacity key={i} style={styles}>
                    <Text>{'Item ' + i}</Text>
                </TouchableOpacity>
            );
        }
        return items;
    }
}
var styles = StyleSheet.create({
    verticalScrollView: {
        padding: 10,
    },
    itemWrapper: {
        backgroundColor: '#dddddd',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 5,
        borderColor: '#a52a2a',
        padding: 30,
        margin: 5,
    },
    horizontalItemWrapper: {
        padding: 50
    }
});

module.exports = ScrollViewComponent;