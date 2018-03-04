/**
 * User: puti.
 * Time: 2018/2/27 上午9:42.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {UserStore} from './UserStore'
import {ShopCarStore} from './ShopCarStore'


export class BaseAppStore {
    userStore: UserStore;
    shopCar: ShopCarStore;

    constructor() {
        this.userStore = new UserStore();
        this.shopCar = new ShopCarStore();
    }
}