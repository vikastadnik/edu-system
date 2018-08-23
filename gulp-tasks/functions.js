const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const config = require('config');
const del = require('del');
const spawn = require('cross-spawn');

/**
 * Delete content of given folder but not the folder itself
 */
function clean(folder, callback) {
  const files = [
    path.join(folder, '**', '*'),
    path.join('!' + folder)
  ];
  del(files).then(() => callback());
}

/**
 * Return Gulp task which copies content of given source folder into destination folder
 */
function copy(source, dest) {
  const files = path.join(source, '**', '*');
  return gulp.src(files)
    .pipe(gulp.dest(dest));
}

/**
 * Run tslint on given files glob
 */
function tslint(modules, files, callback) {
  const task = path.join(modules, 'tslint');
  const thread = spawn(
    task, ['--format', 'stylish', files], {
      stdio: 'inherit'
    }
  );
  thread.on('exit', (error) => callback());
}

/**
 * Build Semantic UI styles bundle
 * Show only errors in console
 */
function semantic(location, callback) {
  const thread = spawn('gulp', ['build'], {
    stdio: ['ignore', 'ignore', process.stderr],
    cwd: location
  });
  thread.on('exit', (error) => callback());
}

/**
 * Create file with build information
 */
function getInfo(packageJsonPath, filename, callback) {
  const package = JSON.parse(fs.readFileSync(packageJsonPath));

  const info = `/* DO NOT MODIFY THIS FILE! */\n` +
    `export const BUILD: {\n` +
    `  VERSION: string;\n` +
    `  BASE_URL: string;\n` +
    `} = {\n` +
    `  VERSION: 'v${package.version}',\n` +
    `  BASE_URL: '${config.get('baseUrl')}'\n` +
    `};\n`;

  fs.writeFileSync(filename, info);
  callback();
}

/**
 * Spawn webpack process with given webpack config file
 * Set environment variables WEBPACK_ENTRY and WEBPACK_TARGET
 * Options object consists of:
 *  - modules: path to "node_modules" folder
 *  - webpack: path to webpack config file
 *  - entry: path to webpack entry point
 *  - target: path to webpack output target folder
 */
function webpack(options, callback) {
  const task = path.join(options.modules, 'webpack');
  /* Set additional environment variables for child process */
  const env = Object.assign(
    Object.create(process.env), {
      WEBPACK_ENTRY: options.entry,
      WEBPACK_TARGET: options.target
    }
  );

  const mode = (process.env.NODE_ENV === 'production') ? '-p' : '-d';
  const thread = spawn(
    task, [
      '--config', options.webpack,
      '--devtool', 'source-map',
      mode
    ], {
      stdio: 'inherit',
      env: env
    }
  );
  thread.on('exit', (error) => callback());
}

/**
 * Spawn webpack-dev-server process with given config and content-base folder
 * Set environment variables WEBPACK_ENTRY and WEBPACK_TARGET
 * Options object consists of:
 *  - modules: path to "node_modules" folder
 *  - webpack: path to webpack config file
 *  - content: path to content base folder
 *  - entry: path to webpack entry point
 *  - target: path to webpack output target folder
 */
function webpackDevServer(options, callback) {
  const task = path.join(options.modules, 'webpack-dev-server');
  /* Set additional environment variables for child process */
  const env = Object.assign(
    Object.create(process.env), {
      WEBPACK_ENTRY: options.entry,
      WEBPACK_TARGET: options.target
    }
  );

  const thread = spawn(
    task, [
      '--config', options.webpack,
      '--content-base', options.content,
      '--inline', '--hot',
      '--no-info', '-d'
    ], {
      stdio: 'inherit',
      env: env
    }
  );
  thread.on('exit', (error) => callback());
}

module.exports = {
  'copy': copy,
  'clean': clean,
  'tslint': tslint,
  'semantic': semantic,
  'getInfo': getInfo,
  'webpack': webpack,
  'webpackDevServer': webpackDevServer
};
