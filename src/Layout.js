import React from 'react';
import { Row, Col } from 'antd';
import Config from './components/config/index';
import LocalStorage from './components/localStorage/index';
import Action from './components/action/index';

function Layout() {
    return (
        <Row>
            <Col span={8}>
                <Config />
            </Col>
            <Col span={8}>
                <LocalStorage />
            </Col>
            <Col span={8}>
                <Action />
            </Col>
        </Row>
    );
}

export default Layout;
