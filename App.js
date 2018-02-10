/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AppNavigator} from "./src/root";

export default class App extends Component<Props> {
    render() {
        return (
            <AppNavigator/>
        );
    }
}
