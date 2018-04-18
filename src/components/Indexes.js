/**
 * User: puti.
 * Time: 2018/4/18 下午4:52.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ViewPropTypes, Animated} from 'react-native';
import PropTypes from 'prop-types';

let str = [];
for (let i = 65; i < 91; i++) {
    str.push(String.fromCharCode(i));
}

export default class Indexes extends Component {
    static propTypes = {
        //父容器距离屏幕顶部的距离
        fixTop: PropTypes.number,
        data: PropTypes.array,
        onIndexChange: PropTypes.func,
        renderItem: PropTypes.func,
        style: ViewPropTypes.style,
        touchStyle: ViewPropTypes.style,
        defaultStyle: ViewPropTypes.style,
        index: PropTypes.number
    };

    static defaultProps = {
        fixTop: 0,
        touchStyle: {backgroundColor: '#0002'},
        defaultStyle: {backgroundColor: '#0000', width: 25},
        style: {top: 0},
        data: str,
        renderItem: ({item, index, selectedIndex}) => (
            <Text key={item} style={{
                fontSize: index === selectedIndex ? 18 : 13,
                color: index === selectedIndex ? 'black' : 'gray'
            }}>
                {item}
            </Text>
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== this.props.index && Math.abs(nextProps.index - this.props.index) <= 1) {
            const {touchStyle, defaultStyle} = this.props;
            this.setState({
                index: nextProps.index,
                ...touchStyle
            });
            this._restore()
        }
    }

    onResponderMove = ({nativeEvent}) => {
        this.compute(nativeEvent);
    };
    onResponderRelease = ({nativeEvent}) => {
        this._restore()
    };

    onStartShouldSetResponder = ({nativeEvent}) => {
        return this.compute(nativeEvent);
    };

    _restore = () => {
        const {defaultStyle} = this.props;
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState(defaultStyle)
        }, 500)
    };

    compute = nativeEvent => {
        const {fixTop, data, touchStyle, onIndexChange, style} = this.props;
        const sectionHeight = this.height / data.length;
        const top = style.top || 0;
        const locationY = nativeEvent.pageY - this.marginTop - fixTop - top;
        const index = parseInt(locationY / sectionHeight);
        //拦截一些事件
        if (index < 0 || index > data.length - 1 || index === this.state.index)
            return true;

        onIndexChange && onIndexChange(index);
        this.setState({index: index, ...touchStyle});
        return true;
    };

    onLayout = ({nativeEvent}) => {
        this.height = nativeEvent.layout.height;
        this.marginTop = nativeEvent.layout.y;
    };

    render() {
        const {data, renderItem, style, defaultStyle} = this.props;
        const {index, ...otherState} = this.state;
        return (
            <View style={[styles.container, style]}>
                <View
                    onLayout={this.onLayout}
                    onResponderMove={this.onResponderMove}
                    onStartShouldSetResponder={this.onStartShouldSetResponder}
                    onMoveShouldSetResponderCapture={() => true}
                    onResponderRelease={this.onResponderRelease}
                    onMoveShouldSetResponder={() => true}
                    style={[
                        {
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            borderRadius: 5
                        },
                        defaultStyle,
                        {...otherState}
                    ]}
                >
                    {data.map((item, i) =>
                        renderItem({item, index: i, selectedIndex: index})
                    )}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 0,
        width: 30,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
