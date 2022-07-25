import $ from 'jquery';
import './custom-elem.js';
import Helper from './helper.js';

// scroll
///////////////////////////////////////
///////////////////////////////////////

var scrollFunction = function() {
    var randomBtnWrapperTop = $('.random-btn-wrapper').offset().top;
    var topheadTopPoint = $('.tophead-top-point').offset().top;

    let pointNavbarChange = 0;
    let pointNavbarSearchbarShow = 0;
    if ($(window).width() > 992) {
        pointNavbarChange = topheadTopPoint;
        pointNavbarSearchbarShow = randomBtnWrapperTop - 72 + 60;
    } else {
        pointNavbarChange = topheadTopPoint - 72;
        pointNavbarSearchbarShow = randomBtnWrapperTop - 72 + 60;
    }

    if ($('#mainNav').offset().top > pointNavbarChange) {
        $('#mainNav').addClass('navbar-scrolled');
    } else {
        $('#mainNav').removeClass('navbar-scrolled');
    }

    if ($(this).scrollTop() > pointNavbarSearchbarShow) {
        $('.navbar-search, .navbar-search-toggler, .navbar-search-outer').addClass('show-state');
    } else {
        $('.navbar-search, .navbar-search-toggler, .navbar-search-outer').removeClass('show-state');
    }
};
scrollFunction();
$(window).scroll(scrollFunction);


// click
///////////////////////////////////////
///////////////////////////////////////

$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').on('click', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && !$(this).attr('href').includes('#!')) {
        // var target = $(this.hash);
        var target = $(this).attr('href');
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            e.preventDefault();
            Helper.scrollTo(target);
        }
    }
});

$('.navbar-search-toggler').on('click', function() {
    $('.navbar-search-outer').toggleClass('show');
    $('.navbar-search-toggler i').toggleClass('fa-times');
    $('.search-secton .input-search').focus();
})
