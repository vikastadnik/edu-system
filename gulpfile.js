const gulp = require('gulp');
const sequence = require('run-sequence');
const path = require('path');
const tasks = require('./gulp-tasks');

/** Create application bundle */
gulp.task('build', (callback) => {
  const tasks = [
    'build-clean',
    'build-copy-static-files',
    'build-tslint',
    // 'build-semantic',
    'build-get-info',
    'build-webpack'
  ];
  return sequence(...tasks, callback);
});

/** Start project as an application */
gulp.task('start', (callback) => {
  const tasks = [
    'build-clean',
    'build-copy-static-files',
    'build-tslint',
    // 'build-semantic',
    'build-get-info', [
      'build-webpack-dev-server',
      'build-watch'
    ]
  ];
  return sequence(...tasks, callback);
});

/** Clean target folder */
gulp.task('build-clean', (callback) => {
  tasks.functions.clean(tasks.paths.target, callback);
});

/** Copy static files from local project folder to target */
gulp.task('build-copy-static-files', () => {
  return tasks.functions.copy(tasks.paths.static, tasks.paths.target);
});

/** Lint source files of local project */
gulp.task('build-tslint', (callback) => {
  const files = path.join(tasks.paths.source, '**', '*.?(ts|tsx)');
  tasks.functions.tslint(tasks.paths.modules, files, callback);
});

/** Build Semantic UI styles bundle */
gulp.task('build-semantic', (callback) => {
  tasks.functions.semantic(tasks.paths.semantic, callback);
});

/** Create file with build information */
gulp.task('build-get-info', (callback) => {
  tasks.functions.getInfo(tasks.paths.package, tasks.paths.build.cfg, callback);
});

/** Compile source files using webpack */
gulp.task('build-webpack', (callback) => {
  tasks.functions.webpack({
    modules: tasks.paths.modules,
    webpack: tasks.paths.webpack,
    entry: tasks.paths.build.entry,
    target: tasks.paths.target
  }, callback);
});

/** Start webpack development server */
gulp.task('build-webpack-dev-server', (callback) => {
  tasks.functions.webpackDevServer({
    modules: tasks.paths.modules,
    webpack: tasks.paths.webpack,
    content: tasks.paths.target,
    entry: tasks.paths.build.entry,
    target: tasks.paths.target
  }, callback);
});

/** Watch static and src files */
gulp.task('build-watch', () => {
  gulp.watch(path.join(tasks.paths.source, '**', '*.?(ts|tsx)'), ['build-tslint']);
  gulp.watch(path.join(tasks.paths.static, '**', '*.*'), ['build-copy-static-files']);
});
