import React, {Component} from 'react';
import {
    ViewPropTypes
} from 'react-native';

import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {LoadingView} from "./LoadingView";
import {ErrorView} from "./ErrorView";

@observer
export default class BaseContainer extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        store: PropTypes.object,
        onPress: PropTypes.func
    };

    defaultPress = () => {
        const {store} = this.props;
        store.loadData()
    };

    render() {
        const {store, children, onPress} = this.props;
        const {isLoading, isError} = store;
        if (isLoading) return <LoadingView/>;
        if (isError) return <ErrorView onPress={onPress || this.defaultPress}/>;
        return children;
    }
}
