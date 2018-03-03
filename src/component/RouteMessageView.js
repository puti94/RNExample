/**
 * User: puti.
 * Time: 2018/3/2 下午4:54.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {Component} from 'react';
import {
    FlatList,
    Text,
    Animated, PanResponder,
} from 'react-native';

@observer
export default class RouteMessageView extends Component {

    @observable hide = false;

    @action setHide(hide) {
        this.hide = hide
    }

    _previousLeft = 0;
    _previousBottom = 0;
    _viewStyles = {};

    constructor(props) {
        super(props);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
        this._viewStyles = {
            style: {
                left: this._previousLeft,
                bottom: this._previousBottom,
            }
        };
    }


    _handlePanResponderMove = (e: Object, gestureState: Object) => {
        this._viewStyles.style.left = this._previousLeft + gestureState.dx;
        this._viewStyles.style.bottom = this._previousBottom - gestureState.dy;
        this._updatePosition();
    };

    _handlePanResponderEnd = (e: Object, gestureState: Object) => {
        this._previousLeft += gestureState.dx;
        this._previousBottom -= gestureState.dy;
        if (this._previousLeft < 0) {
            this._previousLeft = 0
        }
        if (this._previousBottom < 0) {
            this._previousBottom = 0
        }
        const _width = this.hide ? 50 : 130;
        if (this._previousLeft + _width > screenWidth) {
            this._previousLeft = screenWidth - _width;
        }
        const _height = 30;
        if (this._previousBottom + _height > screenHeight) {
            this._previousBottom = screenHeight - _height;
        }
        this._viewStyles.style.left = this._previousLeft;
        this._viewStyles.style.bottom = this._previousBottom;
        this._updatePosition()
    };

    _updatePosition() {
        this.refs['root'] && this.refs['root'].setNativeProps(this._viewStyles);
    }

    render() {
        return <Animated.View
            {...this.panResponder.panHandlers}
            style={{
                position: 'absolute',
                width: this.hide ? 50 : 130,
                opacity: 0.7,
                borderRadius: 5,
                backgroundColor: 'gray',
                alignItems: 'center',
                bottom: 0
            }} ref="root">
            {!this.hide ? <FlatList
                style={{
                    flex: 1
                }}
                data={RouteHelper.routeStack.slice().reverse()}
                keyExtractor={(item, i) => item.key}
                renderItem={({item, index}) => <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={{color: 'white'}}
                    onPress={() => RouteHelper.goBackTo(item.routeName)}>{`[${RouteHelper.routeStack.slice().length - index}] ${item.routeName}`}</Text>}
            /> : null}
            <Text style={{color: 'white', padding: 5}} onPress={() => {
                this.setHide(!this.hide)
            }}>{this.hide ? '显示' : '隐藏'}</Text>
        </Animated.View>
    }
}