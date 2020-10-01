import React from 'react';
import { Card, Collapse } from 'antd';
import './index.css';
import Set from './set/index';
import Get from './get/index';
import Remove from './remove/index';
import Clear from './clear/index';

const { Panel } = Collapse;

function Index() {
    return (
        <div className="site-card-border-less-wrapper">
            <Card
                title="localStorage操作"
                bordered={false}
                headStyle={{ textAlign: 'center' }}
                style={{ width: '100%', minHeight: '100vh' }}>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header="设置" key="1">
                        <Set />
                    </Panel>
                    <Panel header="获取" key="2">
                        <Get />
                    </Panel>
                    <Panel header="移除" key="3">
                        <Remove />
                    </Panel>
                    <Panel header="清空" key="4">
                        <Clear />
                    </Panel>
                </Collapse>
            </Card>
        </div>
    );
}

export default Index;
