function checkKeyRepeat(storageObj, key){
    if(storageObj.hasOwnProperty(key)){
        throw new Error(`src/constants文件STORAGELIST列表中${key}键已经被使用，请更换key值,重新配置`);
    }
}

module.exports = checkKeyRepeat;