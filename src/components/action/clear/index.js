import React from 'react';
import { Button } from 'antd';
import "./index.css";
import zj_local_storage from "zj_local_storage";
import { reload,handleNotification } from '../../../utils';

function Index() {

  function callback() {
    handleNotification("清除所有localStorage成功");
    reload();
  }

  function onClick(){
    zj_local_storage.clear(callback)
  }

  return (
    <div>
        <Button type="primary" size="large" onClick={onClick}>清除所有localStorage</Button>
    </div>
  );
}

export default Index;