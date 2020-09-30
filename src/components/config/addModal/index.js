import React from 'react';
import { Form, Input, Button, Modal, message } from 'antd';
import Idb from 'idb-js';
import db_storage_config from '../../../db_config';
import { random } from '@utils';

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

    function save(values) {
        Idb(db_storage_config).then(
            (storage_db) => {
                /**
                 * @method 增加单条数据
                 * */
                storage_db.insert({
                    tableName: 'storage_list',
                    data: {
                        id: createId++,
                        ...values,
                    },
                    success: () => {
                        // message.success('添加成功');
                    },
                });
            },
            (err) => {
                console.log(err);
            },
        );
    }

    const onFinish = (values) => {
        Idb(db_storage_config).then(
            (storage_db) => {
                // 先获取已经存储的，不能重复存储
                storage_db.queryAll({
                    tableName: 'storage_list',
                    success: (res) => {
                        let hasRename = false;
                        res.forEach((each) => {
                            if (values.key === each.key) {
                                hasRename = true;
                            }
                        });
                        if (hasRename) {
                            message.error(`${values.key}已经重名,请更换`);
                        } else {
                            save(values);
                            form.resetFields();
                            porps.handleCancel(`add${createId}`);
                            message.success(`${values.key}存储成功`);
                        }
                    },
                });
            },
            (err) => {
                console.log(err);
            },
        );
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

export default Index;
