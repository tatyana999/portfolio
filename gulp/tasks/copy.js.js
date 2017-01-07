'use strict';

module.exports = function () {

    $.gulp.task('copy:js', function() {
        return $.gulp.src('./source/js/**/*.*')
            .pipe($.gulp.dest($.config.root + '/assets/js'));
    });
};