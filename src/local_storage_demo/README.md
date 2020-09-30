## 使用
 1、 npm i --save local_storage_demo
 2、你自己项目的根目录的src下新建constants文件，配置列表

 ```
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
 ```
3、页面直接引包
```
import local_storage_demo from "local_storage_demo";
        .
        .
local_storage_demo.get(key)
        ...
```
## local_storage_demo对外接口说明

```
{
    // 默认采用localStorage方式
    storager: window.localStorage,
    /**
    * 获取本地存储值
    *   storager存在key，获取，没有直接返回undefined
    *   key对应的value非false，JSON.parse处理
    *
    * 等价于window.localStorage.getItem
    * @param  {string}   key       存储key值
    * @param  {Function} successCb 成功回调函数
    * @param  {Function} failCb    失败回调函数
    * @return {*}                  返回值
    */
    get: function (key, successCb,failCb) {},
    /**
    * 设置本地存储
    * 等价于window.localStorage.setItem
    * @param  {string}   key       存储key值
    * @param  {string}   value     存储value值
    * @param  {Function} successCb 成功回调函数
    * @param  {Function} failCb    失败回调函数
    */
    set: function (key, value, successCb,failCb) {},
    /**
    * 删除本地存储
    * 等价于window.localStorage.removeItem
    * @param  {string}   key       存储key值
    * @param  {string}   value     存储value值
    * @param  {Function} successCb 成功回调函数
    * @param  {Function} failCb    失败回调函数
    */
    remove: function (key, successCb,failCb) {},
    /*****
    * 清空localStorage
    **/
    clear: function (successCb) {}
};

```