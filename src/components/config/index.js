import React from 'react';
import { Card, Table } from 'antd';
import "./index.css";
const STORAGELIST = require('../../constants');

const columns = [
    {
      title: "key",
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
  ];


function Index() {

    return (
        <div className="site-card-border-less-wrapper">
            <Card title="src/constants手动配置的列表" bordered={false} style={{ width: "100%", minHeight: "100vh" }}>
            <Table dataSource={STORAGELIST} columns={columns} pagination={false} />
            </Card>
        </div>
    );
}

export default Index;