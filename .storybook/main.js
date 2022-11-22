module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/html",
  babel: async (options) => {
    return options;
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    //
    config.module.rules.push({
      test: /\.m?(j|t)sx?$/,
      exclude: /(dist)/,
      loader: require.resolve("babel-loader"),
      options: {
        extends: "@krakenjs/babel-config-grumbler/babelrc-browser",
      },
    });

    config.module.rules.push({
      test: /\.scss$/i,
      use: [
        require.resolve("isomorphic-style-loader"),
        {
          loader: require.resolve("css-loader"),
          options: {
            importLoaders: 1,
          },
        },
        require.resolve("scoped-css-loader"),
        require.resolve("sass-loader"),
      ],
    });


    // Return the altered config
    return config;
  },
}
