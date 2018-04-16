/**
 * 用户管理类
 * Created by puti on 2017/11/4.
 */
import {observable, action, computed, autorun} from 'mobx';

export class ShopCarStore {

    @observable
    data: [ShopData] = [];
    @observable
    isEditMode: boolean = false;
    @observable
    isAllCheck: boolean = true;


    constructor() {
        autorun(() => {
            console.log('购物车数据', this.data);
            if (this.isArrayEmpty && this.isEditMode) {
                this.reversalEdit()
            }
        });
    }

    @action
    addShop = (shop): boolean => {
        let item = new ShopData(shop);
        let index = this.index(item);
        if (index === -1) {
            this.data.push(item)
        } else {
            this.data[index].addNumber();
        }
    }

    @action
    filterCheckShop() {
        this.data = this.data.filter(item => !item.check);
    }

    @action
    deleShop(item) {
        let index = this.index(item);
        if (index !== -1) {
            this.data.splice(index, 1)
        }
    }

    @action
    reversalEdit() {
        this.isEditMode = !this.isEditMode
    }

    @action
    setAllCheck(check) {
        if (!check && this.data.filter(item => !item.check).length === 0) {
            this.isAllCheck = true;
            return;
        }
        this.isAllCheck = check
    }

    @computed get checkNumber(): number {
        // return 0;
        return this.isAllCheck ? this.data.length : this.data.filter((item) => item.check).length;
    }

    @computed get isArrayEmpty(): number {
        return this.data.length === 0;
    }

    @computed get allPrice(): number {
        let i = 0;
        this.data.forEach((item) => {
            if (item.check || this.isAllCheck) {
                i += parseInt(item.price) * item.number;
            }
        });
        return i;
    }


    index(shop): number {
        for (let i = 0; i < this.data.length; i++) {
            let item = this.data[i];
            if (item.id === shop.id) {
                return i;
            }
        }
        return -1;
    }

}

class ShopData {
    @observable
    number: number;
    title: string;
    img: string;
    price: number;
    id: string;
    @observable
    check: boolean;

    constructor(item) {
        this.number = item.number ? item.number : 1;
        this.title = item.title;
        this.id = item.id;
        this.img = item.img;
        this.price = item.price;
        this.id = item.id;
        //默认选中
        this.check = true;
    }

    @action addNumber() {
        this.number += 1;
    }

    @action setNumber(number: number) {
        this.number = parseInt(number);
    }

    @action subNumber() {
        this.number -= 1;
        if (this.number <= 1) {
            this.number = 1;
        }
    }

    @action setCheck(check: boolean, car: ShopCarStore) {
        this.check = check;
        if (!check && car.isAllCheck) {
            car.setAllCheck(false)
        }
        if (!car.isAllCheck &&
            car.data.filter(item => !item.check).length === 0) {
            car.setAllCheck(true)
        }

    }
}
