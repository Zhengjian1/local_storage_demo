// const STORAGELIST = require("../../src/constants.js");
// const checkKeyRepeat = require("./check/checkKeyRepeat");
const createLocalStorage = require("./localStorage");

window.local_storage_demo = createLocalStorage({})

module.exports = createLocalStorage;
