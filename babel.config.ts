module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { modules: false },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    'module:jsx-control-statements',
  ]
};
