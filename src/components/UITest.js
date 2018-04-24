/**
 * User: puti.
 * Time: 2018/4/22 上午10:53.
 */


import React, {Component} from 'react';
import {requireNativeComponent} from 'react-native';
import PropTypes from 'prop-types'

const RCTUITest = requireNativeComponent('RCTUITest', null);

export default class UITest extends Component {

    static propTypes = {
        customText: PropTypes.string
    };

    render() {
        return (
            <RCTUITest  {...this.props}/>
        );
    }
}
