/**
 * 城市选择组件
 * Created by puti on 2017/11/2.
 */
import React, {Component}from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Wheel, Button} from 'teaset';
import PropsType from 'prop-types'
import AREA from '../res/json/area.json';
import {observer} from 'mobx-react';
import {observable, computed, action} from 'mobx'


@observer
export default class ChooseCityWheel extends Component {

    static propTypes = {
        onValueChange: PropsType.func,
        onCancelPress: PropsType.func,
        onSurePress: PropsType.func,
        ...View.propTypes
    };

    @observable provinceIndex = 0;
    @observable cityIndex = 0;
    @observable areaIndex = 0;

    get provinceList() {
        return AREA.map((item) => item['Name']);
    }

    @computed  get cityList() {
        return AREA[this.provinceIndex]['City'].map((item) => item['Name']);
    }

    @computed  get areaList() {
        return AREA[this.provinceIndex]['City'][this.cityIndex]['Area'].map((item) => item);
    }


    onValueChange() {
        this.props.onValueChange && this.props.onValueChange(this.getChooseValue())
    }

    onCancel = () => {
        this.props.onCancelPress && this.props.onCancelPress()
    };

    onSurePress = () => {
        this.props.onSurePress && this.props.onSurePress(this.getChooseValue())
    };

    getChooseValue = () => {
        return ({
            province: AREA[this.provinceIndex]['Name'],
            city: AREA[this.provinceIndex]['City'][this.cityIndex]['Name'],
            area: AREA[this.provinceIndex]['City'][this.cityIndex]['Area'][this.areaIndex]
        })
    };


    renderWheel = () => {
        let views = [];
        views.push(
            <Wheel
                key="1"
                style={styles.wheelStyle}
                itemStyle={styles.itemStyle}
                onChange={action((index) => {
                    this.provinceIndex = index;
                    this.cityIndex = 0;
                    this.areaIndex = 0;
                    this.onValueChange()
                })}
                holeLine={1}
                items={this.provinceList}
                defaultIndex={this.provinceIndex}/>);
        views.push(
            <Wheel
                key="2"
                style={styles.wheelStyle}
                itemStyle={styles.itemStyle}
                onChange={action((index) => {
                    this.cityIndex = index;
                    this.areaIndex = 0;
                    this.onValueChange()
                })}
                holeLine={1}
                index={this.cityIndex}
                items={this.cityList}
            />);

        views.push(
            <Wheel
                key="3"
                style={styles.wheelStyle}
                itemStyle={styles.itemStyle}
                onChange={action((index) => {
                    this.areaIndex = index;
                    this.onValueChange()
                })}
                holeLine={1}
                index={this.areaIndex}
                items={this.areaList}
            />);

        return views

    };

    render() {
        return ( <View style={{flex: 1}} {...this.props}>
            <View style={styles.container}>
                <Button title="取消" type={'link'}
                        onPress={this.onCancel}/>
                <Text style={{color: 'black', fontSize: 17}}>城市选择</Text>
                <Button title="确定" type={'link'}
                        onPress={this.onSurePress}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
                {this.renderWheel()}
            </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    wheelStyle: {
        flex: 1,
        backgroundColor: '#c5c7ce'
    },
    container: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    itemStyle: {
        textAlign: 'center',
        fontSize: 16,
        color: 'black'
    }
});