import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import React from 'react';
import MultiPicker from "rmc-picker/lib/MultiPicker";
import Picker from 'rmc-picker/lib/Picker';
import Popup from 'rmc-picker/lib/Popup';
import "./index.css";

export default class DatePicker extends React.Component {
    state = {
        value: null,
    };

    onDismiss = () => {
        console.log('onDismiss');
    }

    onOk = (v) => {
        this.props.onOk(v)
    }

    render() {
        return (
            <Popup
                className="fortest"
                transitionName="rmc-picker-popup-slide-fade"
                maskTransitionName="rmc-picker-popup-fade"
                picker={<MultiPickerDemo {...this.props} />}
                onDismiss={this.onDismiss}
                dismissText="取消"
                okText="确定"
                onOk={this.onOk}
                {...this.props}
            />

        );
    }
}

class MultiPickerDemo extends React.Component {
    state = {
        maxM: 59,
        curH: this.props.minHM && this.props.minHM[0],
        value: this.props.defaultValue,
    };

    onChange = (value) => {
        const { hMapM } = this.props;
        const curH = value[0];
        let maxM = this.state.maxM;
        for (let k in hMapM) {
            if (Number(k) === Number(curH)) {
                maxM = Number(hMapM[k])
                break;
            } else {
                maxM = 59
            }
        }
        this.setState({
            value,
            maxM,
            curH
        });
    }

    getValue = () => (this.state.value);

    renderH = (hArr) => {
        const { minHM = [] } = this.props;
        const minH = minHM[0] ? minHM[0] : 0;

        const dom = [];

        hArr.forEach(item => {
            if (item >= minH) {
                dom.push(<Picker.Item className="my-picker-view-item" key={item} value={item}>{item}时</Picker.Item>)
            }

        })

        return dom

    };


    renderM = () => {
        const { maxM, curH } = this.state;
        const mArr = [];
        for (let i = 0; i <= maxM; i++) {
            mArr.push(i)
        }

        // 处理开始分钟
        const { minHM = [] } = this.props;
        const [minH = 0, minM = 0] = minHM

        const dom = [];

        mArr.forEach(item => {
            if (curH === minH) {
                if (item >= minM) {
                    dom.push(<Picker.Item className="my-picker-view-item" key={item} value={item}>{item}分</Picker.Item>)
                }
            } else {
                dom.push(<Picker.Item className="my-picker-view-item" key={item} value={item}>{item}分</Picker.Item>)
            }
        })


        return dom
    }

    render() {
        const { h } = this.props;
        return (
            <MultiPicker
                selectedValue={this.state.value}
                onValueChange={this.onChange}
                onScrollChange={() => { }}
            >
                <Picker indicatorClassName="my-picker-indicator">
                    {this.renderH(h)}
                </Picker>
                <Picker indicatorClassName="my-picker-indicator">
                    {this.renderM()}
                </Picker>
            </MultiPicker>
        );
    }
}
