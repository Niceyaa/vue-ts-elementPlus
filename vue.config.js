/*
import AutoImport from 'unplugin-auto-import/webpack'
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    // ...
    plugins: [
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
}
*/
const path = require("path")

module.exports = {
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/styles/common.less")]
        }
    },
    lintOnSave: true,
    devServer: {
        overlay: {
            warnings: true,
            error: true
        }
    }
};
