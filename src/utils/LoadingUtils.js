// ModalIndicator.js

'use strict';

import React from "react";
import {View, Text, Dimensions, TouchableWithoutFeedback, ActivityIndicator, Platform} from 'react-native';
import {Overlay} from 'teaset';
import Spinkit from 'react-native-spinkit';
const {width, height} = Dimensions.get('window');
export class LoadingUtils {
    static hint;
    static overlayView;
    static isShow = false;
    static key;
    static canCanel = true;

    /**
     * 显示一个加载指示框
     * @param hint  提示
     * @param type  加载框的类型  具体用法  (https://github.com/maxs15/react-native-spinkit)
     * {CircleFlip,Bounce,Wave,WanderingCubes,Pulse,ChasingDots,ThreeBounce,Circle,9CubeGrid,WordPress (IOS only),
     * FadingCircle,FadingCircleAlt,Arc (IOS only),ArcAlt (IOS only)}
     * @param loadView  自定义加载框
     */
    static show(hint = '加载中...', type = 'Wave', loadView = null) {
        this.hide();
        if (!this.overlayView || hint !== this.hint) {
            if (!loadView) {
                loadView = <TouchableWithoutFeedback
                    style={{width: width, height: height, alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.canCanel && this.hide() }>
                    <View style={{
                        width: 100,
                        height: 100,
                        backgroundColor: '#00000080',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10
                    }}>
                        <Spinkit color={'#fff'} type={type}/>
                        <Text style={{color: 'white', fontSize: 17}}>{hint}</Text>
                    </View>
                </TouchableWithoutFeedback>;
            }


            LoadingUtils.overlayView = (
                <Overlay.View
                    containerStyle={{width: width, height: height}}
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    overlayOpacity={0}
                    modal={!this.canCanel}
                >
                    {loadView}
                </Overlay.View>
            );
            LoadingUtils.hint = hint;
        }
        this.key = Overlay.show(LoadingUtils.overlayView);
        this.isShow = true
    }

    static hide() {
        Overlay.hide(LoadingUtils.key)
    }
}
