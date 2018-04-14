/**
 * User: puti.
 * Time: 2018/2/27 上午9:23.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */

import {BasePageStore} from './BasePageStore'
import {Toast} from 'teaset'
import {HttpUtil} from '../utils/HttpUtil'
import {WANGYINEWS} from "../base/Constant";

export class NewsStore extends BasePageStore {

    constructor() {
        super([]);
        this.loadData()
    }

    loadData() {
        this.data.length === 0 && this.setLoading(true);
        HttpUtil.get(WANGYINEWS.url, WANGYINEWS.params, {show: this.data.length !== 0})
            .then(res => {
                this.data.length === 0 && this.setLoading(false);
                this.setData(res)
            })
            .catch(e => {
                this.data.length === 0 ? this.setError(true, e.msg) : Toast.fail('请求失败')
            })
    }
}
