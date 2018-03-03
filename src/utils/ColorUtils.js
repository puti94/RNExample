/**
 * User: puti.
 * Time: 2017/12/4 下午1:14.
 */
import React from 'react'

let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;


export class ColorUtils {

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
        return grayLevel >= threshold;
    }


}
