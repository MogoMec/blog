(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{521:function(t,s,a){"use strict";a.r(s);var e=a(7),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("ul",[a("li",[t._v("模块化（包括 css、js、资源文件的模块化）")]),t._v(" "),a("li",[t._v("组件化（复用现有的 UI 结构、样式、行为）")]),t._v(" "),a("li",[t._v("规范化（工程目录、编码规范、git 分支管理等）")]),t._v(" "),a("li",[t._v("自动化（自动化构建、自动部署、自动化测试）")])]),t._v(" "),a("h2",{attrs:{id:"模块化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#模块化"}},[t._v("#")]),t._v(" 模块化")]),t._v(" "),a("h3",{attrs:{id:"前端模块化发展历程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前端模块化发展历程"}},[t._v("#")]),t._v(" 前端模块化发展历程")]),t._v(" "),a("p",[t._v("一个模块是实现一个特定功能的一组方法法的封装。")]),t._v(" "),a("p",[t._v("随着前端需求的复杂化，代码的模块化开发变得越来越重要。")]),t._v(" "),a("p",[t._v("最原始时简单地"),a("strong",[t._v("使用函数")]),t._v("（利用函数的独立作用域）实现，几个函数为一个模块，但只要任意造成"),a("strong",[t._v("全局变量污染")]),t._v("，且各个模块之前没有联系。")]),t._v(" "),a("p",[t._v("后来也有通过"),a("strong",[t._v("对象")]),t._v("来实现模块，部分解决了全局变量污染，但是封装性不好，内部属性可以被外部代码修改。")]),t._v(" "),a("p",[t._v("常用的是"),a("strong",[t._v("立即执行函数")]),t._v("实现，通过利用闭包来实现模块私有作用域的建立，同时不会对全局作用域造成污染。")]),t._v(" "),a("p",[t._v("现代模块化解决方案需要解决全局变量污染、数据保护的问题，同时还需要解决模块之间"),a("strong",[t._v("依赖关系")]),t._v("的维护。")]),t._v(" "),a("h3",{attrs:{id:"commonjs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#commonjs"}},[t._v("#")]),t._v(" CommonJS")]),t._v(" "),a("p",[t._v("CommonJS 是一种模块化规范，服务器端常用方案，Node.js 遵循该规范，不过Node.js 也在逐步用 ES6 Module 替代 CommonJS。该规范以"),a("strong",[t._v("同步")]),t._v("方式引入模块，在浏览器中模块的加载使用的是"),a("strong",[t._v("网络请求")]),t._v("，为了避免阻塞，使用"),a("strong",[t._v("异步加载")]),t._v("更为合适。")]),t._v(" "),a("p",[a("a",{attrs:{href:"http://javascript.ruanyifeng.com/nodejs/module.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("CommonJS 规范"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[a("p",[t._v("导出")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("module.exports")])]),t._v(" "),a("li",[a("code",[t._v("module")]),t._v("变量代表当前模块")])])]),t._v(" "),a("li",[a("p",[t._v("导入")]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("require")]),t._v("方法用于加载模块："),a("strong",[t._v("读入并执行一个 js 文件，然后返回该模块的 exports 对象。")])])]),t._v(" "),a("li",[a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" example "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./example.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])]),t._v(" "),a("li",[a("p",[t._v("特点")]),t._v(" "),a("ul",[a("li",[t._v("所有代码都运行在模块作用域，不会污染全局作用域")]),t._v(" "),a("li",[t._v("模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。")]),t._v(" "),a("li",[t._v("模块加载的顺序，按照其在代码中出现的顺序。")])])])]),t._v(" "),a("h3",{attrs:{id:"es6-模块化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#es6-模块化"}},[t._v("#")]),t._v(" ES6 模块化")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://es6.ruanyifeng.com/#docs/module",target:"_blank",rel:"noopener noreferrer"}},[t._v("Module 的语法 - ECMAScript 6 入门 (ruanyifeng.com)"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[a("p",[t._v("导出")]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("export")]),t._v("关键字，可以使用"),a("code",[t._v("as")]),t._v("关键字进行重命名")])]),t._v(" "),a("li",[a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" firstName "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Michael"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" lastName "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Jackson"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" year "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1958")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" firstName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" lastName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" year "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])])]),t._v(" "),a("li",[a("p",[t._v("导入")]),t._v(" "),a("ul",[a("li",[a("p",[a("code",[t._v("import")]),t._v("关键字")])]),t._v(" "),a("li",[a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// main.js")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" firstName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" lastName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" year "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./profile.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setName")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("element")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  element"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("textContent "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" firstName "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('" "')]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" lastName"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])])]),t._v(" "),a("li",[a("p",[t._v("特点")]),t._v(" "),a("ul",[a("li",[t._v("ES6 的模块自动采用严格模式")]),t._v(" "),a("li",[t._v("动态绑定，无缓存，拿到的是实时值")])])])]),t._v(" "),a("h2",{attrs:{id:"webpack"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webpack"}},[t._v("#")]),t._v(" Webpack")]),t._v(" "),a("ul",[a("li",[t._v("描述：webpack 是一个模块打包器，是一种模块化（工程化）的解决方案。将 JS 模块以及一些扩展语言转化成合适的格式供浏览器使用（模块化支持）。也能进行代码压缩混淆、JS 兼容性处理、性能优化等。")])]),t._v(" "),a("h3",{attrs:{id:"基础使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#基础使用"}},[t._v("#")]),t._v(" 基础使用")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://webpack.docschina.org/concepts/",target:"_blank",rel:"noopener noreferrer"}},[t._v("概念 | webpack 中文文档 (docschina.org)"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[t._v("模块化开发中可以使用"),a("code",[t._v("src")]),t._v("目录保存开发源码，在其中使用各种模块化开发规范以及扩展语言，再利用 webpack 工具打包（解析模块化，处理依赖），最后在"),a("code",[t._v("html")]),t._v(" 文件中引入打包的"),a("code",[t._v("js")]),t._v(" 文件。")]),t._v(" "),a("li",[t._v("基础命令")])]),t._v(" "),a("h3",{attrs:{id:"配置文件-webpack-config-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置文件-webpack-config-js"}},[t._v("#")]),t._v(" 配置文件（webpack.config.js）")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("基本模板")]),t._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 动态获取文件绝对路径")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" path "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"path"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 模块打包入口")]),t._v("\n  entry"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./src/index.js"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 模块构建出口")]),t._v("\n  output"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__dirname"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"dist"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    filename"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"bundle.js"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  module"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    rules"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//设置loader应用文件格式，正则匹配")]),t._v("\n        test"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v("\\.css$")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-flags"}},[t._v("i")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置使用的loader，注意webpack使用loader的顺序为从右向左")]),t._v("\n        use"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"style-loader"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"css-loader"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  plugins"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("HtmlWebpackPlugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      template"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"index.html"')]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])]),t._v(" "),a("li",[a("p",[t._v("entry")]),t._v(" "),a("ul",[a("li",[t._v("模块打包入口")]),t._v(" "),a("li",[t._v("默认：src->index.js")])])]),t._v(" "),a("li",[a("p",[t._v("output")]),t._v(" "),a("ul",[a("li",[t._v("模块构建出口")]),t._v(" "),a("li",[t._v("默认：dist->main.js")])])]),t._v(" "),a("li",[a("p",[t._v("mode")]),t._v(" "),a("ul",[a("li",[t._v("表示 webpack 运行模式")]),t._v(" "),a("li",[t._v("development 模式：不会对打包得到的 js 文件进行压缩")]),t._v(" "),a("li",[t._v("production 模式：对打包得到的 js 进行压缩")])])]),t._v(" "),a("li",[a("p",[t._v("loader")]),t._v(" "),a("ul",[a("li",[a("p",[a("a",{attrs:{href:"https://webpack.docschina.org/loaders/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Loaders | webpack 中文文档 (docschina.org)"),a("OutboundLink")],1)])]),t._v(" "),a("li",[a("p",[t._v("webpack 本身只能处理 js 文件，如果需要打包 css 等文件，需要使用 loader（转换器）")])]),t._v(" "),a("li",[a("p",[t._v("使用 npm 安装 loader")]),t._v(" "),a("p",[t._v("eg."),a("code",[t._v("npm install -D css-loader")])])]),t._v(" "),a("li",[a("p",[t._v("在配置文件的 module 关键字下进行配置")])])])]),t._v(" "),a("li",[a("p",[t._v("plugin")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("描述：loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。（扩展器）")])]),t._v(" "),a("li",[a("p",[t._v("html-webpack-plugin")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("html-webpack-plugin")]),t._v("插件的作用是每次使用"),a("code",[t._v("webpack")]),t._v("命令，都会自动在"),a("code",[t._v("dist")]),t._v("（指构建出口）生成一个"),a("code",[t._v("html")]),t._v("文件，这个"),a("code",[t._v("html")]),t._v("文件会自动引入我们的"),a("code",[t._v("bundle.js")])])])]),t._v(" "),a("li",[a("p",[t._v("clean-webpack-plugin")]),t._v(" "),a("ul",[a("li",[t._v("构建前自动删除上次生成的打包内容")])])])])]),t._v(" "),a("li",[a("p",[t._v("devServer")]),t._v(" "),a("ul",[a("li",[t._v("开发服务器用于在使用 webpack 开发时实时预览修改，避免开发中的多次打包\n"),a("ul",[a("li",[a("code",[t._v("contentBase")]),t._v("：为哪一个文件夹提供本地服务，默认是根文件夹，一般配置为"),a("code",[t._v("contentBase: path.join(__dirname, 'dist'),")])])])])])]),t._v(" "),a("li",[a("p",[t._v("配置文件的分离")]),t._v(" "),a("ul",[a("li",[t._v("配置文件分离的根本原因在于"),a("strong",[t._v("开发环境")]),t._v("和"),a("strong",[t._v("生产环境")]),t._v("下有不同的构建目标，我们需要为不同的环境编写独立的配置文件，而遵循不重复原则，将保留一个通用配置，并使用"),a("code",[t._v("webpack-merge")]),t._v(" 工具引入通用配置")])])])]),t._v(" "),a("h3",{attrs:{id:"source-map"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#source-map"}},[t._v("#")]),t._v(" Source Map")]),t._v(" "),a("ul",[a("li",[t._v("描述：Source Map 就是一个信息文件，里面储存着位置信息。也就是说，Source Map 文件中存储着压缩混淆后的代码，所对应的转换前的位置。")]),t._v(" "),a("li",[t._v("配置 devtool "),a("a",{attrs:{href:"https://webpack.docschina.org/configuration/devtool/#root",target:"_blank",rel:"noopener noreferrer"}},[t._v("Devtool | webpack 中文文档 (docschina.org)"),a("OutboundLink")],1)]),t._v(" "),a("li",[t._v("一般开发环境中设置：\n"),a("ul",[a("li",[a("code",[t._v("devtool: 'eval-source-map'")]),t._v("，可以对每个错误进行精准定位")])])]),t._v(" "),a("li",[t._v("生产环境中一般\n"),a("ul",[a("li",[t._v("禁用 Source Map")]),t._v(" "),a("li",[a("code",[t._v("devtool: 'nosources-source-map'")]),t._v("，定位行数，但是不暴露源码")])])])]),t._v(" "),a("h2",{attrs:{id:"eslint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#eslint"}},[t._v("#")]),t._v(" ESLint")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://eslint.bootcss.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("ESLint - 插件化的 JavaScript 代码检测工具 - ESLint 中文文档 (bootcss.com)"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[t._v("描述：可组装的 JavaScript 和 JSX 检查工具，用于约定代码编写规范，并提供一定的自动修复功能。")]),t._v(" "),a("li",[t._v("在 vue2 项目中，ESLint 配置由"),a("code",[t._v(".eslintrc.js")]),t._v("文件规定，重点关注其中的"),a("code",[t._v("rules")]),t._v("节点")])]),t._v(" "),a("h2",{attrs:{id:"ui-库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ui-库"}},[t._v("#")]),t._v(" UI 库")]),t._v(" "),a("h3",{attrs:{id:"vant"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vant"}},[t._v("#")]),t._v(" Vant")]),t._v(" "),a("ul",[a("li",[t._v("按需引入")])])])}),[],!1,null,null,null);s.default=n.exports}}]);