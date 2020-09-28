const addLoader = require("./loader");
const addPlugins = require("./plugins");

function createCustomConfig(config) {
    const {
        module: moduleLoader,
        plugins
    } = config;
    return {
        module: {
            rules:addLoader(moduleLoader)
        },
        plugins: addPlugins(plugins)
    }
    
}

module.exports = createCustomConfig;
