import 'rmc-picker/assets/index.css';
import 'rmc-picker/assets/popup.css';
import React from 'react';
import PullUp from "../components/pullUp";
import MultiPicker from "rmc-picker/lib/MultiPicker";
import Picker from 'rmc-picker/lib/Picker';
import Popup from 'rmc-picker/lib/Popup';
import { valid } from 'semver';



export default class Demo extends React.Component {
  state = {
    value: null,
  };


  onOk = (v) => {
    console.log(v)
  }

  onDismiss = () => {
    console.log('onDismiss');
  }

  fixOnOk = (picker) => {
    if (picker) {
      picker.onOk = this.onOk;
    }
  }

  render() {
    return (
      <div style={{ margin: '10px 30px' }}>
        <div>
          <Popup
            className="fortest"
            transitionName="rmc-picker-popup-slide-fade"
            maskTransitionName="rmc-picker-popup-fade"
            picker={<MultiPickerDemo />}
            disabled={this.state.disabled}
            onDismiss={this.onDismiss}
            onOk={this.onOk}
            dismissText="取消"
            okText="确定"
            ref={this.fixOnOk}
            value={this.state.value}
          >
            <button>{'open'}</button>
          </Popup>
        </div>
      </div>
    );
  }
}

 class MultiPickerDemo extends React.Component {
    state = {
      value: ['1', '11'],
    };
  
    onChange = (value) => {
      console.log('onChange', value);
      this.setState({
        value,
      });
    }
  
    onScrollChange = (value) => {
        console.log('onScrollChange', value);
    }
  
    render() {
      return (
        <div style={{ background: '#f5f5f9', padding: 10 }}>
          <MultiPicker
            selectedValue={this.state.value}
            onValueChange={this.onChange}
            onScrollChange={this.onScrollChange}
          >
            <Picker indicatorClassName="my-picker-indicator">
              <Picker.Item className="my-picker-view-item" value="1">one</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="2">two</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="3">three</Picker.Item>
              {/* <Picker.Item className="my-picker-view-item" value="4">four</Picker.Item> */}
              <Picker.Item className="my-picker-view-item" value="5">five</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="6">six</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="7">seven</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="8">eight</Picker.Item>
            </Picker>
            <Picker indicatorClassName="my-picker-indicator">
              <Picker.Item className="my-picker-view-item" value="11">eleven</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="12">twelve</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="13">thirteen</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="14">fourteen</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="15">fifteen</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="16">sixteen</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="17">seventeen</Picker.Item>
              <Picker.Item className="my-picker-view-item" value="18">eighteen</Picker.Item>
            </Picker>
          </MultiPicker>
        </div>
      );
    }
  }
