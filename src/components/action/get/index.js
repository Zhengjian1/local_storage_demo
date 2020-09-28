import React from 'react';
import { Form, Input, Button } from 'antd';
import "./index.css";
import { failCb, handleNotification } from '../../../utils';


function Index() {
  const [form] = Form.useForm();

  function successCb(key, value) {
    handleNotification(`key为${key},获取的值为:${value}`);
    form.resetFields();
  }

  function handleGet(values) {
    window.localStorage.getItem(values.key, successCb, failCb)
  }

  return (
    <>
      <Form
        form={form}
        layout="inline"
        onFinish={handleGet}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="key"
          name="key"
          placeholder="key"
          rules={[{ required: true, message: 'Please input localStorage key!' }]}
        >
          <Input allowClear />
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