const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const SVG_IMG_FILES = ['src/images/**/*.svg'];
const IMG_FILES = ['src/**/*.jpg','src/**/*.png','src/**/*.gif','src/**/*.jpeg','src/**/*.svg'];

gulp.task('scripts', () => {
/*
  var tsResult = gulp.src("src/*.ts")
  .pipe(ts({
        noImplicitAny: true,
        out: "output.js"
  }));
  return tsResult.js.pipe(gulp.dest('dist'));
*/
  const tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());
  return tsResult.js
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
});
gulp.task('svg_images', function () {
  return gulp.src(SVG_IMG_FILES)
  .pipe(gulp.dest('dist/images'));
});
gulp.task('images', function () {
  return gulp.src(IMG_FILES)
  .pipe(gulp.dest('dist'));
});
gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src( 'src/scss/main.scss' )
  .pipe( sourcemaps.init() )
  .pipe( sass().on('error', sass.logError) )
  .pipe( cleanCSS({debug: true}, (details) => {
    console.log(details.name + ': ' + details.stats.originalSize+ ' => ' + details.stats.minifiedSize);
  }))
  .pipe(sourcemaps.write())
//  .pipe(rename('all-styles.css'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', ['scripts','assets','sass'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
  gulp.watch(IMG_FILES, ['images']);
  gulp.watch(JSON_FILES, ['assets']);
  gulp.watch('src/scss/**/*.scss',['sass']);
});

gulp.task('default', ['watch']);