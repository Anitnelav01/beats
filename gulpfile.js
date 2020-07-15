const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const gulpif = require('gulp-if');
 
const env = process.env.NODE_ENV;
 
const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');
 
sass.compiler = require('node-sass');
 
task('clean', () => {
 return src(`${DIST_PATH}/**/*`, { read: false })
   .pipe(rm())
})
 
task('copy:svg', () => {
  return src(`${SRC_PATH}/svg/*.svg`)
  .pipe(dest(`${DIST_PATH}/svg`))
  .pipe(reload({ stream: true }));
 })

task('copy:img', () => {
  return src(`${SRC_PATH}/img/*.png`)
  .pipe(dest(`${DIST_PATH}/img`))
  .pipe(reload({ stream: true }));
 })

task('copy:html', () => {
 return src(`${SRC_PATH}/*.html`)
   .pipe(dest(DIST_PATH))
   .pipe(reload({ stream: true }));
})

task('copy:js', () => {
  return src(`${SRC_PATH}/scripts-api/*.js`)
    .pipe(dest(`${DIST_PATH}/js`))
    .pipe(reload({ stream: true }));
 })
 
task('styles', () => {
 return src([...STYLE_LIBS])
   .pipe(gulpif(env === 'dev', sourcemaps.init()))
   .pipe(concat('main.min.scss'))
   .pipe(sassGlob())
   .pipe(sass().on('error', sass.logError))
   .pipe(gulpif(env === 'prod', autoprefixer({
       browsers: ['last 2 versions'],
       cascade: false
     })))
   .pipe(gulpif(env === 'prod', gcmq()))
   .pipe(gulpif(env === 'prod', cleanCSS()))
   .pipe(gulpif(env === 'dev', sourcemaps.write()))
   .pipe(dest(`${DIST_PATH}/styles`))
   .pipe(reload({ stream: true }));
});
 
 
task('scripts', () => {
 return src([...JS_LIBS, 'src/scripts/*.js'])
   .pipe(gulpif(env === 'dev', sourcemaps.init()))
   .pipe(concat('js/main.min.js', {newLine: ';'}))
   .pipe(gulpif(env === 'prod', babel({
       presets: ['@babel/env']
     })))
   .pipe(gulpif(env === 'prod', uglify()))
   .pipe(gulpif(env === 'dev', sourcemaps.write()))
   .pipe(dest(DIST_PATH))
   .pipe(reload({ stream: true }));
});
 
 
task('server', () => {
 browserSync.init({
     server: {
         baseDir: "./dist"
     },
     open: false
 });
});
 
task('watch', () => {
 watch('./src/styles/**/*.scss', series('styles'));
 watch('./src/*.html', series('copy:html'));
 watch('./src/scripts/*.js', series('scripts'));
 watch('./src/scripts-api/*.js', series('copy:js'));
 watch('./src/scripts-api/*.js', series('copy:img'));
 watch('./src/scripts-api/*.js', series('copy:svg'));



});
 
 
task('default',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scripts','copy:js','copy:img','copy:svg'),
   parallel('watch', 'server')
 )
);
 
task('build',
 series(
   'clean',
   parallel('copy:html', 'styles', 'scripts','copy:js','copy:img','copy:svg'))
);