/**
 * User: puti.
 * Time: 2018/3/5 下午2:14.
 * GitHub:https://github.com/puti94
 * Email:1059592160@qq.com
 */


import React, {Component} from 'react';
import {
    View,
    Animated,
    Easing
} from 'react-native';
import {ListRow} from 'teaset'
import {startAddShopAnim, ShoppingCarView} from './src/components/ShoppingCarView'

export default class TestComponent extends Component {

    constructor(props) {
        super(props);
        this.x = new Animated.Value(100);
        this.y = new Animated.Value(100);
        this.rotateZ = new Animated.Value(0);

        this.state = {
            rotateZ: new Animated.Value(0)
        }
    }


    render() {
        return <View style={{flex: 1}}>
            <ListRow
                ref={ref => this.tagView = ref}
                title='测试' onPress={() => {
                startAddShopAnim(<View
                    style={{width: 50, height: 50, backgroundColor: 'green'}}/>, {
                    afterView: this.tagView, beforeValue: {x: 200, y: 200}
                })
            }}/>

            <View
                ref={ref => this.toView = ref}
                style={{width: 30, height: 30, position: 'absolute', bottom: 10, right: 10, backgroundColor: 'blue'}}/>

            <ShoppingCarView ref={'anim'}/>
        </View>
    }
}

