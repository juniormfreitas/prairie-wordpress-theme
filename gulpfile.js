const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

// Copy third party libraries from /node_modules into /vendor
function buildBootstrap() {
    // Bootstrap
    return Promise.resolve(
        gulp.src([
            './node_modules/bootstrap/dist/**/*',
            '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
            '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
        ]).pipe(gulp.dest('./vendor/bootstrap'))
    );
}

function buildFontAwesome() {
    // Font Awesome
    return Promise.resolve(
        gulp.src([
            './node_modules/@fortawesome/**/*',
        ]).pipe(gulp.dest('./vendor'))
    );
}

function buildJquery() {
    // jQuery
    return Promise.resolve(
        gulp.src([
            './node_modules/jquery/dist/*',
            '!./node_modules/jquery/dist/core.js'
        ]).pipe(gulp.dest('./vendor/jquery'))
    );
}


// Compile SCSS
function compileCss() {

    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'));
}

// Minify CSS
function minifyCss() {

    return gulp.src([
        './css/*.css',
        '!./css/*.min.css'
    ])
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'));
}

// Minify JavaScript
function minifyJs() {

    return gulp.src([
        './src/js/*.js',
    ])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./js'));
}

function watchFiles() {
    gulp.watch('./src/scss/*.scss', { events: 'all' }, gulp.series(compileCss, minifyCss));
    gulp.watch('./src/js/*.js', { events: 'all' }, minifyJs);
}

exports.vendor = gulp.parallel(buildBootstrap, buildFontAwesome, buildJquery);
exports.default = gulp.series(compileCss, minifyCss, minifyJs);
exports.dev = gulp.series(compileCss, minifyCss, minifyJs, gulp.parallel(watchFiles));