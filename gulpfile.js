var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('build-css', function() {
    return gulp.src('app/client/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', function(error){
            console.log(error.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('public/styles'));
});


gulp.task('watch', function() {
    //gulp.watch(input.javascript, ['jshint', 'build-js']);
    gulp.watch('app/client/sass/**/*.scss', ['build-css']);
});
