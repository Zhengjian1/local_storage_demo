const paths = require("../paths");

const alias = {}

function addAlias(defauleAlias) {
    
    alias["@utils"] = `${paths.appSrc}/utils`;
    alias["@indexed_DB"] = `${paths.appSrc}/indexed_DB`;

    return alias;
}

module.exports = addAlias;