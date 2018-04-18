/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    ScrollView,
    AsyncStorage,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native'
import {ListRow} from 'teaset'
import SplashScreen from 'react-native-splash-screen'
import {RouteHelper} from 'react-navigation-easy-helper'
import PropTypes from "prop-types";
import {observer} from 'mobx-react'
import {Theme} from "../store";
import {images} from "../res";
import ShadowView from "react-native-shadow-view";
import {BaseContainer} from "../components";

const {width} = Dimensions.get('window');
export default class LaunchPage extends Component {


    launchApp = async () => {
        let notFirstOpen = await AsyncStorage.getItem('notFirstOpen');
        if (notFirstOpen) {
            RouteHelper.reset('MainPage')
        } else {
            AsyncStorage.setItem('notFirstOpen', 'true');
            RouteHelper.replace('GuidePage')
        }
    };

    componentDidMount() {
        //当启动页完全渲染完毕后隐藏白屏占位图
        SplashScreen.hide();
        console.log('版本', Platform.Version)
    }

    render() {
        return (<BaseContainer store={this.store} hideLeft title={'LaunchPage'}>
            <ScrollView style={{flex: 1}}>
                <ListRow title={'工具示例'} onPress={() => {
                    RouteHelper.navigate('UtilsPage')
                }}/>
                <ListRow title={'模拟通讯录'} onPress={() => {
                    RouteHelper.navigate('NotesPage')
                }}/>
                <ListRow title={'路由示例'} onPress={() => {
                    RouteHelper.navigate('RouteUtilPage')
                }}/>
                <ListRow title={'基础页面'} onPress={() => {
                    RouteHelper.navigate('BasePage')
                }}/>

                <ListRow title={'设置页面'} onPress={() => {
                    RouteHelper.navigate('SetPage')
                }}/>

                <ListRow title={'Teaset Example'} onPress={() => {
                    RouteHelper.navigate('TeasetApp')
                }}/>

                <ListRow title={'打开正常App'} onPress={this.launchApp}/>
            </ScrollView>
        </BaseContainer>);
    }

}

@observer
class NavBar extends Component {

    static propTypes = {
        title: PropTypes.string,
        hideLeft: PropTypes.bool,
        leftPress: PropTypes.func,
        leftTitle: PropTypes.string,
        leftView: PropTypes.element,
        leftIcon: PropTypes.any,
        hideRight: PropTypes.bool,
        rightPress: PropTypes.bool,
        rightView: PropTypes.element,
        rightIcon: PropTypes.any,
        rightTitle: PropTypes.string,
        hasShadow: PropTypes.bool
    };


    static defaultProps = {
        title: '标题',
        hideLeft: false,
        leftIcon: images.back,
        hasShadow: true
    };

    static contextTypes = {
        navigation: PropTypes.object.isRequired,
    };


    render() {
        const {
            hideLeft,
            leftPress,
            leftIcon,
            leftView,
            leftTitle,
            title,
            hideRight,
            rightPress,
            rightIcon,
            rightView,
            rightTitle,
            hasShadow
        } = this.props;

        const ContainView = hasShadow ? ShadowView : View;

        const leftProps = {
            view: leftView,
            hide: hideLeft,
            icon: leftIcon,
            title: leftTitle,
            onPress: leftPress
        };
        const rightProps = {
            view: rightView,
            hide: hideRight,
            icon: rightIcon,
            title: rightTitle,
            onPress: rightPress,
            style: {
                justifyContent: 'flex-end'
            }
        };
        return <ContainView style={[styles.contain, hasShadow && styles.shadow, {backgroundColor: Theme.baseColor}]}>
            <View style={styles.subContain}>
                <BothSideView {...leftProps}/>
                <View style={styles.centerContain}>
                    <Text style={styles.titleText} numberOfLines={1}>{title}</Text>
                </View>
                <BothSideView {...rightProps}/>
            </View>
        </ContainView>
    }


}

BothSideView = ({hide, onPress, icon, view, title, style}) => {
    let subView = null;
    if (view) {
        subView = view;
    } else if (!hide) {
        subView = <TouchableOpacity onPress={onPress}>
            {title ? <Text style={styles.buttonText}>{title}</Text> :
                <Image style={styles.icon} source={icon}
                       resizeMode={Image.resizeMode.contain}/>}
        </TouchableOpacity>
    }
    return <View style={[styles.bothSidesContain, style]}>
        {subView}
    </View>
};
const styles = StyleSheet.create({
    contain: {
        paddingTop: Theme.statusBarHeight,
        height: 44 + Theme.statusBarHeight,
        width: width,
        paddingHorizontal: 12,

    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0, height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4
    },
    subContain: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    bothSidesContain: {
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        width: 28,
        height: 28,
        tintColor: 'white'
    },
    centerContain: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        color: Theme.navigationTitle,
        fontSize: 16
    },
    buttonText: {
        color: Theme.navigationTitle,
        fontSize: 14
    }
});