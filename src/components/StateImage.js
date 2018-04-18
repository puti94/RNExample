/**
 * User: puti.
 * Time: 2018/4/18 下午9:55.
 */
import React, {PureComponent} from 'react';
import {View, Image, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {images} from "../res";


export default class StateImage extends PureComponent {
    static propTypes = {
        ...Image.propTypes,
        url: PropTypes.string.isRequired,
        defaultSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
                width: PropTypes.number,
                height: PropTypes.number,
                scale: PropTypes.number
            }),
            PropTypes.number
        ]),
        errorSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
                width: PropTypes.number,
                height: PropTypes.number,
                scale: PropTypes.number
            }),
            PropTypes.number
        ]),
    };

    static defaultProps = {
        defaultSource: images.sand,
        errorSource: images.error,
    };

    static STATE = {
        LOADING: 'LOADING',
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR'
    };

    constructor(props) {
        super(props);
        this.state = {
            loadState: !this.props.url ? StateImage.STATE.ERROR : StateImage.STATE.LOADING
        };
    }


    onLoadEnd = () => {
        const isError = this[this.props.url];
        if (isError) {
            this[this.props.url] = false;
        }
        this.setState({
            loadState: isError ? StateImage.STATE.ERROR : StateImage.STATE.SUCCESS
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.url !== this.props.url)
            this.setState({
                loadState: !this.props.url
                    ? StateImage.STATE.ERROR
                    : StateImage.STATE.LOADING
            });
    }

    onError = e => {
        //标记此url错误
        this[this.props.url] = true;
    };

    render() {
        const {defaultSource, errorSource, style, url} = this.props;
        //图片地址为空的情况下直接返回错误图
        if (this.state.loadState === StateImage.STATE.ERROR) {
            return <Image {...this.props} source={errorSource}/>;
        }
        //根据平台判断,
        if (Platform.OS === 'ios') {
            return (
                <Image
                    {...this.props}
                    onLoadEnd={this.onLoadEnd}
                    onError={this.onError}
                    source={{uri: url}}
                />
            );
        } else {
            return (
                <View>
                    <Image
                        {...this.props}
                        source={{uri: url}}
                        onLoadEnd={this.onLoadEnd}
                        onError={this.onError}
                    />
                    {this.state.loadState === StateImage.STATE.LOADING && (
                        <Image
                            // resizeMode={Image.resizeMode.contain}
                            style={[style, {position: 'absolute'}]}
                            source={defaultSource}
                        />
                    )}
                </View>
            );
        }
    }
}
