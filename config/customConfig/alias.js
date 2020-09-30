const utils = require("../../src/local_storage_demo/utils");
const paths = require("../paths");

const alias = {}

function addAlias(defauleAlias) {
    
    alias["@utils"] = `${paths.appSrc}/utils`;

    return alias;
}

module.exports = addAlias;