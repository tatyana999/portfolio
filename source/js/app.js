
//fullscreen
$(document).ready(function(){
  $('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });
});

//knob
$(function($) {

    $('.knob').knob({
        change : function (value) {
            //console.log("change : " + value);
        },
        release : function (value) {
            //console.log(this.$.attr('value'));
            console.log("release : " + value);
        },
        cancel : function () {
            console.log('cancel : ', this);
        },
        /*format : function (value) {
         return value + '%';
         },*/
        draw : function () {

            // 'tron' case
            if(this.$.data('skin') == 'tron') {

                this.cursorExt = 0.3;

                var a = this.arc(this.cv)  // Arc
                    , pa                   // Previous arc
                    , r = 1;

                this.g.lineWidth = this.lineWidth;

                if (this.o.displayPrevious) {
                    pa = this.arc(this.v);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });

});

//flip
$(function(){
    $('#avtoriz').on('click', function(e) {
        e.preventDefault();
        $('.avtoriz__buttom').css('display', 'none');
        $('.flipper').css('transform', 'rotateY(180deg');
    });
});


//map
$(function initialize() {
    var styles =[
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#666666"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#083c96"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ];
    var styledMap = new google.maps.StyledMapType(styles,
        {name: 'Styled Map'});

    var mapOptions = {
        zoom: 15,
        scrollwheel: false,
        center: new google.maps.LatLng(55.39162409999997,36.724943199999974),
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };

    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);
    var marker = new google.maps.Marker({
        position: {lat: 55.38862409999896, lng:36.721943199999974 },
        map: map,
        icon: {
            url: '/assets/img/map_marker.svg',
            scaledSize: new google.maps.Size(24, 34)
        }
    });

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

});



//preloader

$(window).on('load', function () {
    var preloader = (function(){
        var percentsTotal = 1,
            preloader = $('#p_prldr');

        var imgPath = $('*').map(function (ndx, element) {
            var background = $(element).css('background-image'),
                img = $(element).is('img'),
                path = '';

            if (background != 'none') {
                path = background.replace('url("', '').replace('")', '');
            }

            if (img) {
                path = $(element).attr('src');
            }

            if (path) return path
        });

        var setPercents = function (total, current) {
            var persents = Math.ceil(current / total * 100);

            $('.persent').text(persents + '%');

            if (persents >= 100) {
                preloader.fadeOut();
            }
        };

        var loadImages = function (images) {

            if (!images.length) preloader.fadeOut();

            images.forEach(function (img, i, images) {
                var fakeImage = $('<img>', {
                    attr : {
                        src : img
                    }
                });

                fakeImage.on('load error', function () {
                    setPercents(images.length, percentsTotal);
                    percentsTotal++;
                });
            });
        };

        return {
            init: function () {
                var imgs = imgPath.toArray();
                loadImages(imgs);
            }
        }

    }());
    preloader.init();
});




//blogscroll adaptive
$ (function(){
    $('.semicircle').on('click', function(e){
        e.preventDefault();
        $('.semicircle').css('left', '300px');
        $('.nav-menu').animate({
            'width': '300px'
        });

    });

    $('.mainarticles').on('click', function(e){
        var windowWidth = $(window).width();
        if(windowWidth < 768) {
            $('.nav-menu').animate({
                'width': '0px'
            });
            $('.semicircle').css('left', '0');
        }

    });

});

//scrollupdown

$(document).ready(function(){
        $('.arrow__up-scroll').on('click ', function () {
            var win = $(window).height();
            $('body,html').animate({
                scrollTop: win
            }, 800);
            return false;
        });
    $('.arrow-scroll').on('click ', function () {
        var win = $(window).height();
        $('body,html').animate({
            scrollTop: win
        }, 800);
        return false;
    });
});

//DIFFICULTSLIDER


$(function () {
var aviatitle = {
    generate : function (string, block) {
        var
            wordsArray = string.split(''), // найти массив слов
            stringArray = string.split(''), // найти массив всех симовлов в строке
            sentence = [],
            word = '';

        block.text(''); // очищаем блок вывода

        wordsArray.forEach(function(currentWord) {
            var wordsArray = currentWord.split(''); // массив символов в слове

            wordsArray.forEach(function(letter) {
                var letterHtml = '<span class="letter-span">' + letter + '</span>';
                // каждую букву оборачиваем в свой span
                word += letterHtml;
            });
            // берем отдельное слово и оборачиваем его в класс
            var wordHTML = '<span class="letter-word">' + word + '</span>'
            // добавим в массив предложения
            sentence.push(wordHTML);
            word = '';
        });
        // добавим в блок сгенерированую разметку для предложения
        block.append(sentence.join(' '));

        // анимация появления
        var
            letters = block.find('.letter-span'), // найдем все наши буквы
            counter = 0,
            timer,
            duration = 500 / stringArray.length; // находим длительность для каждой буквы

        function showLetters() {
            var currentLetter = letters.eq(counter);

            currentLetter.addClass('active');
            counter++;

            if (typeof timer !== 'undefined') {
                clearTimeout(timer);
            }

            timer = setTimeout(showLetters, duration);
        }

        showLetters();

    },
};
var Slider = function(container) {
    var
        nextBtn     = container.find('.works-slider__control-btn_left'),
        prevBtn     = container.find('.works-slider__control-btn_right'),
        items       = nextBtn.find('.works-slider__control-item'),
        display     = container.find('.works-slider__display'), // Витрина слайдера
        title       = container.find('.subtitle'),
        skills      = container.find('.works__cont-desc'),
        link        = container.find('.works__cont-view'),
        itemsLength = items.length,
        duration    = 500,
        flag        = true;

    var timeout;

    this.counter = 0;

    // private
    // Генерация разметки кнопки следующий слайд
    var generateMarkups = function() {
        var list = nextBtn.find('.works-slider__control-list'),
            markups = list.clone();

        prevBtn
            .append(markups)
            .find('.works-slider__control-item')
            .removeClass('active')
            .eq(this.counter + 1)
            .addClass('active');
    }
    // Вытащить данные из дата атрибутов для левой части слайдера
    var getDataArrays = function() {
        var dataObject = {
            pics : [],
            title : [],
            skills : [],
            link : []
        };

        $.each(items, function() {
            var $this = $(this);

            dataObject.pics.push($this.data('full'));
            dataObject.title.push($this.data('title'));
            dataObject.skills.push($this.data('skills'));
            dataObject.link.push($this.data('link'));
        });

        return dataObject;
    }

    var slideInLeftBtn = function(slide) {
        var
            reqItem = items.eq(slide - 1),
            activeItem = items.filter('.active');

        activeItem
            .stop(true, true)
            .animate({'top' : '100%'}, duration);

        reqItem
            .stop(true, true)
            .animate({'top' : '0%'}, duration, function () {
                $(this).addClass('active')
                    .siblings().removeClass('active')
                    .css('top', '-100%')
            });


    }

    var slideInRightBtn = function (slide) {
        var
            items = prevBtn.find('.works-slider__control-item'),
            activeItem = items.filter('.active'),
            reqSlide = slide + 1;

        if (reqSlide > itemsLength - 1) {
            reqSlide = 0;
        }

        var reqItem = items.eq(reqSlide);

        activeItem
            .stop(true, true)
            .animate({'top' : '-100%'}, duration);

        reqItem
            .stop(true, true)
            .animate({'top' : '0%'}, duration, function () {
                $(this).addClass('active')
                    .siblings().removeClass('active')
                    .css('top', '100%')
            });
    };

    var changeMainPicture = function(slide) {
        var image = display.find('.works-slider__display-pic');
        var data = getDataArrays();

        image
            .stop(true, true)
            .fadeOut(duration / 2, function() {
                image.attr('src', data.pics[slide]);
                $(this).fadeIn(duration / 2);
            });
    }

    var changeTextData = function(slide) {
        var data = getDataArrays();

        // название работы
        aviatitle.generate(data.title[slide], title, 'ru');

        // описание технологий
        aviatitle.generate(data.skills[slide], skills, 'en');

        // ссылка
        link.attr('href', data.link[slide]);
    }

    // public
    this.setDefaults = function() {
        var
            _that = this,
            data = getDataArrays();

        // создаем разметку
        generateMarkups();

        // левая кнопка
        nextBtn
            .find('.works-slider__control-item')
            .eq(_that.counter - 1)
            .addClass('active');

        // правая кнопка
        prevBtn
            .find('.works-slider__control-item')
            .eq(_that.counter + 1)
            .addClass('active');

        // основное изображение
        display
            .find('.works-slider__display-pic')
            .attr('src', data.pics[_that.counter]);

        // текстовые описания
        changeTextData(_that.counter);

    };

    this.moveSlide = function(direction) {
        var _that = this;

        var directions = {
            next : function() {
                // закольцовывание слайдера
                if (_that.counter < itemsLength - 1) {
                    _that.counter++;
                } else {
                    _that.counter = 0;
                }
            },

            prev : function () {
                if (_that.counter > 0) {
                    _that.counter--;
                } else {
                    _that.counter = itemsLength - 1;
                }
            }
        };

        directions[direction]();

        if (flag) {
            flag = false;

            if (typeof timeout != 'undefined') {
                clearTimeout(timeout);
            }

            timeout = setTimeout(function () {
                flag = true;
            }, duration + 50);

            slideInLeftBtn(_that.counter);
            slideInRightBtn(_that.counter);
            changeMainPicture(_that.counter);
            changeTextData(_that.counter);
        }
    };
};

var slider = new Slider($('.works'));
slider.setDefaults();

$('.works-slider__control-btn_left').on('click', function(e){
    e.preventDefault();
    slider.moveSlide('prev');
});

$('.works-slider__control-btn_right').on('click', function(e){
    e.preventDefault();
    slider.moveSlide('next');
});

console.dir(slider);

});


//STARS

$(function () {

var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    MAX_PARTICLES = 200,
    DRAW_INTERVAL = 60,
    container = document.querySelector('.starsbackgr'),
    canvas = document.querySelector('#pixie'),
    context = canvas.getContext('2d'),
    gradient = null,
    pixies = new Array();


function setDimensions(e) {
    // WIDTH = window.innerWidth;
    // HEIGHT = window.innerHeight;

    WIDTH = container.offsetWidth;
    HEIGHT = container.offsetHeight;

    // container.style.width = WIDTH + 'px';
    // container.style.height = HEIGHT + 'px';
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}
setDimensions();
window.addEventListener('resize', setDimensions);

function Circle() {
    this.settings = {
        ttl: 8000, // используется для расчета полужизни -или полураспада-каждой частицы
        xmax: 5, // определяет максимальное число пикселей , частица может двигаться каждый кадр
        ymax: 2,
        rmax: 10, // максимальный радиус частицы может достичь
        rt: 1, // используется, чтобы определить , как отношение максимальной скорости и полной непрозрачности каждой частицы в каждом кадре
        xdef: 960,
        ydef: 540,
        xdrift: 4,
        ydrift: 4,
        random: true,
        blink: true
    };

    this.reset = function() {
        this.x = (this.settings.random ? WIDTH * Math.random() : this.settings.xdef);
        this.y = (this.settings.random ? HEIGHT * Math.random() : this.settings.ydef);
        this.r = ((this.settings.rmax - 1) * Math.random()) + 1;
        this.dx = (Math.random() * this.settings.xmax) * (Math.random() < .5 ? -1 : 1);
        this.dy = (Math.random() * this.settings.ymax) * (Math.random() < .5 ? -1 : 1);
        this.hl = (this.settings.ttl / DRAW_INTERVAL) * (this.r / this.settings.rmax);
        this.rt = Math.random() * this.hl;
        this.settings.rt = Math.random() + 1;
        this.stop = Math.random() * .2 + .4;
        this.settings.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
        this.settings.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    };

    this.fade = function() {
        this.rt += this.settings.rt;
    };

    this.draw = function() {
        if (this.settings.blink && (this.rt <= 0 || this.rt >= this.hl)) {
            this.settings.rt = this.settings.rt * -1;
        } else if (this.rt >= this.hl) {
            this.reset();
        }

        var newo = 1 - (this.rt / this.hl);
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.closePath();

        var cr = this.r * newo;
        gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
        gradient.addColorStop(0.0, 'rgba(255,255,255,' + newo + ')');
        gradient.addColorStop(this.stop, 'rgba(77,101,181,' + (newo * .6) + ')');
        gradient.addColorStop(1.0, 'rgba(77,101,181,0)');
        context.fillStyle = gradient;
        context.fill();
    };

    this.move = function() {
        this.x += (this.rt / this.hl) * this.dx;
        this.y += (this.rt / this.hl) * this.dy;
        if (this.x > WIDTH || this.x < 0) this.dx *= -1;
        if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
    };

    this.getX = function() {
        return this.x;
    };
    this.getY = function() {
        return this.y;
    }
}

for (var i = 0; i < MAX_PARTICLES; i++) {
    pixies.push(new Circle());
    pixies[i].reset();
}

function draw() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
    for (var i = 0; i < pixies.length; i++) {
        pixies[i].fade();
        pixies[i].move();
        pixies[i].draw();
    }
}

setInterval(draw, DRAW_INTERVAL);
});