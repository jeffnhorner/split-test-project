// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Gridsome",
  plugins: [],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "vue-style-loader",
          "css-loader",
          {
              // Compiles Sass to CSS
              loader: "sass-loader",
              // Requires sass-loader@^8.0.0
              options: {
                  implementation: require('sass'),
                  sassOptions: {
                      fiber: require('fibers'),
                      indentedSyntax: true // optional
                  },
              },
          },
        ]
      }
    ]
  }
};
