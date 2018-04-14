/**
 * User: puti.
 * Time: 2018/4/6 下午9:46.
 */
import React, {Component} from 'react';
import {View, SwipeableFlatList, Button, StatusBar} from 'react-native'
import MoveView from "./src/components/MoveView";

StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('#0000')
export default class TestPage extends Component {

    aaa() {
        this.view.measure((x, y, w, h) => {
            console.log(x, y, w, h)
        })
    }

    render() {
        return <View style={{flex: 1}} ref={ref => this.view = ref}>

            <View>
                <Button title={'button'} onPress={() => {
                    this.aaa()
                }}/>

            </View>


            <MoveView
                style={{
                    // top: 100,
                    // left: 100
                    width: 100,
                    height: 100,
                    backgroundColor: 'red',
                    borderRadius: 50,
                    position: 'absolute'
                }}>
                <View style={{
                    width: 100,
                    height: 100,
                    backgroundColor: 'red',
                    borderRadius: 50
                }}/>
            </MoveView>
        </View>
    }


}