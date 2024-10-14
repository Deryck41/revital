const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

// Используем динамический импорт для gulp-autoprefixer и gulp-imagemin
async function scssTask() {
    const autoprefixer = (await import('gulp-autoprefixer')).default;
    return gulp.src('app/scss/*.+(scss|sass)')
        .pipe(sass({ errLogToConsole: true }))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'], cascade: true }))
        .pipe(gulp.dest('dist/css'))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
}

gulp.task('img', async function() {
    const imagemin = (await import('gulp-imagemin')).default;
    const gifsicle = (await import('imagemin-gifsicle')).default;
    const mozjpeg = (await import('imagemin-mozjpeg')).default;
    const optipng = (await import('imagemin-optipng')).default;
    const svgo = (await import('imagemin-svgo')).default;

    return gulp.src(['app/img/*', 'app/img/*/*'], { allowEmpty: true }) // Добавляем allowEmpty
        .pipe(imagemin([
            gifsicle({ interlaced: true }),
            mozjpeg({ quality: 75, progressive: true }),
            optipng({ optimizationLevel: 5 }),
            svgo({
                plugins: [
                    { name: 'removeViewBox', active: true },
                    { name: 'preset-default', params: { overrides: { removeViewBox: false } } }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/img'));
});




gulp.task('scss', scssTask);

// Другие задачи остаются без изменений
gulp.task('scripts-all', function() {
    return gulp.src(['app/js/*.js', '!app/js/script.js'])
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('scripts-min', function() {
    return gulp.src('app/js/script.js', { allowEmpty: true }) // Добавлена опция allowEmpty
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.+(scss|sass)', gulp.series('scss'));
    gulp.watch('app/*.html', gulp.series('html'));
    gulp.watch('app/js/*.js', gulp.series('scripts-all'));
    gulp.watch('app/js/script.js', gulp.series('scripts-min'));
});

gulp.task('dfl', gulp.parallel('html', 'scss', 'scripts-all', 'scripts-min', 'browser-sync', 'watch', 'img'));

