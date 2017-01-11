/**
 * Created by zhuxiaocheng on 2016/12/18.
 */
import {Navigation} from 'react-native-navigation';

import Main from './Main';
import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';
import InputTextComponent from './InputTextComponent';
import ScrollViewComponent from './ScrollViewComponent';
import MyApiNative from './MyApiNative';
import QaPage from './QaPage';
import ModelComponent from './components/LoadingModel';
import MapComponent from './MapComponent'
import TWebView from './tWebView';
import WebViewComponent from './WebViewComponent';



// register all screens of the app (including internal ones)
export function registerScreens() {
    Navigation.registerComponent('com.Main', () => Main);
    Navigation.registerComponent('com.TextComponent', () => TextComponent);
    Navigation.registerComponent('com.ImageComponent', () => ImageComponent);
    Navigation.registerComponent('com.InputTextComponent', () => InputTextComponent);
    Navigation.registerComponent('com.MyApiNative', () => MyApiNative);
    Navigation.registerComponent('com.QaPage', () => QaPage);
    Navigation.registerComponent('com.ScrollViewComponent', () => ScrollViewComponent);
    Navigation.registerComponent('com.ModelComponent', () => ModelComponent);
    Navigation.registerComponent('com.MapComponent', () => MapComponent);
    Navigation.registerComponent('com.TWebView', () => TWebView);
    Navigation.registerComponent('com.WebViewComponent', () => WebViewComponent);

}