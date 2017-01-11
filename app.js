import {
    Platform
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Util from  './js/util';

import {registerScreens} from './js';
registerScreens();


const createTabs = () => {
    let tabs = [
        {
            label: '首页',
            screen: 'com.Main',
            icon: require('./js/img/one.png'),
            selectedIcon: require('./js/img/one_selected.png'),  //ios
            title: '首页'
        },
        {
            label: '增员',
            screen: 'com.QaPage',
            icon: require('./js/img/two.png'),
            selectedIcon: require('./js/img/two_selected.png'),  //ios
            title: '增员'
        },
        {
            label: '附近酒店',
            screen: 'com.MapComponent',
            icon: require('./js/img/three.png'),
            selectedIcon: require('./js/img/three_selected.png'),  //ios
            title: '附近酒店'
        }
    ];
    return tabs;
}
// this will start our app
Navigation.startTabBasedApp({
    tabs: createTabs(),
    appStyle: {
        tabBarBackgroundColor: "#ffffff",

        tabBarButtonColor: '#777777',
        tabBarSelectedButtonColor: '#26B8F2',    //android
        navBarTextColor: '#ffffff', // change the text color of the title (remembered across pushes)
        navBarBackgroundColor: '#26B8F2', // change the background color of the nav bar (remembered across pushes)
        navBarButtonColor: '#ffffff', // change the button colors of the nav bar (eg. the back button) (remembered across pushes)
        navBarHidden: false, // make the nav bar hidden
        navBarHideOnScroll: false, // make the nav bar hidden only after the user starts to scroll
        navBarTranslucent: false, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
        navBarTransparent: false, // make the nav bar transparent, works best with drawUnderNavBar:true
        navBarNoBorder: false, // hide the navigation bar bottom border (hair line). Default false
        drawUnderNavBar: false, // draw the screen content under the nav bar, works best with navBarTranslucent:true
        drawUnderTabBar: true, // draw the screen content under the tab bar (the tab bar is always translucent)
        statusBarBlur: false, // blur the area under the status bar, works best with navBarHidden:true
        navBarBlur: false, // blur the entire nav bar, works best with drawUnderNavBar:true
        tabBarHidden: false, // make the screen content hide the tab bar (remembered across pushes)
        forceTitlesDisplay: true,
        statusBarHideWithNavBar: false ,// hide the status bar if the nav bar is also hidden, useful for navBarHidden:true
        statusBarHidden: false, // make the status bar hidden regardless of nav bar state
        statusBarTextColorScheme: 'light', // text color of status bar, 'dark' / 'light' (remembered across pushes)
    },
    /*drawer: {
        left: {
            screen: 'com.Main'
        }
    },*/
    animationType: 'fade'  // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
/*Navigation.startSingleScreenApp({
    screen: {
        screen: 'com.iot.Main',
        title: 'Navigation',
        navigatorStyle: {
            navBarBackgroundColor: '#4dbce9',
            navBarTextColor: '#ffff00',
            navBarSubtitleTextColor: '#ff0000',
            navBarButtonColor: '#ffffff',
            statusBarTextColorScheme: 'light'
        }
    }/!*,
    drawer: {
        left: {
            screen: 'example.SideMenu'
        }
    }*!/
});*/
