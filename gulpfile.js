var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rimraf = require('gulp-rimraf'); // new version of gulp-clean
var put = require('gulp-put'); // copies while maintaining directory structure

var onError = function(err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};



////////////////////////////////////////////////////////////
// CONFIG
////////////////////////////////////////////////////////////

var js = {
    jQuery: 'js/vendor/jquery-1.11.3.js'
};
var jsSrc = [js.jQuery];

var cssSrc = 'css/dev/style.scss';

var buildDir = '_build';

/*  Files to be copied to build directory
    Note that the "*" selector will not include subdirectories,
    so the "dev" and "vendor" css/js directories are excluded */
var distFiles = [
    'js/*.js',
    'css/*.css',
    'img/*',
];



////////////////////////////////////////////////////////////
// TASKS
////////////////////////////////////////////////////////////

gulp.task('js', function() {
    gulp.src(jsSrc)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('dist.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(notify({message: 'Javascript (main) complete'}));
});

gulp.task('css', function() {
    gulp.src(cssSrc)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            broswers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
        .pipe(notify({message: 'CSS (main) completed'}));
});

gulp.task('watch', function() {
    gulp.watch('js/dev/*.js', ['js']);
    gulp.watch('css/dev/*css', ['css']);
});

gulp.task('clean', function() {
    return gulp.src(buildDir, {read: false})
        .pipe(rimraf());
});

gulp.task('build', ['js', 'css', 'clean'], function() {
    return gulp.src(distFiles)
        .pipe(put(buildDir));
});

gulp.task('default', ['js', 'css', 'watch']);
