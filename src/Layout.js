import React from 'react';
import './Layout.css';
import { Row, Col } from 'antd';
import Congig from './components/config/index';
import LocalStorage from './components/localStorage/index';
import Action from './components/action/index';


function Layout() {

  return (
    <div className="App">
      <Row>
        <Col span={8}>
          <Congig />
        </Col>
        <Col span={8}>
          <LocalStorage />
        </Col>
        <Col span={8}><Action/></Col>
      </Row>
    </div>
  );
}

export default Layout;