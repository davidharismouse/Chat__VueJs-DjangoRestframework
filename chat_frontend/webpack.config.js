/*eslint-env node*/

const path = require("path");
const glob = require("glob");
const BundleTracker = require("webpack-bundle-tracker");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const env = process.env.NODE_ENV;

// 動的にエントリーファイルを設定.
const entries = {};
const jsDir = "./project/static/js";

glob.sync("!(__)*/", {cwd: jsDir}).map(dir => {
  const dirname = path.parse(dir).name;
  glob.sync("index.js", {cwd: `${jsDir}/${dirname}`}).map(file => {
      entries[dirname] = path.resolve(`${jsDir}/${dirname}`, file);
    });
});

module.exports = {
  context: __dirname,
  mode: env,
  entry: entries,
  output: {
    filename: "[name]-[contenthash].js",
    path: path.resolve("./project/static/bundles/"),
    publicPath: "",
  },

  plugins: [
    new BundleTracker({ filename: "./project/webpack-stats.json" }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.s?(c|a)ss$/,
        use: [
          "vue-style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".vue"],
    modules: ["node_modules"],
    alias: {
      vue: path.resolve("./node_modules/vue/dist/vue.esm.js"),
    },
  },
};
