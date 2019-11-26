const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const runSequence = require('gulp4-run-sequence');


// CSS Kodları
gulp.task('css', () => {
    return gulp.src('src/assets/source/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('src/assets/public/css'));
});

// JS Kodları
gulp.task('js', () => {
    return gulp.src('src/assets/source/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('src/assets/public/js'));
});

// Temizleme metodu
gulp.task('delete', () => del(
    [
        'src/assets/public/css',
        'src/assets/public/js'
    ]
));


// Değişiklikleri izleme kodları
gulp.task('watch', () => {
    gulp.watch("src/assets/source/scss/**/*.scss", gulp.series('css'));
    gulp.watch("src/assets/source/js/**/*.js", gulp.series('js'));
});


// Gulp varsayılanları başlatma
gulp.task('default', () => {
    runSequence(
        'css',
        'js',
        'watch'
    );
});

