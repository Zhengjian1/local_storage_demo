import React from 'react';
import { Form, Input } from 'antd';
import "./index.css";
import zj_local_storage from "zj_local_storage";
import { reload,failCb, handleNotification } from '../../../utils';

const { Search } = Input;


function Index() {
  const [form] = Form.useForm();

  function successCb(key) {
    handleNotification(`key为${key}移除成功`);
    reload();
  }

  function handleRemove(val) {
    zj_local_storage.remove(val, successCb,failCb)
  }

  return (
    <>
    <Form
      form={form}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="key"
        name="key"
        placeholder="key"
        rules={[{ required: true, message: 'Please input localStorage key!' }]}
      >
        <Search enterButton="submit" size="large" onSearch={k => handleRemove(k)} />
      </Form.Item>

    </Form>
  </>
  );
}

export default Index;