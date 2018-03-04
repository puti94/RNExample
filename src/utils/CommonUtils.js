/**
 * Created by puti on 2017/11/3.
 */

import React from 'react'
import {StatusBar} from 'react-native';
import {AlbumView, Overlay} from 'teaset'
import ChooseCityWheel from "../components/ChooseCityWheel";

export class CommonUtils {


    /**
     * 显示大图
     * @param actionView  点击的组件
     * @param index  默认显示
     * @param images  图片数组
     * @param onPress  点击图片关闭后回调
     */
    static showBigImages(actionView, index, images, onPress) {
        actionView.measureInWindow((x, y, width, height) => {
            let overlayView = (
                <Overlay.PopView
                    containerStyle={{flex: 1}}
                    overlayOpacity={1}
                    type='custom'
                    customBounds={{x, y, width, height}}
                    ref={v => this.fullImageView = v}
                >
                    <AlbumView
                        style={{flex: 1}}
                        control={true}
                        images={images}
                        defaultIndex={index}
                        onPress={(index, event) => {
                            this.fullImageView && this.fullImageView.close();
                            onPress && onPress(index, event)
                        }}
                    />
                    <StatusBar animated={false} hidden={true}/>
                </Overlay.PopView>
            );
            Overlay.show(overlayView);
        });

    }

    /**
     *
     * 以Base64位字符串数据的形式返回一个图片的source
     * @param data
     * @returns {{uri: string}}
     */
    static base64Image(data) {
        return `data:image/png;base64,${data}`
    }

    /**
     * 显示城市选择控件
     * @param sureClick      点击确认后回调
     * @param onValueChange  每次数据改变后回调
     */
    static showChooseCity(sureClick: (value: { province: string, city: string, area: string }) => void,
                          onValueChange: (value: { province: string, city: string, area: string }) => void) {
        let key = null;
        let overlayView = (
            <Overlay.PullView
                containerStyle={{height: 250}}
                style={{alignItems: 'center', justifyContent: 'center'}}
                overlayOpacity={0.2}
                side='bottom'
            >
                <ChooseCityWheel
                    onSurePress={(value) => {
                        Overlay.hide(key);
                        sureClick && sureClick(value)
                    }} onValueChange={onValueChange} onCancelPress={() => Overlay.hide(key)}/>
            </Overlay.PullView>
        );
        key = Overlay.show(overlayView);
    }

    static lastClickTime = 0;

    /**
     * 是否连续点击
     * @param delay 间隔,默认1000ms
     * @returns {boolean}
     */
    static isFastClick(delay: number = 1000) {
        let nowTime = Date.now();
        if ((nowTime - this.lastClickTime) <= delay) {
            return true
        } else {
            this.lastClickTime = nowTime;
            return false
        }
    }
}