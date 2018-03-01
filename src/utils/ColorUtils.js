/**
 * User: puti.
 * Time: 2017/12/4 下午1:14.

 */
import React from 'react'
import {View, ScrollView, Text} from 'react-native';
import {Overlay, Button} from 'teaset';
import {Dimensions, StatusBar} from 'react-native';
const {width, height} = Dimensions.get('window');

let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;


export default class ColorUtils {

    /*16进制颜色转为RGB格式*/
    static hex2Rgb(hex) {
        let sColor = hex.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = "#";
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            let sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return "RGB(" + sColorChange.join(",") + ")";
        } else {
            return sColor;
        }
    }


    /**
     * 颜色是否是浅色
     * @param hex  hex颜色值
     * @param threshold  阈值默认192
     * @returns {boolean}
     */
    static isColorLight(hex, threshold = 192) {
        let RgbValue = this.hex2Rgb(hex).replace("RGB(", "").replace(")", "");
        let RgbValueArry = RgbValue.split(",");
        let grayLevel = RgbValueArry[0] * 0.299 + RgbValueArry[1] * 0.587 + RgbValueArry[2] * 0.114;
        if (grayLevel >= threshold) {
            return true
        } else {
            return false
        }
    }

    /**
     * 打开颜色选择器
     * @param images 图片数组
     * @param onPress 图片单击事件
     * @param index  默认显示
     */
    static showChooseColor(onPress) {
        let ppw = null;
        let ThemeFlags = {
            default: '#2196F3',
            blueviolet: '#8a2be2',
            brown: '#a52a2a',
            burlywood: '#deb887',
            cadetblue: '#5f9ea0',
            chocolate: '#d2691e',
            coral: '#ff7f50',
            cornflowerblue: '#6495ed',
            crimson: '#dc143c',
            darkblue: '#00008b',
            darkcyan: '#008b8b',
            darkgoldenrod: '#b8860b',
            darkgreen: '#006400',
            darkgrey: '#a9a9a9',
            darkkhaki: '#bdb76b',
            darkmagenta: '#8b008b',
            darkolivegreen: '#556b2f',
            darkorange: '#ff8c00',
            darkorchid: '#9932cc',
            darkred: '#8b0000',
            darksalmon: '#e9967a',
            darkseagreen: '#8fbc8f',
            darkslateblue: '#483d8b',
            darkslategray: '#2f4f4f',
            darkturquoise: '#00ced1',
            darkviolet: '#9400d3',
            deepskyblue: '#00bfff',
            dimgray: '#696969',
            dodgerblue: '#1e90ff',
            firebrick: '#b22222',
            forestgreen: '#228b22',
            gold: '#ffd700',
            goldenrod: '#daa520',
            gray: '#808080',
            green: '#008000',
            greenyellow: '#adff2f',
            hotpink: '#ff69b4',
            indianred: '#cd5c5c',
            indigo: '#4b0082',
            khaki: '#f0e68c',
            limegreen: '#32cd32',
            magenta: '#ff00ff',
            maroon: '#800000',
            mediumaquamarine: '#66cdaa',
            mediumblue: '#0000cd',
            mediumorchid: '#ba55d3',
            mediumpurple: '#9370db',
            mediumseagreen: '#3cb371',
            mediumslateblue: '#7b68ee',
            mediumturquoise: '#48d1cc',
            mediumvioletred: '#c71585',
            midnightblue: '#191970',
            navy: '#000080',
            olive: '#808000',
            olivedrab: '#6b8e23',
            orange: '#ffa500',
            orangered: '#ff4500',
            orchid: '#da70d6',
            palevioletred: '#db7093',
            peru: '#cd853f',
            plum: '#dda0dd',
            purple: '#800080',
            rebeccapurple: '#663399',
            rosybrown: '#bc8f8f',
            royalblue: '#4169e1',
            saddlebrown: '#8b4513',
            salmon: '#fa8072',
            sandybrown: '#f4a460',
            seagreen: '#2e8b57',
            sienna: '#a0522d',
            skyblue: '#87ceeb',
            slateblue: '#6a5acd',
            slategray: '#708090',
            steelblue: '#4682b4',
            tan: '#d2b48c',
            teal: '#008080',
            tomato: '#ff6347',
            turquoise: '#40e0d0',
            violet: '#ee82ee',
            yellowgreen: '#9acd32',
        };
        let views = [];
        let barHidden = StatusBar.hidden;
        for (let key in ThemeFlags) {
            views.push(<Button key={key} onPress={() => {
                    onPress(ThemeFlags[key]);
                    if (!barHidden) StatusBar.setHidden(false);
                    ppw.close();
                }} style={{
                    width: (width - 20) / 5 - 5,
                    height: width / 5 - 5,
                    borderRadius: 3,
                    marginTop: 5,
                    borderWidth: 0,
                    backgroundColor: ThemeFlags[key]
                }} title={key} titleStyle={{color: 'white', fontSize: 12}}/>
            )
        }

        let overlayView = (
            <Overlay.PopView
                containerStyle={{width: width, height: height}}
                style={{alignItems: 'center', justifyContent: 'center'}}
                overlayOpacity={0.7}
                type='zoomIn'
                ref={v => ppw = v}
            >
                <ScrollView
                    style={{width: width, height: height}}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        marginRight: 10, marginLeft: 10,
                        flexWrap: 'wrap'
                    }}>
                        {views}
                    </View>
                    <Button style={{margin: 10, borderColor: 'white', backgroundColor: '#00000000', height: 30}}
                            title="取消"
                            titleStyle={{color: 'white'}}
                            onPress={() => {
                                if (!barHidden) StatusBar.setHidden(false);
                                ppw.close()
                            }}/>
                </ScrollView>
            </Overlay.PopView>
        );

        if (!barHidden) StatusBar.setHidden(true);
        Overlay.show(overlayView);
    }

}
