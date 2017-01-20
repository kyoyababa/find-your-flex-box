/**
 * Global node plugins
 **/
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import filter from 'gulp-filter';

/**
 * Web page builder
 **/
import webserver from 'gulp-webserver';
import plumber from 'gulp-plumber';
import ejs from 'gulp-ejs';

/**
 * Assets builder
 **/
import browserify from 'browserify';
import bebelify from 'babelify';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssmin from 'gulp-cssmin';
import watch from 'gulp-watch';
import watchify from 'watchify';


/**
 * Clean task
 **/
gulp.task('clean', () => {
  return del([
    'dist',
    '**/.DS_Store',
    '**/*.log'
  ]);
});

/**
 * Webserver builder
 **/
gulp.task('webserver', () => {
  gulp.src('./dist/')
    .pipe(webserver({
      host: 'localhost',
      port: 5555,
      livereload: true
    })
  );
});

/**
 * EJS builder
 **/
gulp.task('ejs', () => {
  gulp.src('./pages/*.ejs')
    .pipe(plumber({
      handleError: (error) => {
        throw new Error(error);
        this.emit('end');
      }
    }))
    .pipe(ejs())
    .pipe(rename((path) => {
      path.extname = '.html';
    }))
    .pipe(gulp.dest('./dist'));
});

/**
 * React / Redux builder
 **/
const browserifyConfig = browserify({
  entries: ['./assets/_scripts/common.js'],
  transform: ['babelify'],
  cache: {},
  packageCache: {},
  plugin: [watchify]
})
  .on('update', bundle)
  .on('log', gutil.log);

function bundle() {
  return browserifyConfig.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error')  )
    .pipe(source('common.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/scripts'));
};

gulp.task('browserify', bundle);

/**
 * Sass compiler
 **/
gulp.task('sass', () => {
  return gulp.src('./assets/_scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(filter('**/*.css'))
    .pipe(autoprefixer('last 3 version'))
    .pipe(cssmin())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/styles/')
  );
});

/**
 * Assets builder
 **/
gulp.task('build', () => {
  return runSequence(
    ['sass', 'ejs', 'browserify'],
  );
});

/**
 * Assets watcher
 **/
gulp.task('watch', () => {
  watch('./assets/_scss/**/*.scss', () => {
    return runSequence(
      ['sass'],
    );
  });

  watch('./assets/_scripts/**/*.js', () => {
    return runSequence(
      ['browserify']
    )
  });

  watch('./pages/**/*.ejs', () => {
    return runSequence(
      ['ejs']
    )
  });
});

/**
 * Gulp default task
 **/
gulp.task('default', () => {
  throw new Error('Default task is not supported!! Please use "npm start"');
});

/**
 * Gulp npm task
 **/
gulp.task('start', ['webserver'], () => {
  return runSequence(
    ['clean'],
    ['build'],
    ['watch']
  );
});
