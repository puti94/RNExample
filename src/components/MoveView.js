/**
 * User: puti.
 * Time: 2018/3/2 下午4:54.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */


import React, {PureComponent} from 'react';
import {
    View,
    PanResponder,
    StyleSheet,
    Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class MoveView extends PureComponent {


    _previousLeft = 0;
    _previousTop = 0;
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
        const {style = {}} = this.props;
        this._previousTop = style.top || 0;
        this._previousLeft = style.left || 0;

        this._viewStyles = {
            style: {
                left: this._previousLeft,
                top: this._previousTop,
            }
        };
    }

    _handlePanResponderMove = (e: Object, gestureState: Object) => {
        this._viewStyles.style.left = this._previousLeft + gestureState.dx;
        this._viewStyles.style.top = this._previousTop + gestureState.dy;
        this._updatePosition();
    };

    _handlePanResponderEnd = (e: Object, gestureState: Object) => {
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
        if (this._previousLeft < 0) {
            this._previousLeft = 0
        }
        if (this._previousTop < 0) {
            this._previousTop = 0
        }
        if (this._previousLeft + this._width > width) {
            this._previousLeft = width - this._width;
        }
        if (this._previousTop + this._height > height) {
            this._previousTop = height - this._height;
        }
        this._viewStyles.style.left = this._previousLeft;
        this._viewStyles.style.top = this._previousTop;
        this._updatePosition()
    };

    _updatePosition() {
        this.refs['root'].setNativeProps(this._viewStyles);
    }

    _onLayout = ({nativeEvent}) => {
        const {width, height} = nativeEvent.layout;
        this._width = width;
        this._height = height;
    }

    render() {
        const {style, children} = this.props;
        return <View
            {...this.panResponder.panHandlers}
            style={[styles.container, style]}
            ref="root"
            onLayout={this._onLayout}
        >
            {children}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute'
    }
})