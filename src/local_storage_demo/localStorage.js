const checkGet = require('./check/checkGet');
const checkSet = require('./check/checkSet');
const checkRemove = require('./check/checkRemove');
const { handleSuccessCb, handleStorageList } = require('./utils');

/**
 * localStorage操作
 */
function createLocalStorage(storageList) {
    const configStorageList = handleStorageList(storageList);
    return {
        // 默认采用localStorage方式
        storager: window.localStorage,
        /**
         * 获取本地存储值
         *   storager存在key，获取，没有直接返回undefined
         *   key对应的value非false，JSON.parse处理
         *
         * @param  {string}   key       存储key值
         * @param  {Function} successCb 成功回调函数
         * @param  {Function} failCb    失败回调函数
         * @return {*}                  返回值
         */
        get: function (key, successCb, failCb) {
            const params = {
                storager: this.storager,
                storageList: configStorageList,
                key,
                failCb,
            };
            // 校验key
            checkGet(params);

            let result;

            if (this.storager[key]) {
                result = this.storager.getItem(key);
                if (result) {
                    result = JSON.parse(result);
                }
            }

            handleSuccessCb({ key, value: result, successCb });

            return result;
        },
        /**
         * 设置本地存储
         *
         * @param  {string}   key       存储key值
         * @param  {string}   value     存储value值
         * @param  {Function} successCb 成功回调函数
         * @param  {Function} failCb    失败回调函数
         */
        set: function (key, value, successCb, failCb) {
            const params = {
                storager: this.storager,
                storageList: configStorageList,
                key,
                failCb,
            };
            // 先检查配置表
            checkSet(params);

            if (typeof value !== 'undefined') {
                value = JSON.stringify(value);
                this.storager.setItem(key, value);
            }

            handleSuccessCb({ key, value, successCb });
        },
        remove: function (key, successCb, failCb) {
            const params = {
                storager: this.storager,
                storageList: configStorageList,
                key,
                failCb,
            };
            // 先检查配置表
            checkRemove(params);

            this.storager.removeItem(key);
            handleSuccessCb({ key, successCb });
        },
        clear: function (successCb) {
            this.storager.clear();

            handleSuccessCb({
                successCb,
            });
        },
    };
}

module.exports = createLocalStorage;
