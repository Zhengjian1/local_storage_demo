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
                style={{
                    width: '100%',
                    minHeight: '100vh',
                }}>
                <Collapse className="action-wrap" defaultActiveKey={['1']}>
                    <Panel header="localStorage设置" key="1">
                        <Set />
                    </Panel>
                    <Panel header="localStorage获取" key="2">
                        <Get />
                    </Panel>
                    <Panel header="localStorage移除单个" key="3">
                        <Remove />
                    </Panel>
                    <Panel header="localStorage清除所有" key="4">
                        <Clear />
                    </Panel>
                </Collapse>
            </Card>
        </div>
    );
}

export default Index;
