/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native';
import {Carousel, Button} from 'teaset'
import {observer} from 'mobx-react'
import {action, observable} from 'mobx'
import {RouteHelper} from 'react-navigation-easy-helper'
import {Theme} from '../store'

@observer
export default class GuidePage extends Component {

    static navigationOptions = {
        header: null
    };

    //引导页数据,替换成项目图片
    list = ['指导页面1', '指导页面2', '指导页面3'];

    @observable isShow = false;


    @action setShow(show) {
        this.isShow = show
    }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    control={
                        <Carousel.Control
                            style={styles.controlContainer}
                            dot={<Text
                                style={[styles.control, {color: Theme.baseColor,}]}>□</Text>}
                            activeDot={<Text
                                style={[styles.control, {color: Theme.baseColor,}]}>■</Text>}
                        />
                    }
                    cycle={false}
                    carousel={false}
                    style={styles.container}
                    onChange={(index, total) => {
                        this.setShow(index === total - 1);
                    }}>
                    {this.list.map(item => <Text style={{fontSize: 30}} key={item}>{item}</Text>)}
                </Carousel>
                {this.isShow ? <Button
                    style={{
                        position: 'absolute',
                        backgroundColor: Theme.baseColor,
                        top: SCREEN_HEIGHT - 60,
                        width: 120,
                        alignSelf: 'center',
                        height: 35,
                        borderColor: Theme.baseColor
                    }}
                    title={'立即体验'}
                    titleStyle={{color: 'white'}}
                    onPress={() => {
                        RouteHelper.reset('MainPage')
                    }}/> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    controlContainer: {
        alignItems: 'center'
    },
    control: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        padding: 4
    }
});