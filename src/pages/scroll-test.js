import React from 'react';
import DatePicker from "../components/datePicker/index";

export default class demo extends React.Component {
    state = {
        visible: false,
        visible2: false,
        val: [],
        val2: []
    }

    onVisibleChange = (visible) => {
        this.setState({
            visible
        })
    }
    onVisibleChange2 = (visible2) => {
        this.setState({
            visible2
        })
    }

    onOk = (val) => {
        this.setState({
            val
        })
    }

    onOk2 = (val2) => {
        this.setState({
            val2
        })
    }

    render() {
        const { visible,visible2,val } = this.state;
        const propsDatePicker = {
            onOk: this.onOk,
            onVisibleChange: this.onVisibleChange,
            visible,
            // defaultValue:[9,30],
            h: [9, 10, 11, 13, 14], // 小时数组
            hMapM: {                // 小时和分钟映射
                11: 30,
                14: 57
            },
            // minHM:[10,20]           // 最小十分开始
        }
        const propsDatePicker2 = {
            onOk: this.onOk2,
            onVisibleChange: this.onVisibleChange2,
            visible:visible2,
            defaultValue:val,
            h: [9, 10, 11, 13, 14], // 小时数组
            hMapM: {                // 小时和分钟映射
                11: 30,
                14: 57
            },
            minHM: val          // 最小十分开始
        }
        return (
            <div style={{ margin: '10px 30px' }}>
                <button onClick={this.onVisibleChange}>open</button>
                <button onClick={this.onVisibleChange2}>open2</button>
                <h1>1:{JSON.stringify(this.state.val)}</h1>
                <h1>2:{JSON.stringify(this.state.val2)}</h1>
                <DatePicker {...propsDatePicker} />
                <DatePicker {...propsDatePicker2} />
                
            </div>
        );
    }
}
