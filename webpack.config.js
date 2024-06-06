const path = require('path'); // 引入 Node.js 的 path 模塊
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入 HtmlWebpackPlugin 插件
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin'); // 引入 Module Federation 插件
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
  // 設置編譯模式，'development' 表示開發模式
  mode: 'development',
  // 入口文件配置，Webpack 將從這裡開始打包
  entry: './src/index.tsx',
  // 輸出配置，打包後的文件將存放在這裡
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 輸出目錄
    filename: 'bundle.js', // 輸出的文件名
  },
  // 模塊配置，告訴 Webpack 如何處理不同類型的文件
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // 添加對 CSS 文件的處理
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  // 插件配置，使用插件來擴展 Webpack 的功能
  plugins: [
    // HtmlWebpackPlugin 將自動生成一個 HTML 文件，並將打包後的 JS 文件引入
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定 HTML 模板文件
    }),
    // ModuleFederationPlugin 用於微前端架構
    new ModuleFederationPlugin({
      name: 'app', // 微前端應用的名稱
      filename: 'remoteEntry.js', // 打包後的文件名稱
      remotes: {
        sider: 'sider@http://localhost:3003/remoteEntry.js',
      },
      exposes: {
        './App': './src/App', // 暴露的模塊及其路徑
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies.react, // 更新版本要求
        },
        'react-dom': {
          singleton: true,
          requiredVersion: packageJson.dependencies['react-dom'], // 更新版本要求
        },
      },
    }),
    // 插件用于熱加載
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 開發服務器配置，設置開發環境下的本地服務器
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // 設定靜態文件的目錄
    },
    port: 3002, // 服務器運行的端口
    historyApiFallback: true, // 支持 HTML5 History API
  },
};
