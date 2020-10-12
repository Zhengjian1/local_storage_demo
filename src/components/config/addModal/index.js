import React,{ memo } from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import { random } from '@utils';
import { add, getAll } from '@indexed_DB';

let createId = random(1000000, 9999999);
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
};

function Index(porps) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        getAll().then((res) => {
            let hasRename = false;
            res.forEach((each) => {
                if (values.key === each.key) {
                    hasRename = true;
                }
            });
            if (hasRename) {
                message.error(`${values.key}已经重名,请更换`);
            } else {
                add({
                    id: createId++,
                    ...values,
                }).then(() => message.success(`${values.key}增加成功`));

                form.resetFields();
                porps.handleCancel(`add${createId}`);
            }
        });
    };

    return (
        <Modal title="增加配置表" visible={porps.visible} onCancel={porps.handleCancel} footer={false}>
            <Form form={form} {...layout} name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item label="key" name="key" rules={[{ required: true, message: 'Please input key!' }]}>
                    <Input allowClear />
                </Form.Item>

                <Form.Item
                    label="fromPage"
                    name="fromPage"
                    rules={[{ required: true, message: 'Please input fromPage!' }]}>
                    <Input allowClear />
                </Form.Item>

                <Form.Item label="use" name="use" rules={[{ required: true, message: 'Please input use!' }]}>
                    <Input allowClear />
                </Form.Item>

                <Form.Item label="des" name="des" rules={[{ required: true, message: 'Please input des!' }]}>
                    <Input allowClear />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default memo(Index);
