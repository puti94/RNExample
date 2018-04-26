/**
 * User: puti.
 * Time: 2018/4/24 下午8:37.
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';
import UITest from "../components/UITest";
import BaseContainer from "../components/BaseContainer";

export default class CustomNativeUIPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '改变前'
        };
    }


    render() {
        return (
            <BaseContainer style={styles.container}>
                <Button title='改变文字' onPress={() => {
                    this.setState({text: '改变后'})
                }}/>
                <UITest customText={this.state.text} style={{width: 100, height: 100, backgroundColor: 'red'}}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
