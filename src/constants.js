/*********************
 * localStorage配置表
 * 配置说明
 * 列表每一项是一个对象
 * key         存储的键(window.localStorage.setItem(key,value))
 * fromPage    来自那个页面
 * use         用途/功能
 * des         描述（退出清除）
 *
 * 举例
 * {
 *      key: "token",
 *      fromPage: "首页",
 *      use: "用户校验",
 *      des: "退出清除",
 * },
 *
 * ******************/

const STORAGELIST = [
    // {
    //     key: 'demo',
    //     fromPage: '测试页',
    //     use: '测试用的',
    //     des: '退出清除',
    // },
];

module.exports = STORAGELIST;
