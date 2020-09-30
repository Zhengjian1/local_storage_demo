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
            errorMsg = `请先去检查配置的列表配置${key}键配置${key}键`;
            break;
        case storager.hasOwnProperty(key):
            errorMsg = `${key}键已经被使用，请更换key值`;
            break;
    }

    handleFailCb({errorMsg, failCb})
}

module.exports = checkSet;