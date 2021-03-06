import React from 'react';
import { Form, Input, Button } from 'antd';
import './index.css';
// import local_storage_demo from 'local_storage_demo';
import { reload, failCb, handleNotification } from '@utils';

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

function Index() {
    const [form] = Form.useForm();

    function successCb(key, val) {
        handleNotification(`localStorage设置成功，key：${key}，value：${val}`);
        form.resetFields();
        reload();
    }

    const handleSet = (values) => {
        const { key, value } = values;
        window.local_storage_demo.set(key, value, successCb, failCb);
    };

    return (
        <Form form={form} {...layout} name="basic" initialValues={{ remember: true }} onFinish={handleSet}>
            <Form.Item label="key" name="key" rules={[{ required: true, message: 'Please input localStorage key!' }]}>
                <Input allowClear />
            </Form.Item>

            <Form.Item
                label="value"
                name="value"
                rules={[{ required: true, message: 'Please input localStorage value!' }]}>
                <Input allowClear />
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
