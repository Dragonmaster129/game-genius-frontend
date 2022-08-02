const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["react", "env"],
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, "../static") }], {}),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"],
  },
  resolveLoader: {
    moduleExtensions: ["-loader"],
  },
};
