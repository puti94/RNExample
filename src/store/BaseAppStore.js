/**
 * User: puti.
 * Time: 2018/2/27 上午9:42.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */
import {UserStore} from './UserStore'
import {ThemeStore} from './ThemeStore'
import {ShopCarStore} from './ShopCarStore'


export class BaseAppStore {
    userStore: UserStore;
    themeStore: ThemeStore;
    shopCar: ShopCarStore;

    constructor() {
        this.userStore = new UserStore();
        this.themeStore = new ThemeStore();
        this.shopCar = new ShopCarStore();
    }
}