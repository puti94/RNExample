/**
 * User: puti.
 * Time: 2018/2/7 下午8:22.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component, PureComponent} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native'
import PropTypes from "prop-types";
import {observer} from 'mobx-react'
import {Theme} from "../store";
import {images} from "../res";
import ShadowView from "react-native-shadow-view";

const {width} = Dimensions.get('window');

@observer
export default class NavBar extends Component {

    static propTypes = {
        title: PropTypes.string,
        hideLeft: PropTypes.bool,
        leftPress: PropTypes.func,
        leftTitle: PropTypes.string,
        leftView: PropTypes.element,
        leftIcon: PropTypes.any,
        hideRight: PropTypes.bool,
        rightPress: PropTypes.func,
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
        console.log('render');
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

        const {navigation} = this.context;

        const ContainView = hasShadow ? ShadowView : View;

        let leftViewPress = null;
        if (typeof leftPress === 'undefined') {
            leftViewPress = () => navigation && navigation.goBack();
        } else {
            leftViewPress = leftPress
        }

        const leftProps = {
            view: leftView,
            hide: hideLeft,
            icon: leftIcon,
            title: leftTitle,
            onPress: leftViewPress
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

const BothSideView = ({hide, onPress, icon, view, title, style}) => {
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
        width: 24,
        height: 24,
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