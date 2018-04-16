/**
 * User: puti.
 * Time: 2018/4/14 下午5:37.
 */

/**
 * 添加组件的的自定义属性
 * @param WrapComponent 组件
 * @param customProps 默认属性
 */
export const addCustomProps = (WrapComponent, customProps) => {
    const componentRender = WrapComponent.prototype.render;
    const componentDefaultProps = WrapComponent.prototype.constructor.defaultProps;
    WrapComponent.prototype.constructor.defaultProps = {
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