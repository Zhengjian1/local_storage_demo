const { handleFailCb } = require("../utils");

function checkSet(agrs){
    const {
        storager, 
        storageList,
        key,
        failCb
    } = agrs;

    let errorMsg = "";
    
    // 校验存储是否配置表了
    switch(true){
        case !storageList.hasOwnProperty(key):
            errorMsg = `先去项目的src/constants文件没有配置${key}键,请检查是否没有存储${key}键`
        case !storager.hasOwnProperty(key):
            errorMsg = `本地localStorage 没有存储${key}键,请先存储${key}键`
    }

    handleFailCb({errorMsg, failCb})
}

module.exports = checkSet;