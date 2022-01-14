const path = require("path")

module.exports = {
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/styles/common.less")]
        }
    },
    lintOnSave: false,
    devServer: {
        port: 88,
        overlay: {
            warnings: true,
            error: true
        }
    }
};
