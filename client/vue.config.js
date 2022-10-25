const path = require("path");
module.exports = {
  devServer: {
    proxy: {
      "^/": {
        target: "http://localhost:3000/",
        changeOrigin: true,
        ws: false,
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".vue"],
      alias: {
        "@": path.resolve("."),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules|vue\/src/,
          loader: "ts-loader",
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
  },
};
