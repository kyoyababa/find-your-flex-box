import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';
// import bundle from 'bundle';

import webserver from 'gulp-webserver';
import watch from 'gulp-watch';

import browserify from 'browserify';
import watchify from 'watchify';
import bebelify from 'babelify';

import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';

import ejs from 'gulp-ejs';

gulp.task('clean', () => {
  return del([
    'dist',
    '**/.DS_Store',
    '**/*.log'
  ]);
});




gulp.task('ejs', () => {
  gulp.src('./pages/**/*.ejs')
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



const browserifyConfig = browserify({
  entries: ['./assets/_scripts/common.js'],
  transform: ['babelify'],
  cache: {},
  packageCache: {},
  plugin: [watchify]
})
.on('update', bundle)
.on('log', gutil.log);

function bundle(){
  return browserifyConfig.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error')  )
    .pipe(source('common.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/assets/scripts'));
};

// gulp.task('browserify', () => {
  // console.log('browserify star')
  // const browserifyConfig = browserify({
  //   entries: ['./assets/_scripts/common.js'],
  //   transform: ['babelify'],
  //   cache: {},
  //   packageCache: {},
  //   plugin: [watchify]
  // })
  // .on('update', bundle)
  // .on('log', gutil.log);

gulp.task('browserify', bundle);


gulp.task('webserver', () => {
  gulp.src('./dist/')
    .pipe(webserver({
      host: 'localhost',
      port: 5555,
      livereload: true
    })
  );
});

// gulp.task('default', ['js']);

gulp.task('confirmation', () => {
  console.log('now gulp is watching your file changes!!!');
});

gulp.task('build', () => {
  return runSequence(
    // ['title'],
    // ['sass', 'ejs', 'imagemin', 'fontmin'],
    ['ejs'],
    // ['cssmin', 'uglify']
    ['browserify']
  );
});

gulp.task('watch', () => {
  // watch('./assets/_scss/**/*.scss', () => {
  //   return runSequence(
  //     ['sass'],
  //     ['cssmin']
  //   );
  // });

  watch('./assets/_scripts/**/*.js', () => {
    return runSequence(
      // ['uglify']
      ['browserify']
    )
  });

  watch('./pages/**/*.ejs', () => {
    return runSequence(
      ['ejs']
    )
  });

  // watch('./assets/images/**/*', () => {
  //   return runSequence(
  //     ['imagemin']
  //   )
  // });
});


gulp.task('default', () => {
  throw new Error('Default task is not supported!! Please use "npm start"');
});

gulp.task('start', ['webserver'], () => {
  return runSequence(
    ['clean'],
    ['build'],
    ['watch'],
    ['confirmation']
  );
});
