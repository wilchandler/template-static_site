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
var rename = require('gulp-rename');

var onError = function(err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};



////////////////////////////////////////////////////////////
// CONFIG
////////////////////////////////////////////////////////////

// Paths to Javascript files
var js = {
    jQuery: 'js/vendor/jquery-1.11.3.js'
};

// Add all javascripts to be included in build to the array below
var jsSrc = [js.jQuery];


// Location of the 'manifest' Sass file (will import Sass files)
var cssSrc = 'css/dev/style.scss';

// Final names of process JS and CSS 
var jsDistName = 'dist.min.js';
var cssDistName = 'dist.min.css';

// Directory to which all build files will be copied
var buildDir = '_build';

// Files to be copied to build directory
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
        .pipe(concat(jsDistName))
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
        .pipe(rename(cssDistName))
        .pipe(autoprefixer({
            broswers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
        .pipe(notify({message: 'CSS (main) completed'}));
});

gulp.task('watch', function() {
    gulp.watch('js/**/*.js', ['js']);
    gulp.watch('css/**/*css', ['css']);
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
