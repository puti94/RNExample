import React, {Component} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {LoadingView} from "./LoadingView";
import {ErrorView} from "./ErrorView";
import NavBar from './NavBar'

@observer
export default class BaseContainer extends Component {
    static propTypes = {
        store: PropTypes.object,
        onErrorPress: PropTypes.func,
        navBar: PropTypes.element,

        title: PropTypes.string,
        hideLeft: PropTypes.bool,
        leftPress: PropTypes.func,
        leftTitle: PropTypes.string,
        leftView: PropTypes.element,
        leftIcon: PropTypes.any,
        hideRight: PropTypes.bool,
        rightPress: PropTypes.func,
        rightView: PropTypes.element,
        rightIcon: PropTypes.any,
        rightTitle: PropTypes.string,
        hasShadow: PropTypes.bool
    };

    defaultPress = () => {
        const {store} = this.props;
        store.loadData()
    };

    renderContent() {
        const {store, children, onErrorPress} = this.props;
        if (!store) return children;
        const {isLoading, isError} = store;
        if (isLoading) return <LoadingView/>;
        if (isError) return <ErrorView onPress={onErrorPress || this.defaultPress}/>;
        return children;
    }


    renderNavView() {
        const {navBar, ...navProps} = this.props;
        let navView = null;
        if (typeof navBar === 'undefined') {
            navView = <NavBar {...navProps}/>
        } else {
            navView = navBar;
        }
        return navView
    }

    render() {

        return <View style={styles.container}>
            {this.renderNavView()}
            {this.renderContent()}
        </View>
    }
}
const styles = StyleSheet.create({
    container: {flex: 1}
});