import { notification } from 'antd';

function handleStorager(storager) {
    const clearK = ['key', 'getItem', 'setItem', 'removeItem', 'clear', 'length'];
    const res = [];
    for (let k in storager) {
        if (clearK.indexOf(k) < 0)
            res.push({
                key: k,
                value: storager[k],
            });
    }
    return res;
}

function reload() {
    window.location.reload(true);
}

function failCb(message) {
    notification.error({
        message,
    });
}

function handleNotification(message) {
    notification.success({
        message,
    });
}

function handleStorageList(storageList) {
    return storageList.reduce((prev, cur) => {
        const key = cur.key;
        // 检查配置的列表key是否重复
        prev[key] = cur;
        return prev;
    }, {});
}

export { handleStorager, reload, failCb, handleNotification,handleStorageList };
