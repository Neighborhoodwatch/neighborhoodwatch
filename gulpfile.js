const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

gulp.task('concat', function () {
  gulp.src(['./public/app/**/*.js'])
  .pipe(concat('all.js'))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./public/dist'))
});
gulp.task('sass', function () {
  return gulp.src('./public/app/**/*.sass')
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('watch', function(){
  gulp.watch('./public/app/**/*.sass', ['sass']);
  gulp.watch('./public/app/**/*.js', ['concat']);
})
