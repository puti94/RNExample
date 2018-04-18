/**
 * User: puti.
 * Time: 2018/4/18 下午8:22.
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    SectionList, Text, View
} from 'react-native';
import {BaseContainer, Indexes} from "../components";
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout'

export default class NotesPage extends Component {

    constructor(props) {
        super(props);
        let str = [];
        for (let i = 65; i < 91; i++) {
            let name = [];
            let key = String.fromCharCode(i);
            for (let j = 0; j < 10; j++) {
                name.push(`${key}${i}${j}`)
            }
            str.push({data: name, key});
        }
        this.data = str;
        this.getItemLayout = sectionListGetItemLayout({
            // The height of the row with rowData at the given sectionIndex and rowIndex
            getItemHeight: (rowData, sectionIndex, rowIndex) => 20,

            // These four properties are optional
            // getSeparatorHeight: () => 1 / PixelRatio.get(), // The height of your separators
            getSectionHeaderHeight: () => 20, // The height of your section headers
            // getSectionFooterHeight: () => 10, // The height of your section footers
            // listHeaderHeight: 40, // The height of your list header
        })
        this.state = {
            index: 0
        };
    }

    _renderItem = ({item}) => (
        <View style={{
            width: '100%', height: 20,
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor: '#aaa'
        }}><Text style={{
            color: 'gray', paddingLeft: 10,
        }}>{item}</Text></View>
    );
    _renderSectionHeader = ({section}) => (
        <Text style={{
            width: '100%',
            height: 20,
            fontWeight: 'bold',
            color: 'black',
            paddingLeft: 10,
            backgroundColor: '#ccc'
        }}>{section.key}</Text>
    );

    onViewableItemsChanged = (e) => {
        let key = e.viewableItems[0].section.key;
        let index = this.data.findIndex(item => key === item.key);
        this.setState({index: index});
        console.log(key)
    };

    _scrollToIndex = (index) => {
        this.sectionList.scrollToLocation({animated: false, sectionIndex: index, itemIndex: 0})
    };

    render() {
        return (
            <BaseContainer title={'模拟通讯录'}>
                <SectionList
                    ref={ref => this.sectionList = ref}
                    style={{flex: 1}}
                    getItemLayout={this.getItemLayout}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    stickySectionHeadersEnabled={true}
                    renderItem={this._renderItem}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    renderSectionHeader={this._renderSectionHeader}
                    sections={this.data}/>
                <Indexes index={this.state.index} onIndexChange={this._scrollToIndex}/>
            </BaseContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
