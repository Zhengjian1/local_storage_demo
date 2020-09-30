import React, { useEffect, useReducer } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd';
import './index.css';
import AddModal from "./addModal";
import Idb from 'idb-js'
import db_storage_config from '../../db_config';
import { handleStorageList, reload } from "../../utils";
const createLocalStorage = require("../../local_storage_demo/index");



const initialState = {
    visible: false,
    actionType: "",
    storageList: []
};

function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                ...action.payload
            };
        case 'save':
            return {
                ...state,
                ...action.payload
            };
        case 'closeModal':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
function Index() {
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'key',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'fromPage',
            dataIndex: 'fromPage',
            key: 'fromPage',
        },
        {
            title: 'use',
            dataIndex: 'use',
            key: 'use',
        },
        {
            title: 'des',
            dataIndex: 'des',
            key: 'des',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            render: (text, record) =>
                (<Popconfirm title="Sure to delete?" onConfirm={() => handleDel(record.id)}>
                    <a>Delete</a>
                </Popconfirm>)
        },
    ];


    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        Idb(db_storage_config).then(storage_db => {
            /**
           * @method 查询某张表的所有数据
           * */
            storage_db.queryAll({
                tableName: "storage_list",
                success: (res) => {
                    if (res.length) {
                        const storageList = []
                        res.forEach(item => {
                            // delete item.id
                            if (Object.keys(item).length) {
                                storageList.push(item);
                            }
                        })

                        dispatch({
                            type: "save",
                            payload: {
                                visible: false,
                                storageList: [...storageList]
                            }
                        })

                        const configStorageList = handleStorageList(storageList);
                        window.local_storage_demo = createLocalStorage(configStorageList);
                    }

                }
            });

        }, err => {
            console.log(err)
        });

        return () => {
            Idb(db_storage_config).then(storage_db => {
                // /**
                // * @method 清空某张表的数据
                // * */
                // storage_db.clear_table({
                //     tableName: 'storage_list'
                // });
                /**
                * @method close_db 关闭此数据库
                * */
                storage_db.close_db();
            }, err => {
                console.log(err)
            });

        }
    }, [state.actionType])

    function handleAdd() {
        dispatch({
            type: "add",
            payload: {
                visible: true,
            }
        })
    }

    function handleDel(id) {
        console.log(id)
        Idb(db_storage_config).then(storage_db => {
            /**
            * @method 删除数据
            * */
            storage_db.delete_by_primaryKey({
                tableName: "storage_list",
                target: id,
                success: () => {
                    message.success("删除成功")
                    reload()
                }
            });

        }, err => {
            console.log(err)
        });

    }

    function handleCancel(actionType) {
        dispatch({
            type: "closeModal",
            payload: {
                visible: false,
                actionType
            }
        })
    }

    return (
        <div className="site-card-border-less-wrapper">
            <Card title="localStorage检查配置的列表" bordered={false} style={{ width: '100%', minHeight: '100vh' }}>
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
