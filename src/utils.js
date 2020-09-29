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
    notification.open({
        message,
    });
}

export { handleStorager, reload, failCb, handleNotification };
