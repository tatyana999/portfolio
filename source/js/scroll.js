$(function(){

    var scrollMenu = (function () {
        var $news = $('.news'),
            $item = $('.menu__item'),
            $wrapMenu = $('.nav-menu'),
            body = document.body,
            isPositionArticle = [],
            offsetHeight = 200,

            positionArticle = function (element) {
                var len = element.length;
                for ( let i = 0; i < len; i++) {
                    isPositionArticle[i] = {};
                    isPositionArticle[i].top = element
                            .eq(i)
                            .offset()
                            .top - offsetHeight;
                    isPositionArticle[i].bottom = isPositionArticle[i].top + element
                            .eq(i)
                            .innerHeight();
                }
            };

            scrollPageFixMenu = function (e) {

                var scroll = window.pageYOffset;
                if (scroll < $news.offset().top) {
                    $wrapMenu.removeClass('fixed');
                } else {
                    $wrapMenu.addClass('fixed');
                }
            }

            scrollPage = function (e) {
                var scroll = window.pageYOffset;
                for (let i = 0; i < isPositionArticle.length; i++) {
                    if (scroll >= isPositionArticle[i].top && scroll <= isPositionArticle[i].bottom) {
                        $item
                            .eq(i)
                            .addClass('menu__item--active')
                            .siblings()
                            .removeClass('menu__item--active');
                        console.log(i);
                    }
                }
            }

            clickOnMenu = function (e) {
                var index = $(e.target).index();
                var sectionOffset = $news
                    .eq(index)
                    .offset()
                    .top;
                $(document).off('scroll', scrollPage);
                $('body, html').animate({
                    'scrollTop': sectionOffset
                }, function () {
                    $(e.target)
                        .addClass('menu__item--active')
                        .siblings()
                        .removeClass('menu__item--active');
                    $(document).on('scroll', scrollPage);
                });
            }

            addListener = function () {
                $('.menu').on('click', clickOnMenu);

                $(document).on('scroll', scrollPage);
                $(document).on('scroll', scrollPageFixMenu);

                $(window).on('load', function (e) {
                    positionArticle($news);
                });

                $(window).on('resize', function (e) {
                    positionArticle($news);
                })
            };

        return {
            init: addListener
        }
    })();

    scrollMenu.init();


});