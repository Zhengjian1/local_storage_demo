const { handleFailCb } = require("../utils");

function checkGet(args) {
    const { storager, storageList, key, failCb } = args;
    const configKeys = ["key","fromPage", "use", "des"];

    let errorMsg = "";

    switch(true){
        case !!storageList.hasOwnProperty(key):
            // 配置表有，本地localStroy中没有
            if(!storager.hasOwnProperty(key)) {
                errorMsg = `localStorage没有${key}键，请确认是否存过${key}键`;
            } else {
                const noKey = []
                // 校验配置的多个key是否都有
                configKeys.forEach(item => {
                    if(!storageList[key].hasOwnProperty(item)) {
                         noKey.push(item)
                    }
                })
    
                if(noKey.length){
                    errorMsg = `项目的src/constants文件配置的${key}键对象缺少${noKey.join()}字段,请先配置${noKey.join()}字段`;
                }
            }            
            break;
        default:
            errorMsg = `请先去检查配置的列表配置${key}键`

    }

    handleFailCb({errorMsg, failCb})
}

module.exports = checkGet;
