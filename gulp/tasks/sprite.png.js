'use strict';

module.exports = function() {
    $.gulp.task('sprite:png', function () {
        var spriteData = $.gulp.src('./source/images/*.png').pipe($.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            algoritm: 'left-right',
            padding:20
        }));

        return spriteData.img.pipe($.gulp.dest($.config.root + '/assets/sprite/'));
        spriteData.css.pipe($.gulp.dest($.config.root + '/assets/sprite/styles/'));


    });
};