const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.resolve(root, 'source');
const target = path.resolve(root, 'dist');

const paths = {
  source: source,
  target: target,
  static: path.resolve(root, 'static'),
  semantic: path.resolve(root, 'semantic'),
  package: path.resolve(root, 'package.json'),
  webpack: path.resolve(root, 'webpack.config.js'),
  modules: path.resolve(root, 'node_modules', '.bin'),

  build: {
    cfg: path.join(source, 'build.cfg.ts'),
    entry: path.join(source, 'index.app.tsx')
  }
};

module.exports = paths;
