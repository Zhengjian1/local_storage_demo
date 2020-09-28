import React from 'react';
import { Form, Input, Button } from 'antd';
import "./index.css";
import zj_local_storage from "zj_local_storage";
import { reload, failCb,handleNotification } from '../../../utils';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


function Index() {
  const [form] = Form.useForm();

  function successCb(key, val) {
    handleNotification(`localStorage设置成功，key：${key}，value：${val}`)
    form.resetFields();
    reload()
  }

  const onFinish = values => {
    const { key, value } = values;
    zj_local_storage.set(key, value, successCb, failCb)
  };

  return (
    <Form
      form={form}
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="key"
        name="key"
        rules={[{ required: true, message: 'Please input localStorage key!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="value"
        name="value"
        rules={[{ required: true, message: 'Please input localStorage value!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

  );
}

export default Index;