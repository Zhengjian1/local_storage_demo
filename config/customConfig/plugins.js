const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const args = require('minimist')(process.argv.slice(2));

const hasAnalyzer = args["analyzer"] === "true";

const plugins = [];

function addPlugins(defaultPlugins){

    if(hasAnalyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    // 引入全局local_storage_demo库

    plugins.push(
        new webpack.ProvidePlugin({
            local_storage_demo: 'local_storage_demo'    
        })
    )
    

    return plugins;
}

module.exports = addPlugins;