import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';
import "./index.css";
import local_storage_demo from "local_storage_demo";
import { handleStorager } from "../../utils";


const columns = [
  {
    title: "key",
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'value',
    dataIndex: 'value',
    key: 'value',
  },
];


function Index() {
  const initStaterList = handleStorager(local_storage_demo.storager);
  const [storagerList, setStorager] = useState(initStaterList)

  useEffect(() => {
    function listerStorage() {
      setStorager(() => handleStorager(local_storage_demo.storager))
    }
    window.addEventListener("storage", listerStorage,false);

    return () => {
      window.removeEventListener('storage', listerStorage, false)
    }

  }, [])


  return (
    <div className="site-card-border-less-wrapper">
      <Card title="本地localStroage的列表" bordered={false} style={{ width: "100%", minHeight: "100vh" }}>
        <Table dataSource={storagerList} columns={columns} pagination={false} />
      </Card>
    </div>
  );
}

export default Index;