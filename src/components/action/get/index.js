import React, { useState } from 'react';
import { Form, Input } from 'antd';
import "./index.css";
import {  failCb,handleNotification } from '../../../utils';

const { Search } = Input;

function Index() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [form] = Form.useForm();

  function successCb(key, value) {
    handleNotification(`key为${key},获取的值为:${value}`);
    form.resetFields();
    setKey(() => key);
    setValue(() => value);
  }

  function handleGet(k) {
    window.localStorage.getItem(k, successCb, failCb)
  }

  return (
    <>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="key"
          name="key"
          placeholder="key"
          rules={[{ required: true, message: 'Please input localStorage key!' }]}
        >
          <Search enterButton="submit" size="large" onSearch={k => handleGet(k)} />
        </Form.Item>

      </Form>
      <h3>{`key为${key},获取的值为:${value}`}</h3>
    </>
  );
}

export default Index;