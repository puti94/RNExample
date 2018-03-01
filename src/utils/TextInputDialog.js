/**
 * User: puti.
 * Time: 2017/12/19 下午3:38.
 * GitHub:https://github.com/puti94
 * Email:guoquanxie@foxmail.com
 */

import React, {PureComponent} from 'react';
import {
    View,
    Modal,
    Keyboard, Animated, TouchableOpacity, TextInput, Text,
    Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
const {width, height} = Dimensions.get('window');

export default class TextInputDialog extends PureComponent {

    static propTypes = {
        title: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        onSurePress: PropTypes.func.isRequired,
        inputParams: PropTypes.object
    };



    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            dialogMarginBottom: new Animated.Value(0)
        };
    }

    componentDidMount() {
        this.willChangeFrameListener = Keyboard.addListener('keyboardWillChangeFrame', e => this.keyboardWillChange(e));
    }

    componentWillUnmount() {
        this.willChangeFrameListener && this.willChangeFrameListener.remove()
    }

    setVisiable(visible) {
        this.setState({visible: visible})
    }

    /**
     *  键盘即将改变事件
     * @param event
     */
    keyboardWillChange(event) {
        if (event.easing === 'keyboard')
            if (event.startCoordinates.screenY - event.endCoordinates.screenY > 0) {
                //如果开始位置的Y轴坐标-结束位置的Y轴坐标大于0，则认定为键盘即将开启，则改变底部View的marginButtom的大小为键盘的高度动画
                Animated.timing(
                    this.state.dialogMarginBottom,
                    {
                        toValue: event.endCoordinates.height,
                        duration: event.duration,
                    }
                ).start();
            } else {
                //键盘关闭时改变marginButtom为0
                Animated.timing(
                    this.state.dialogMarginBottom,
                    {
                        toValue: 0,
                        duration: event.duration,
                    }
                ).start();
            }
    }


    render() {
        return (
            <Modal
                animationType={'fade'} visible={this.state.visible} transparent={true}
                onRequestClose={() => this.setState({visible: false})}

                onDismiss={() => this.changeName = ''}>

                <View style={{
                    flex: 1,
                    backgroundColor: '#0009',
                    borderWidth: 1,
                    borderColor: '#e6e6e6',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Animated.View style={{
                        width: width * 0.8,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        alignItems: 'center',
                        marginBottom: this.state.dialogMarginBottom
                    }}>
                        <Text style={{fontSize: 18, color: 'black', fontWeight: 'bold', margin: 10}}>修改昵称</Text>
                        <TextInput
                            autoFocus={true}
                            style={{
                                margin: 10,
                                width: width * 0.6,
                                borderWidth: 1,
                                borderColor: '#e6e6e6',
                                borderRadius: 3,
                                padding: 5
                            }}
                            numberOfLines={1}
                            placeholder={this.props.placeholder}
                            onChangeText={(text) => this.changeName = text}
                            underlineColorAndroid={'#0000'}
                            {...this.props.inputParams}/>
                        <View style={{
                            flexDirection: 'row',
                            width: width * 0.8,
                            height: 35,
                            borderTopWidth: 1,
                            borderTopColor: '#e6e6e6'
                        }}>
                            <TouchableOpacity
                                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => this.setState({visible: false})}>
                                <Text style={{color: '#4d88ff'}}>取消</Text>
                            </TouchableOpacity>
                            <View style={{backgroundColor: '#e6e6e6', width: 1}}/>
                            <TouchableOpacity
                                style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                                onPress={() => {
                                    this.setState({visible: false})
                                    this.props.onSurePress && this.props.onSurePress(this.changeName)
                                }}
                            >
                                <Text style={{color: '#4d88ff', fontWeight: 'bold'}}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                </View>
            </Modal>
        );
    }
}


