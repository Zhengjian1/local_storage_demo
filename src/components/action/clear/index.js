import React from 'react';
import { Button } from 'antd';
import "./index.css";
import local_storage_demo from "local_storage_demo";
import { reload,handleNotification } from '../../../utils';

function Index() {

  function callback() {
    handleNotification("清除所有localStorage成功");
    reload();
  }

  function onClick(){
    local_storage_demo.clear(callback)
  }

  return (
    <div>
        <Button type="primary" size="large" onClick={onClick}>清除所有localStorage</Button>
    </div>
  );
}

export default Index;