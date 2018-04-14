/**
 * User: puti.
 * Time: 2018/3/5 下午2:14.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */


import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types'
import {observable, action} from 'mobx';
import {observer} from 'mobx-react'

@observer
export class AutoFlatList extends Component {

    static propTypes = {
        ...FlatList.propTypes,
        fetchData: PropTypes.func.isRequired,//传入页数返回一个Promise
        enableLoadMore: PropTypes.bool,//是否能上拉加载
        enableRefresh: PropTypes.bool,//是否能下拉刷新
        judgeNoMoreData: PropTypes.func,//传入newData返回一个boolean决定是否没有最新数据
        catchHandle: PropTypes.func, //fetchData的异常捕获处理
        ListLoadMoringComponent: PropTypes.element,//正在加载更多的组件
        ListLoadMoredComponent: PropTypes.element,//加载更多完成的组件
        ListNoMoreDataComponent: PropTypes.element//没有更多数据的组件
    };

    static defaultProps = {
        enableLoadMore: true,
        enableRefresh: true,
        judgeNoMoreData: (newData) => newData.length < 10
    };


    //数据源
    @observable
    data = [];
    //页数
    page = 1;
    //是否在下拉加载状态
    @observable
    isTopRefresh = false;
    //是否在上拉加载状态
    @observable
    isEndRefresh = false;
    //没有更多数据的状态
    @observable
    isNoMoreData = false;


    @action
    setData = data => {
        this.isNoMoreData = this.props.judgeNoMoreData(data);
        if (this.page === 1) {
            this.data = data;
            if (this.isTopRefresh) this.isTopRefresh = false;
        } else {
            this.data.push(...data);
            this.isEndRefresh = false;
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.props.fetchData(this.page)
            .then(this.setData)
            .catch(e => {
                if (this.props.catchHandle) {
                    this.props.catchHandle(e, this)
                } else {
                    this.setData([])
                }
            });
    }

    onEndReached = action((info) => {
        if (this.data.length === 0 || this.isTopRefresh || this.isEndRefresh || this.isNoMoreData || !this.props.enableLoadMore) return;
        this.page += 1;
        this.isEndRefresh = true;
        this.loadData()
    });

    onRefresh = action(() => {
        this.page = 1;
        this.isTopRefresh = true;
        this.isNoMoreData = false;
        this.loadData();
    });

    render() {
        return <FlatList
            refreshing={this.isTopRefresh}
            onRefresh={this.props.enableRefresh ? this.onRefresh : null}
            ListEmptyComponent={this.renderEmpty()}
            onEndReachedThreshold={0.1}
            onEndReached={this.onEndReached}
            style={{flex: 1}}
            data={this.data}
            {...this.props}
            ListFooterComponent={this.renderFooter()}
        />
    }

    renderFooter() {
        if (this.props.ListFooterComponent) {
            return <View>
                {this.props.ListFooterComponent}
                <FootView parent={this}/>
            </View>
        } else {
            return <FootView parent={this}/>
        }
    }

    renderEmpty() {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>视图为空</Text>
        </View>
    }
}

@observer
class FootView extends Component {
    render() {
        console.log('FootView,render');
        if (this.props.parent.props.ListLoadMoringComponent && this.props.parent.isEndRefresh) {
            return this.props.parent.props.ListLoadMoringComponent
        }
        if (this.props.parent.props.ListNoMoreDataComponent && this.props.parent.isNoMoreData) {
            return this.props.parent.props.ListNoMoreDataComponent
        }
        if (this.props.parent.props.ListLoadMoringComponent && !this.props.parent.isEndRefresh) {
            return this.props.parent.props.ListLoadMoredComponent
        }

        return this.props.parent.props.enableLoadMore ?
            <View style={{height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                {this.props.parent.isEndRefresh ? <ActivityIndicator/> : null}
                <Text>{this.props.parent.isEndRefresh ? '正在加载中...' : (this.props.parent.isNoMoreData ? '我也是有底线的' : '加载完成')}</Text>
            </View> : null
    }

}
