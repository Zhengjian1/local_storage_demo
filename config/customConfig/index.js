const addAlias = require("./alias");
const addLoader = require("./loader");
const addPlugins = require("./plugins");

function createCustomConfig(config) {
    const {
        alias,
        module: moduleLoader,
        plugins
    } = config;
    return {
        resolve:{
            alias: addAlias(alias)
        },
        module: {
            rules:addLoader(moduleLoader)
        },
        plugins: addPlugins(plugins)
    }
    
}

module.exports = createCustomConfig;
