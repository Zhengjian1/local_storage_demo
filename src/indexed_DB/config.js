const dbName = 'storage';
const version = 1;
const tableName = 'storage_list';

const config = {
    dbName, // *数据库名称
    version, // 数据库版本号（默认为当前时间戳）
    tables: [
        {
            tableName, // *表名
            option: { keyPath: 'id' }, // 表配置，即ObjectStore配置，此处指明主键为id
            indexs: [
                // 数据库索引（建议加上索引）
                {
                    key: 'id', // *索引名
                    option: {
                        unique: true, // 索引配置，此处表示该字段不允许重复
                    },
                },
                {
                    key: 'key',
                },
                {
                    key: 'fromPage',
                },
                {
                    key: 'use',
                },
                {
                    key: 'des',
                },
            ],
        },
    ],
};

export { dbName, version, tableName, config };
