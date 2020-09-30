function isFunction(fn) {
    return Object.prototype.toString.call(fn) === "[object Function]"
}

function handleSuccessCb(args){
    const {key,value,successCb} = args;
    if (isFunction(successCb) && successCb) {
        successCb(key,value);
    }
}

function handleFailCb(args) {
    const {errorMsg, failCb} = args;
    if(errorMsg) {
        if (isFunction(failCb) && failCb) {
            failCb(errorMsg);
        }
        throw new Error(errorMsg);
    }
}

module.exports = {
    isFunction,
    handleSuccessCb,
    handleFailCb,
}