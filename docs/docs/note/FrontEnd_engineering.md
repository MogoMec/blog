---
title: 前端工程化
---

- 模块化（包括 css、js、资源文件的模块化）
- 组件化（复用现有的 UI 结构、样式、行为）
- 规范化（工程目录、编码规范、git 分支管理等）
- 自动化（自动化构建、自动部署、自动化测试）

## 模块化

模块化需要解决全局变量污染、数据保护的问题，同时还需要解决模块之间依赖关系的维护。

### CommonJS

Common 是一种模块化规范，Node.js 遵循该规范，Node.js 也在逐步用 ES6 Module 替代 CommonJS。

[CommonJS 规范](http://javascript.ruanyifeng.com/nodejs/module.html)

- 导出

  - `module.exports`
  - `module`变量代表当前模块

- 导入

  - `require`方法用于加载模块：**读入并执行一个 js 文件，然后返回该模块的 exports 对象。**

  - ```javascript
    var example = require("./example.js");
    ```

- 特点
  - 所有代码都运行在模块作用域，不会污染全局作用域
  - 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
  - 模块加载的顺序，按照其在代码中出现的顺序。

### ES6 模块化

[Module 的语法 - ECMAScript 6 入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#docs/module)

- 导出

  - `export`关键字，可以使用`as`关键字进行重命名

  - ```javascript
    var firstName = "Michael";
    var lastName = "Jackson";
    var year = 1958;

    export { firstName, lastName, year };
    ```

- 导入

  - `import`关键字

  - ```javascript
    // main.js
    import { firstName, lastName, year } from "./profile.js";

    function setName(element) {
      element.textContent = firstName + " " + lastName;
    }
    ```

- 特点

  - ES6 的模块自动采用严格模式
  - 动态绑定，无缓存，拿到的是实时值

## Webpack

- 描述：webpack 是一个模块打包器，是一种模块化（工程化）的解决方案。将 JS 模块以及一些扩展语言转化成合适的格式供浏览器使用（模块化支持）。也能进行代码压缩混淆、JS 兼容性处理、性能优化等。

### 基础使用

[概念 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/concepts/)

- 模块化开发中可以使用 src 目录保存开发源码，在其中使用各种模块化开发规范以及扩展语言，再利用 webpack 工具打包（解析模块化，处理依赖），最后在 html 文件中引入打包的 js 文件。
- 基础命令

### 配置文件（webpack.config.js）

- 基本模板

  ```javascript
  // 动态获取文件绝对路径
  const path = require("path");

  module.exports = {
    // 模块打包入口
    entry: "./src/index.js",
    // 模块构建出口
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          //设置loader应用文件格式，正则匹配
          test: /\.css$/i,
          // 设置使用的loader，注意webpack使用loader的顺序为从右向左
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html"
      })
    ]
  };
  ```

- entry

  - 模块打包入口
  - 默认：src->index.js

- output

  - 模块构建出口
  - 默认：dist->main.js

- mode

  - 表示 webpack 运行模式
  - development 模式：不会对打包得到的 js 文件进行压缩
  - production 模式：对打包得到的 js 进行压缩

- loader

  - [Loaders | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/loaders/)

  - webpack 本身只能处理 js 文件，如果需要打包 css 等文件，需要使用 loader（转换器）

  - 使用 npm 安装 loader

    eg.`npm install -D css-loader`

  - 在配置文件的 module 关键字下进行配置

- plugin

  - 描述：loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。（扩展器）

  - html-webpack-plugin
    - `html-webpack-plugin`插件的作用是每次使用`webpack`命令，都会自动在`dist`（指构建出口）生成一个`html`文件，这个`html`文件会自动引入我们的`bundle.js`
  - clean-webpack-plugin
    - 构建前自动删除上次生成的打包内容

- devServer

  - 开发服务器用于在使用 webpack 开发时实时预览修改，避免开发中的多次打包
    - `contentBase`：为哪一个文件夹提供本地服务，默认是根文件夹，一般配置为`contentBase: path.join(__dirname, 'dist'),`

- 配置文件的分离

  - 配置文件分离的根本原因在于**开发环境**和**生产环境**下有不同的构建目标，我们需要为不同的环境编写独立的配置文件，而遵循不重复原则，将保留一个通用配置，并使用`webpack-merge` 工具引入通用配置

### Source Map

- 描述：Source Map 就是一个信息文件，里面储存着位置信息。也就是说，Source Map 文件中存储着压缩混淆后的代码，所对应的转换前的位置。
- 配置 devtool [Devtool | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/devtool/#root)
- 一般开发环境中设置：
  - `devtool: 'eval-source-map'`，可以对每个错误进行精准定位
- 生产环境中一般
  - 禁用 Source Map
  - `devtool: 'nosources-source-map'`，定位行数，但是不暴露源码

## ESLint

[ESLint - 插件化的 JavaScript 代码检测工具 - ESLint 中文文档 (bootcss.com)](https://eslint.bootcss.com/)

- 描述：可组装的 JavaScript 和 JSX 检查工具，用于约定代码编写规范，并提供一定的自动修复功能。
- 在 vue2 项目中，ESLint 配置由`.eslintrc.js`文件规定，重点关注其中的`rules`节点

## UI 库

### Vant

- 按需引入
