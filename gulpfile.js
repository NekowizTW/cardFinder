var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    path        = require('path'),
    browserSync = require('browser-sync'),
    through2    = require('through2'),
    reload      = browserSync.reload,
    browserify  = require('browserify'),
    del         = require('del'),
    argv        = require('yargs').argv,
    uglify      = require('gulp-uglify'),
    cleancss    = require('gulp-clean-css');;

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./dist"
    }
  });
});

gulp.task('compass', function() {
  return gulp.src('./src/stylesheets/**/*.{scss,sass}')
    .pipe($.plumber())
    .pipe($.compass({
      css: 'dist/stylesheets',
      sass: 'src/stylesheets'
    }))
    .pipe(cleancss())
    .pipe(gulp.dest('dist/stylesheets'));
});


gulp.task('js', function() {
  return gulp.src('src/scripts/*.js')
    .pipe($.plumber())
    .pipe(through2.obj(function (file, enc, next) {
      browserify(file.path, { debug: true })
        .transform("babelify", {presets: ["es2015", "react"]})
        .transform(require('debowerify'))
        .bundle(function (err, res) {
          if (err) { return next(err); }
          file.contents = res;
            next(null, file);
        });
      }))
      .on('error', function (error) {
        console.log(error.stack);
        this.emit('end')
    })
  .pipe( $.rename('app.js'))
  .pipe( gulp.dest('dist/scripts/'));
});


gulp.task('clean', function(cb) {
  del('./dist', cb);
});

gulp.task('images', function() {
  return gulp.src('./src/images/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('templates', function() {
  return gulp.src('src/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe( gulp.dest("./dist") )
});

gulp.task('card_data', function() {
  return gulp.src('json/*.json')
    .pipe($.plumber())
    .pipe( gulp.dest('./dist/json') )
});

gulp.task('js-uglify', ['js'], function() {
  return gulp.src('./dist/scripts/*.js')
    .pipe(uglify())
    .pipe( gulp.dest('./dist/scripts') )
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('build', ['compass', 'js', 'templates', 'images', 'card_data']);

gulp.task('build-release', ['set-prod-node-env', 'build', 'js-uglify']);

gulp.task('serve', ['build', 'browser-sync'], function () {
  gulp.watch('src/stylesheets/**/*.{scss,sass}',['compass', reload]);
  gulp.watch('src/scripts/**/*.js',['js', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
  gulp.watch('src/*.jade',['templates', reload]);
});

gulp.task('default', ['serve']);
