# 舒适的开发

## 热更新 - 保存即可看到页面效果

## 打包自己的小作品

## 复制黏贴配置，找准官网

* [官网](https://www.webpackjs.com/)

## 步骤

* 新建项目
* 初始化自己的项目 yarn init -y
* 按照我们正常的目录结构src下
  * index.html
  * css文件夹 - index.css
  * js文件夹 - index.js
* 安装`yarn add -D webpack webpack-cli`
* 找到官网-中文文档-配置 
* 新建配置文件，复制黏贴，简单修改下路径，我们的入口文件是src下的js目录下的index.js
  * 里面的mode可以改成生产，具体可以看文档
  * 如果不配置mode构建，也会提示你配置
* 在package.json中新增命令build，具体代码如下
  ```
  "scripts": {
    "build": "webpack"
  },
  ``` 
* `yarn build`就能看到我们dist目录下有东西了
* 接着配置我们的页面，装一个插件`yarn add -D html-webpack-plugin`
* 在配置文件中新增配置
  ```
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var path = require('path');

  module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin({
      "template": "./src/index.html"
    })]
  };  
  ```  
* 此时在build的时候就发现了多了页面，自动也会引入我们的js
* 再来玩玩热更新，安装`webpack-dev-server`
* 新增热更新配置
```
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    contentBase: "./dist",
    open: true
  },
};
```  
* package.json新增dev命令
  ```
  {
    "name": "comfortable-dev",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
      "dev": "webpack-dev-server",
      "build": "webpack"
    },
    "devDependencies": {
      "html-webpack-plugin": "^4.3.0",
      "webpack": "^4.44.1",
      "webpack-cli": "^3.3.12",
      "webpack-dev-server": "^3.11.0"
    }
  }
  ```
* 此时输入`yarn dev`自动打开浏览器，并且修改js文件，页面实时更新
* 安装sass-loader，输入`yarn add sass-loader sass style-loader css-loader -D`
* 根据官方文档配置，代码如下
  ```
  var HtmlWebpackPlugin = require("html-webpack-plugin");
  var path = require("path");

  module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    devServer: {
      contentBase: "./dist",
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
  };

  ``` 
* 重启下`yarn dev`，因为热更新，我们引入下我们的index.scss并且添加点样式
* 热更新没有任何问题，样式也可以添加，接着我们玩下babel，把es6代码转成es5，`yarn add babel-loader @babel/core @babel/preset-env  -D`
* 同样修改我们的配置，再次热启动看下我们的代码是否有转成es5
  * 控制台进入Sources
  * 左侧webpack点击
  * 点击.
  * 找到js中的index.js
  * 的确转成es5了   
* 之后就是随意写些demo，然后最终想要压缩的代码的话，记得把mode改成生产，执行`yarn build`

* 这里展示此次demo最终的配置
  * package.json
  ```
  {
    "name": "comfortable-dev",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "scripts": {
      "dev": "webpack-dev-server",
      "build": "webpack"
    },
    "devDependencies": {
      "@babel/core": "^7.11.4",
      "@babel/preset-env": "^7.11.0",
      "babel-loader": "^8.1.0",
      "css-loader": "^4.2.2",
      "html-webpack-plugin": "^4.3.0",
      "sass": "^1.26.10",
      "sass-loader": "^10.0.0",
      "style-loader": "^1.2.1",
      "webpack": "^4.44.1",
      "webpack-cli": "^3.3.12",
      "webpack-dev-server": "^3.11.0"
    }
  }
  ```
  * webpack.config.js
    ```
    var HtmlWebpackPlugin = require("html-webpack-plugin");
    var path = require("path");

    module.exports = {
      mode: "production",
      entry: "./src/js/index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
        }),
      ],
      devServer: {
        contentBase: "./dist",
        open: true,
      },
      module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ],
      },
    };

    ```
