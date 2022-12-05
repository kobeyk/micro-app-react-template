const { name } = require("./package");
const {
  override,
  addLessLoader,
  fixBabelImports,
  addWebpackAlias,
  adjustStyleLoaders,
  watchAll,
  overrideDevServer,
} = require("customize-cra");
const path = require("path");
const NODE_ENV=process.env.NODE_ENV;
module.exports = {
  // 接入qiankun主应用需调整webpack配置
  webpack: override(
    (config) => {
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = "umd";
      config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
      if ("development" === NODE_ENV) {
        /**
         * Webpack5在开发环境下默认会开启缓存，这会导致antd主题色二次修改不起作用
         * 如果想在dev模式下愉快的修改antd主题色N次，可以加上下面这句话
         */
        config.cache = false;
      }
      return config;
    },
    // antd js/css 按需引入 
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    }),
    //antd less 全局变量修改，目的：动态注入antd全局UI组件主题色
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "green" }, //自定义主题
      },
    }),
    adjustStyleLoaders(({ use: [, , postcss] }) => {
      const postcssOptions = postcss.options;
      postcss.options = { postcssOptions };
    }),
    // 设置路径别名
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@core": path.resolve(__dirname, "src/core"),
      "@datas": path.resolve(__dirname, "src/datas"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@utils": path.resolve(__dirname, "src/utils"),
    })
  ),
  // 接入qiankun主应用dev模式下需支持站点跨域访问
  devServer: overrideDevServer((config) => {
    config.headers = config.headers || {};
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
  }, watchAll()),
};
