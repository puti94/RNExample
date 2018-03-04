/**
 * User: puti.
 * Time: 2018/3/1 下午5:51.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */

import {BasePageStore}  from './BasePageStore'
import {observable, action} from 'mobx'
export class UtilsPageStore extends BasePageStore {

    @observable chooseArea = {province: '未选择', city: '未选择', area: '未选择'};

    @action
    setChooseArea(area) {
        this.chooseArea = area
    }
}