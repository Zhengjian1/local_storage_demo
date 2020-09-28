import React from 'react';
import { Form, Input, Button } from 'antd';
import "./index.css";
import zj_local_storage from "zj_local_storage";
import { reload,failCb, handleNotification } from '../../../utils';

function Index() {
  const [form] = Form.useForm();

  function successCb(key) {
    handleNotification(`key为${key}移除成功`);
    reload();
  }

  function handleRemove(values) {
    zj_local_storage.remove(values.key, successCb,failCb)
  }

  return (
    <>
    <Form
      form={form}
      layout="inline"
      onFinish={handleRemove}
      initialValues={{ remember: true }}
    >
      <Form.Item
          label="key"
          name="key"
          placeholder="key"
          rules={[{ required: true, message: 'Please input localStorage key!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

    </Form>
  </>
  );
}

export default Index;