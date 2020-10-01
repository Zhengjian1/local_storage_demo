import Idb from 'idb-js';
import { tableName, config } from './config';

/****************************************
 * @method 增加单条数据
 * @param  {object}   data       存储单条数据值
 ****************************************/
function add(data) {
    return new Promise((resolve, reject) => {
        Idb(config).then(
            (storage_db) => {
                storage_db.insert({
                    tableName,
                    data,
                    success: (res) => resolve(res),
                });
            },
            (err) => {
                reject(err);
            },
        );
    });
}

/****************************************
 * @method 查询某张表的所有数据
 ****************************************/
function getAll() {
    return new Promise((resolve, reject) => {
        Idb(config).then(
            (storage_db) => {
                storage_db.queryAll({
                    tableName,
                    success: (res) => resolve(res),
                });
            },
            (err) => {
                reject(err);
            },
        );
    });
}

/****************************************
 * @method 通过主键删除某条数据
 *@param  {number}   id       删除的id
 ****************************************/
function del(id) {
    return new Promise((resolve, reject) => {
        Idb(config).then(
            (storage_db) => {
                storage_db.delete_by_primaryKey({
                    tableName,
                    target: id,
                    success: (res) => resolve(res),
                });
            },
            (err) => {
                reject(err);
            },
        );
    });
}

/****************************************
 * @method 关闭数据库
 ****************************************/
function close() {
    return new Promise(() => {
        Idb(config).then(
            (storage_db) => {
                storage_db.close_db();
            },
            (err) => {
                console.error(err);
            },
        );
    });
}

export { add, del, getAll, close };
