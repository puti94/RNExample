/**
 * User: puti.
 * Time: 2018/4/14 下午5:37.
 */
import {Component} from 'react'

export const setCustomProps = (WrapComponent, customProps) => {
    if (!WrapComponent instanceof Component) {
        console.warn(`${WrapComponent.displayName} is not a Component`);
        return;
    }
    const componentRender = WrapComponent.prototype.render;
    const componentDefaultProps = WrapComponent.prototype.defaultProps;
    WrapComponent.prototype.defaultProps = {
        ...componentDefaultProps,
        ...customProps
    };
    WrapComponent.prototype.render = function render() {
        let oldProps = this.props;
        this.props = {
            ...this.props,
            style: [customProps.style, oldProps.style]
        };
        return componentRender.apply(this)
    }
};