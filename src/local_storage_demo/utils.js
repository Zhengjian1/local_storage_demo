function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

function handleSuccessCb(args) {
    const { key, value, successCb } = args;
    if (isFunction(successCb) && successCb) {
        successCb(key, value);
    }
}

function handleFailCb(args) {
    const { errorMsg, failCb } = args;
    if (errorMsg) {
        if (isFunction(failCb) && failCb) {
            failCb(errorMsg);
        }
        throw new Error(errorMsg);
    }
}

function handleStorageList(storageList) {
    return storageList.reduce((prev, cur) => {
        const key = cur.key;
        // 检查配置的列表key是否重复
        prev[key] = cur;
        return prev;
    }, {});
}

module.exports = {
    isFunction,
    handleSuccessCb,
    handleFailCb,
    handleStorageList,
};
