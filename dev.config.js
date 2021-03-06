module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "bundle.js",
  },
  mode: "development",
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
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules"],
  },
  resolveLoader: {
    moduleExtensions: ["-loader"],
  },
  devServer: {
    historyApiFallback: true,
    // Uncomment to allow other connections
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8080,
    contentBase: "./",
  },
};
