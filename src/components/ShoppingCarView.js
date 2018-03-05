/**
 * User: puti.
 * Time: 2018/3/5 下午2:14.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */


import React, {Component} from 'react';
import {
    Animated,
    Easing
} from 'react-native';

let singleView = null;

/**
 * 开启购物车添加动画
 * @param child  需要动画的组件如传入一个<Image/>
 * @param params 传入一些所需的参数,与值默认用值，没有传入值会测量组件位置获得开始和结束位置
 */
export function startAddShopAnim(child,
                                 params: {
                                     beforeValue: Object,//开始值如{x:0,y:0}
                                     beforeView: Object,//开始的组件如this.refs.xxx
                                     afterValue: Object,//结束值如{x:100,y:100}
                                     afterView: Object,//结束组件如this.refs.xxx
                                     duration: number,//时间 默认1000ms
                                     endScale: number,//结束缩放比例 默认0.1
                                     endRotateZ: number,//结束旋转角度 默认720
                                     callBack: () => void//动画结束的回调
                                 }) {
    if (!singleView) {
        console.error(`请渲染ShoppingCarView组件`);
        return;
    }
    singleView.startAnim(child, params)
}


export class ShoppingCarView extends Component {

    constructor(props) {
        super(props);
        this.x = new Animated.Value(0);
        this.y = new Animated.Value(0);
        this.rotateZ = new Animated.Value(0);
        this.scale = new Animated.Value(1);
        this.state = {
            child: null,
            hide: true,
        }
    }

    componentDidMount() {
        singleView = this;
    }

    componentWillUnmount() {
        singleView = null;
    }

    /**
     *
     * @param child  进行动画的组件
     * @param params
     * @returns {Promise<void>}
     */
    async startAnim(child, params: {
        beforeValue: Object,
        beforeView: Object,
        afterValue: Object,
        afterView: Object,
        duration: number,
        endScale: number,
        endRotateZ: number,
        callBack: () => void
    }) {
        let beforeX = 0;
        let beforeY = 0;
        let afterX = 0;
        let afterY = 0;
        if (params.beforeValue) {
            beforeX = params.beforeValue.x;
            beforeY = params.beforeValue.y;
        } else {
            let beforeValue = await this.measureView(params.beforeView);
            beforeX = beforeValue.x + beforeValue.width / 2;
            beforeY = beforeValue.y + beforeValue.height / 2;
        }

        if (params.afterValue) {
            afterX = params.afterValue.x;
            afterY = params.afterValue.y;
        } else {
            let afterValue = await this.measureView(params.afterView);
            afterX = afterValue.x + afterValue.width / 2;
            afterY = afterValue.y + afterValue.height / 2;
        }
        this._animStart(beforeX, beforeY, afterX, afterY,
            params.duration ? params.duration : 1000,
            params.endScale ? params.endScale : 0.1,
            params.endRotateZ ? params.endRotateZ : 720,
            params.callBack ? params.callBack : () => {
            });
        this.setState({
            child: child,
            hide: false
        });

    }

    _animStart(beforeX, beforeY, afterX, afterY, duration, endScale, endRotateZ, callBack) {
        this.x.setValue(beforeX);
        this.y.setValue(beforeY);
        this.rotateZ.setValue(0);
        this.scale.setValue(1);
        let isI = Math.abs(beforeX - afterX) > Math.abs(beforeY - afterY);
        Animated.parallel([
            Animated.timing(this.x, {
                toValue: afterX,
                duration: duration,
                easing: isI ? Easing.cubic : Easing.linear,// 线性的渐变函数
            }),
            Animated.timing(this.y, {
                toValue: afterY,
                duration: duration,
                easing: isI ? Easing.linear : Easing.cubic,// 线性的渐变函数
            }),
            Animated.timing(this.rotateZ, {
                toValue: endRotateZ,
                duration: duration,
                easing: Easing.linear,// 线性的渐变函数
            }),
            Animated.timing(this.scale, {
                toValue: endScale,
                duration: duration,
                easing: Easing.cubic,// 线性的渐变函数
            })
        ]).start(() => {
            callBack();
            this.setState({
                hide: true,
                child: null,
            })
        });
    }

    measureView(view) {
        return new Promise((resolve) => {
            view.measureInWindow((x, y, width, height) => resolve({x, y, width, height}))
        });
    }

    render() {
        return !this.state.hide ? <Animated.View
            style={{
                position: 'absolute',
                left: this.x,
                top: this.y,
                transform: [{
                    rotateZ: this.rotateZ.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                    })
                }, {
                    scale: this.scale
                }]
            }}>
            {this.state.child}
        </Animated.View> : null
    }
}