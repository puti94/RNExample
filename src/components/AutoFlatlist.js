import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {observable, action, toJS, computed} from 'mobx';
import {observer} from 'mobx-react';
import {LoadingView} from "./LoadingView";
import {ErrorView} from "./ErrorView";

@observer
export default class AutoFlatList extends Component {
    static propTypes = {
        ...FlatList.propTypes,
        fetchData: PropTypes.func.isRequired, //传入页数返回一个Promise
        enableLoadMore: PropTypes.bool, //是否能上拉加载
        enableRefresh: PropTypes.bool, //是否能下拉刷新
        judgeNoMoreData: PropTypes.func, //传入newData返回一个boolean决定是否没有最新数据
        dataChange: PropTypes.func, //传入newData返回一个boolean决定是否没有最新数据
        catchHandle: PropTypes.func, //fetchData的异常捕获处理
        ListLoadMoringComponent: PropTypes.element, //正在加载更多的组件
        ListLoadMoredComponent: PropTypes.element, //加载更多完成的组件
        ListNoMoreDataComponent: PropTypes.element, //没有更多数据的组件
        emptyTitle: PropTypes.string, //空view的文字
        onRefreshCallBack: PropTypes.func, //下拉刷新的回调事件
        loadingView: PropTypes.element //初次加载的loading视图
    };

    static defaultProps = {
        enableLoadMore: true,
        enableRefresh: true,
        emptyTitle: '暂无数据',
        judgeNoMoreData: (newData, page) => newData.length < 10
    };

    //数据源
    @observable data = [];
    //页数
    page = 1;
    //是否在下拉加载状态
    @observable isTopRefresh = false;
    //是否在上拉加载状态
    @observable isEndRefresh = false;
    //没有更多数据的状态
    @observable isNoMoreData = false;
    //是否显示loading
    @observable isLoading = true;

    @observable error = null;

    @computed
    get isArrayEmpty() {
        return this.data.length === 0;
    }

    @action
    setData(data) {
        if (this.error) this.error = null;
        this.isNoMoreData = this.props.judgeNoMoreData(data, this.page);
        this.isLoading = false;
        if (this.page === 1) {
            this.data = data;
            if (this.isTopRefresh) this.isTopRefresh = false;
        } else {
            this.data.push(...data);
            setTimeout(action(() => (this.isEndRefresh = false)), 100);
        }
        this.props.dataChange && this.props.dataChange(this.data);
    }

    componentDidMount() {
        this.loadData();
    }

    /**
     * 返回数据
     * @returns {Array|any}
     */
    getItems() {
        return toJS(this.data);
    }

    /**
     * 加载数据
     */
    loadData = () => {
        if (this.error) this.isLoading = true;
        this.props
            .fetchData(this.page)
            .then(data => this.setData(data))
            .catch(
                action(e => {
                    this.isLoading = false;
                    if (this.props.catchHandle) {
                        this.props.catchHandle(e, this);
                    } else {
                        this.error = e;
                    }
                })
            );
    };

    @action
    onEndReached = info => {
        if (
            this.data.length === 0 ||
            this.isTopRefresh ||
            this.isEndRefresh ||
            this.isNoMoreData ||
            !this.props.enableLoadMore
        )
            return;
        this.page += 1;
        this.isEndRefresh = true;
        this.loadData();
    };

    @action
    onRefresh = () => {
        this.page = 1;
        this.isTopRefresh = true;
        this.isNoMoreData = false;
        this.loadData();
        this.props.onRefreshCallBack && this.props.onRefreshCallBack();
    };

    render() {
        const {loadingView, enableRefresh, ...otherProps} = this.props;

        const _loadingView = loadingView ? loadingView : <LoadingView/>;

        if (this.isLoading) {
            return _loadingView;
        }
        if (this.error) {
            return <ErrorView onPress={this.loadData}/>;
        }
        if (this.isArrayEmpty) {
            return <EmptyView {...otherProps} />;
        }

        return (
            <FlatList
                style={[styles.container, this.props.style]}
                refreshing={this.isTopRefresh}
                onRefresh={enableRefresh ? this.onRefresh : null}
                onEndReachedThreshold={0.1}
                onEndReached={this.onEndReached}
                data={this.data.slice()}
                keyExtractor={(item, index) => index + ''}
                {...this.props}
                ListFooterComponent={this.renderFooter()}
            />
        );
    }

    renderFooter() {
        if (this.props.ListFooterComponent) {
            return (
                <View>
                    {this.props.ListFooterComponent}
                    <FootView {...this.props} parent={this}/>
                </View>
            );
        } else {
            return <FootView {...this.props} parent={this}/>;
        }
    }
}

export class EmptyView extends Component {
    render() {
        const {emptyTitle, style} = this.props;
        return (
            <View style={[styles.emptyContainer, style]}>
                <Text style={styles.emptyText}>{emptyTitle}</Text>
            </View>
        );
    }
}

@observer
export class FootView extends Component {
    render() {
        const {
            parent,
            ListLoadMoringComponent,
            ListNoMoreDataComponent,
            ListLoadMoredComponent,
            enableLoadMore
        } = this.props;
        const {data, isEndRefresh, isNoMoreData, onEndReached} = parent;

        if (data.length === 0) {
            return null;
        }
        if (ListLoadMoringComponent && isEndRefresh) {
            return ListLoadMoringComponent;
        }
        if (ListNoMoreDataComponent && isNoMoreData) {
            return ListNoMoreDataComponent;
        }
        if (ListLoadMoringComponent && !isEndRefresh) {
            return ListLoadMoredComponent;
        }
        return enableLoadMore ? (
            <View style={styles.loadMoreView}>
                {isEndRefresh ? <ActivityIndicator/> : null}
                <Text
                    style={styles.text}
                    onPress={onEndReached}
                >
                    {isEndRefresh
                        ? '正在加载中...'
                        : isNoMoreData ? '------暂无数据------' : '点击加载更多'}
                </Text>
            </View>
        ) : null;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadMoreView: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 13
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center'
    }
});
