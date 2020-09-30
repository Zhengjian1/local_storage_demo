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
    delay(500).then(() => window.location.reload(true));
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

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export { handleStorager, reload, failCb, handleNotification };
