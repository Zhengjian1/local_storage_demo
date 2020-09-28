const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const args = require('minimist')(process.argv.slice(2));

const hasAnalyzer = args["analyzer"] === "true";

const plugins = [];

function addPlugins(defaultPlugins){

    if(hasAnalyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    // 引入全局zj_local_storage库

    plugins.push(
        new webpack.ProvidePlugin({
            zj_local_storage: 'zj_local_storage'    
        })
    )
    

    return plugins;
}

module.exports = addPlugins;