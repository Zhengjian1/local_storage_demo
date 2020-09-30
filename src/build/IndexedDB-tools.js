(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.IndexedDB = factory());
}(this, function () { 'use strict';

    /* 环境变量 */
    var env = typeof process === 'object' ? ((process.env && process.env.NODE_ENV) ? process.env.NODE_ENV : 'production') : 'production';

    /**
     * 获取IDBKeyRange
     * 根据字符串返回游标查询的范围，例如：
     * '5'      等于rollup
     * '>  5'   大于
     * '>= 5'   大于等于
     * '<  5'   小于
     * '<= 5'   小于等于
     * '[5, 8]' 闭区间
     * '(5, 8)' 开区间
     * @param { string } range: 传递字符串
     * @return
     */
    function getRange(range) {
        // 如果是数字类型，不作处理
        if (typeof range === 'number') {
            return range;
        }
        // 对字符串进行判断
        if (typeof range === 'string') {
            // 大于
            if (/^\s*>\s*(-?\d+(\.\d+)?)\s*$/i.test(range)) {
                var regMatchArr = range.match(/(-?\d+(\.\d+)?)/g);
                if (regMatchArr) {
                    return IDBKeyRange.lowerBound(Number(regMatchArr[0]), true);
                }
                else {
                    return undefined;
                }
            }
            // 大于等于
            if (/^\s*>\s*=\s*(-?\d+(\.\d+)?)\s*$/i.test(range)) {
                var regMatchArr = range.match(/(-?\d+(\.\d+)?)/g);
                if (regMatchArr) {
                    return IDBKeyRange.lowerBound(Number(regMatchArr[0]));
                }
                else {
                    return undefined;
                }
            }
            // 小于
            if (/^\s*<\s*(-?\d+(\.\d+)?)\s*$/i.test(range)) {
                var regMatchArr = range.match(/(-?\d+(\.\d+)?)/g);
                if (regMatchArr) {
                    return IDBKeyRange.upperBound(Number(regMatchArr[0]), true);
                }
                else {
                    return undefined;
                }
            }
            // 小于等于
            if (/^\s*<\s*=\s*(-?\d+(\.\d+)?)\s*$/i.test(range)) {
                var regMatchArr = range.match(/(-?\d+(\.\d+)?)/g);
                if (regMatchArr) {
                    return IDBKeyRange.upperBound(Number(regMatchArr[0]));
                }
                else {
                    return undefined;
                }
            }
            // 判断区间
            if (/^\s*[\[\(]\s*(-?\d+(\.\d+)?)\s*\,\s*(-?\d+(\.\d+)?)\s*[\]\)]\s*$/i.test(range)) {
                var regMatchArr = range.match(/(-?\d+(\.\d+)?)/g);
                if (regMatchArr) {
                    var left = regMatchArr[0], right = regMatchArr[1];
                    var _a = [false, false], isOpenLeft = _a[0], isOpenRight = _a[1];
                    // 判断左右开区间和闭区间
                    if (/^.*\(.*$/.test(range)) {
                        isOpenLeft = true;
                    }
                    if (/^.*\).*$/.test(range)) {
                        isOpenRight = true;
                    }
                    return IDBKeyRange.bound(Number(left), Number(right), isOpenLeft, isOpenRight);
                }
                else {
                    return undefined;
                }
            }
            return range;
        }
    }

    /**
     * 操作objectStore
     * @param { IDBDatabase } db       : db实例
     * @param { string } objectStoreNam: objectStore名字
     * @param { boolean } writeAble    : 是否只读
     */
    var ObjectStore = /** @class */ (function () {
        function ObjectStore(db, objectStoreName, writeAble) {
            this.db = db;
            var wa = writeAble === true ? 'readwrite' : 'readonly';
            var transaction = this.db.transaction(objectStoreName, wa);
            this.store = transaction.objectStore(objectStoreName);
            return this;
        }
        /**
         * 添加数据
         * @param { object | Array<Object> } arg: 数组添加多个数据，object添加单个数据
         * @return { this }
         */
        ObjectStore.prototype.add = function (arg) {
            var data = arg instanceof Array ? arg : [arg];
            for (var i = 0, j = data.length - 1; i <= j; i++) {
                this.store.add(data[i]);
                if (i === j && env === 'development') {
                    console.log('数据添加成功');
                }
            }
            return this;
        };
        /**
         * 更新数据
         * @param { object | Array<object> } arg: 数组添加多个数据，object添加单个数据
         * @return { this }
         */
        ObjectStore.prototype.put = function (arg) {
            var data = arg instanceof Array ? arg : [arg];
            for (var i = 0, j = data.length - 1; i <= j; i++) {
                this.store.put(data[i]);
                if (i === j && env === 'development') {
                    console.log('数据更新成功');
                }
            }
            return this;
        };
        /**
         * 删除数据
         * @param { string | number | Array<string | number> } arg: 数组删除多个数据，string、number删除单个数据
         * @return this
         */
        ObjectStore.prototype.delete = function (arg) {
            var data = arg instanceof Array ? arg : [arg];
            for (var i = 0, j = data.length - 1; i <= j; i++) {
                this.store.delete(data[i]);
                if (i === j && env === 'development') {
                    console.log('数据删除成功');
                }
            }
            return this;
        };
        /* 清除数据 */
        ObjectStore.prototype.clear = function () {
            this.store.clear();
            if (env === 'development') {
                console.log('数据清除成功');
            }
            return this;
        };
        /**
         * 获取数据
         * @param { string | number} value: 键值
         * @param { Function } callback   : 获取成功的回调函数
         * @return { this }
         */
        ObjectStore.prototype.get = function (value, callback) {
            var _this = this;
            var idbRequest = this.store.get(value);
            // 成功后的回调函数
            var handleSuccess = function (event) {
                if (callback)
                    callback.call(_this, event);
            };
            idbRequest.addEventListener('success', handleSuccess, false);
            return this;
        };
        /**
         * 游标
         * @param { string } indexName               : 索引名
         * @param { string | number | boolean } range: 查询范围：有等于，大于等于，小于，小于等于，区间
         * @param { Function } callback              : 查询成功的回调函数
         * @return { this }
         * result.value
         * result.continue()
         */
        ObjectStore.prototype.cursor = function (indexName) {
            var _this = this;
            // 获取参数
            var callback = typeof arguments[1] === 'function' ? arguments[1] : arguments[2];
            var range = arguments[2] ? getRange(arguments[1]) : undefined;
            var index = this.store.index(indexName);
            var cursor = !range ? index.openCursor() : index.openCursor(range);
            // 成功后的回调函数
            var handleSuccess = function (event) {
                if (callback)
                    callback.call(_this, event); // event.target.result.value && event.target.result.continue()
            };
            cursor.addEventListener('success', handleSuccess, false);
            return this;
        };
        return ObjectStore;
    }());

    var InitDB = /** @class */ (function () {
        function InitDB(indexeddb, name, version, callbackObject) {
            // 数据库实例
            this.indexeddb = indexeddb;
            // 数据库名称
            this.name = name;
            // 版本号
            this.version = version;
            // 回调函数
            this.callbackObject = callbackObject;
            // db实例
            this.db = undefined;
            // 创建或者打开数据库
            this.request = this.indexeddb.open(name, version);
            // 绑定函数
            this.request.addEventListener('success', this.handleOpenDBSuccess.bind(this), false);
            this.request.addEventListener('error', this.handleOpenDBError.bind(this), false);
            this.request.addEventListener('upgradeneeded', this.handleOpenUpgradeneeded.bind(this), false);
        }
        /* 打开数据库成功 */
        InitDB.prototype.handleOpenDBSuccess = function (event) {
            if (this.callbackObject.success) {
                this.db = event.target.result;
                this.callbackObject.success.call(this, event);
            }
            if (env === 'development') {
                console.log("\u6253\u5F00\u6570\u636E\u5E93\u6210\u529F\uFF01\nname:    " + this.name + "\nversion: " + this.version);
            }
        };
        /* 打开数据库失败 */
        InitDB.prototype.handleOpenDBError = function (event) {
            if (this.callbackObject.error) {
                console.error(event.target.error.message);
                this.callbackObject.error.call(this, event); // event.target.error
            }
            if (env === 'development') {
                console.log("\u6253\u5F00\u6570\u636E\u5E93\u5931\u8D25\uFF01\nname:    " + this.name + "\nversion: " + this.version);
            }
        };
        /* 更新数据库版本 */
        InitDB.prototype.handleOpenUpgradeneeded = function (event) {
            if (this.callbackObject.upgradeneeded) {
                this.db = event.target.result;
                this.callbackObject.upgradeneeded.call(this, event);
            }
            if (env === 'development') {
                console.log("\u6570\u636E\u5E93\u7248\u672C\u66F4\u65B0\uFF01\nname:    " + this.name + "\nversion: " + this.version);
            }
        };
        /* 关闭数据库 */
        InitDB.prototype.close = function () {
            if (this.db) {
                this.db.close();
                this.db = undefined;
                if (env === 'development') {
                    console.log("\u6570\u636E\u5E93\u5173\u95ED\u3002\nname:    " + this.name + "\nversion: " + this.version);
                }
            }
        };
        /**
         * 判断是否有ObjectStore
         * @param { string } objectStoreName: ObjectStore名字
         * @return { boolean }
         */
        InitDB.prototype.hasObjectStore = function (objectStoreName) {
            if (this.db) {
                return this.db.objectStoreNames.contains(objectStoreName);
            }
            return false;
        };
        /**
         * 创建ObjectStore
         * @param { string } objectStoreName: ObjectStore名字
         * @param { string } keyPath        : ObjectStore关键字
         * @param { Array<IndexItem> } indexArray      : 添加索引和键值，name -> 索引， index -> 键值
         * @return { this }
         */
        InitDB.prototype.createObjectStore = function (objectStoreName, keyPath, indexArray) {
            if (this.db) {
                if (!this.hasObjectStore(objectStoreName)) {
                    var store = this.db.createObjectStore(objectStoreName, { keyPath: keyPath });
                    // 创建索引键值
                    if (indexArray) {
                        for (var _i = 0, indexArray_1 = indexArray; _i < indexArray_1.length; _i++) {
                            var item = indexArray_1[_i];
                            store.createIndex(item.name, // 索引
                            item.index // 键值
                            );
                        }
                    }
                    if (env === 'development') {
                        console.log("\u521B\u5EFA\u4E86\u65B0\u7684ObjectStore\uFF1A" + objectStoreName + "\u3002");
                    }
                }
                else {
                    console.warn("ObjectStore\uFF1A" + objectStoreName + "\u5DF2\u5B58\u5728\u3002");
                }
            }
            return this;
        };
        /**
         * 删除ObjectStore
         * @param { string } objectStoreName: ObjectStore名字
         * @return { this }
         */
        InitDB.prototype.deleteObjectStore = function (objectStoreName) {
            if (this.db) {
                if (this.hasObjectStore(objectStoreName)) {
                    this.db.deleteObjectStore(objectStoreName);
                    if (env === 'development') {
                        console.log("\u5220\u9664\u4E86\u65B0\u7684ObjectStore\uFF1A" + objectStoreName + "\u3002");
                    }
                }
                else {
                    console.warn("ObjectStore\uFF1A" + objectStoreName + "\u4E0D\u5B58\u5728\u3002");
                }
            }
            return this;
        };
        /**
         * 获取操作ObjectStore
         * @param { string } objectStoreName: ObjectStore名字
         * @param { boolean } writeAble     : 只读还是读写
         * @return { ObjectStore }
         */
        InitDB.prototype.getObjectStore = function (objectStoreName, writeAble) {
            if (writeAble === void 0) { writeAble = false; }
            if (this.db) {
                return new ObjectStore(this.db, objectStoreName, writeAble);
            }
        };
        return InitDB;
    }());

    function idbFactory() {
        /* 兼容浏览器和webworker */
        var db = indexedDB || webkitIndexedDB || mozIndexedDB || msIndexedDB;
        return db;
    }
    /**
     * 初始化数据库
     * @param { string } name            创建或者连接的数据库名
     * @param { number } version         数据库版本号
     * @param { object } callbackObject  配置回调函数
     *   - success                       创建或者连接的数据库成功后的回调函数
     *   - error                         创建或者连接的数据库失败后的回调函数
     *   - upgradeneeded                 数据库版本号更新后的回调函数
     */
    function IndexedDB(name, version, callbackObject) {
        var db = idbFactory();
        IndexedDB.prototype.indexeddb = db;
        return new InitDB(db, name, version, callbackObject);
    }
    /**
     * 删除数据库
     * @param { string } databaseName: 数据库名
     */
    IndexedDB.deleteDatabase = function (databaseName) {
        var db = idbFactory();
        var req = db.deleteDatabase(databaseName);
        if (env === 'development') {
            console.log("\u5220\u9664\u6570\u636E\u5E93\uFF1A" + databaseName + "\u3002");
        }
        return req;
    };

    return IndexedDB;

}));
