import React, { useEffect, useReducer } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import './index.css';
import AddModal from './addModal';
import Idb from 'idb-js';
import db_storage_config from '../../db_config';
import { reload } from '../../utils';
const createLocalStorage = require('../../local_storage_demo/index');

const initialState = {
    visible: false,
    actionType: '',
    storageList: [],
};

function reducer(state, action) {
    switch (action.type) {
        case 'add':
        case 'save':
        case 'closeModal':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
function Index() {
    function createColumns() {
        const columnsK = ['key', 'fromPage', 'use', 'des', 'action'];
        const columns = columnsK.map((item) => ({
            title: item,
            dataIndex: item,
            key: item,
        }));
        // 最后一项加上点击事件
        columns[columns.length - 1].render = (text, record) => (
            <Popconfirm title="确信删除?" onConfirm={() => handleDel(record.id)}>
                <a>删除</a>
            </Popconfirm>
        );

        return columns;
    }

    const columns = createColumns();

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        Idb(db_storage_config).then(
            (storage_db) => {
                /**
                 * @method 查询某张表的所有数据
                 * */
                storage_db.queryAll({
                    tableName: 'storage_list',
                    success: (res) => {
                        if (res.length) {
                            const storageList = [];
                            res.forEach((item) => {
                                // delete item.id
                                if (Object.keys(item).length) {
                                    storageList.push(item);
                                }
                            });

                            dispatch({
                                type: 'save',
                                payload: {
                                    visible: false,
                                    storageList: [...storageList],
                                },
                            });

                            // 为了可视化配置列表，先用全局变量
                            window.local_storage_demo = createLocalStorage(storageList);
                        }
                    },
                });
            },
            (err) => {
                console.error(err);
            },
        );

        return () => {
            Idb(db_storage_config).then(
                (storage_db) => {
                    /**
                     * @method close_db 关闭此数据库
                     * */
                    storage_db.close_db();
                },
                (err) => {
                    console.error(err);
                },
            );
        };
    }, [state.actionType]);

    function handleAdd() {
        dispatch({
            type: 'add',
            payload: {
                visible: true,
            },
        });
    }

    function handleDel(id) {
        Idb(db_storage_config).then(
            (storage_db) => {
                /**
                 * @method 删除数据
                 * */
                storage_db.delete_by_primaryKey({
                    tableName: 'storage_list',
                    target: id,
                    success: () => {
                        message.success('删除成功');
                        reload();
                    },
                });
            },
            (err) => {
                console.log(err);
            },
        );
    }

    function handleCancel(actionType) {
        dispatch({
            type: 'closeModal',
            payload: {
                visible: false,
                actionType,
            },
        });
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title="检查配置列表" bordered={false} style={{ width: '100%', minHeight: '100vh' }}>
                <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加
                </Button>
                <Table dataSource={[...state.storageList]} columns={columns} pagination={false} />
                <AddModal visible={state.visible} handleCancel={handleCancel} />
            </Card>
        </div>
    );
}

export default Index;
