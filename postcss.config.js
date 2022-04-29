

const postcssImportWebpackResolver = require('postcss-import-webpack-resolver');
const webpack = require('./webpack.config.js');

const webpackConfig = webpack({
    development: false,
});

module.exports = {
    plugins: {
        'postcss-import': {
            resolve: postcssImportWebpackResolver({
                alias: webpackConfig.resolve.alias,
                modules: ['src', 'node_modules'],
            }),
        },
        'postcss-mixins': {
        },
        // 用于在 URL ( )上重新定位、内嵌或复制。
        'postcss-url': {
            url: 'rebase',
        },
        // cssnext 已经不再维护，推荐使用 postcss-preset-env
        'postcss-preset-env': {
            stage: 0,
            autoprefixer: {
                grid: true,
            },
        },
        // 这个插件可以在写 nested 样式时省略开头的 &
        'postcss-nested': {},
                    
        // 将 @at-root 里的规则放入到根节点
        'postcss-atroot': {},
        // 提供 @extend 语法
        'postcss-extend-rule': {},
                    
        // 变量相关
        'postcss-advanced-variables': {
            // variables 属性内的变量为全局变量
        },
        // 类似于 stylus，直接引用属性而不需要变量定义
        'postcss-property-lookup': {},
    },
};
