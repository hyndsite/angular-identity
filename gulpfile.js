var gulp = require('gulp'),
    connect = require('gulp-connect');
    jshint = require('gulp-jshint');
    uglify = require('gulp-uglify');
    minifyCSS = require('gulp-minify-css');
    clean = require('gulp-clean');

//clean up distribution directory
gulp.task('cleaning', function(){
    gulp.src(['./dist/*'])
        .pipe(clean({force:true}));
});

//lint code
gulp.task('linting', function(){
    gulp.src(['./app/*.js', '!./app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'))
});

gulp.task('css-minify', function(){
    gulp.src(['./app/*.css', '!.app/bower_components/**'])
        .pipe(minifyCSS({spare: true, comments:true}))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('js-minify', function(){
   gulp.src(['./app/*.js', '!./app/bower_components/**'])
       .pipe(uglify({
           outSourceMap: true
       }));
});

gulp.task('copy-html', function(){
    gulp.src(['./app/*.html'])
        .pipe(gulp.dest('dist/'))
});

gulp.task('copy-components', function(){
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

//distribution server
gulp.task('connect-dist', function(){
    connect.server({
        root: 'dist/',
        port: 30000
    })
})

//development server
gulp.task('connect', function() {
    connect.server({
        root: 'app/',
        port:8989,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./app/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
gulp.task('build', ['linting', 'css-minify', 'js-minify', 'copy-html', 'copy-components', 'connect-dist']);