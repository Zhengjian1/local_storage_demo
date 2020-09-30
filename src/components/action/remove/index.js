import React from 'react';
import { Form, Input, Button } from 'antd';
import './index.css';
// import local_storage_demo from 'local_storage_demo';
import { reload, failCb, handleNotification } from '../../../utils';

function Index() {
    const [form] = Form.useForm();

    function successCb(key) {
        handleNotification(`key为${key}移除成功`);
        reload();
    }

    function handleRemove(values) {
        window.local_storage_demo.remove(values.key, successCb, failCb);
    }

    return (
        <>
            <Form form={form} layout="inline" onFinish={handleRemove} initialValues={{ remember: true }}>
                <Form.Item
                    label="key"
                    name="key"
                    placeholder="key"
                    rules={[{ required: true, message: 'Please input localStorage key!' }]}>
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
