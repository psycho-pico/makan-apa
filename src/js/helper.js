import $ from 'jquery';

"use strict";

const Helper = {
    scrollTo: (elem) => {
        elem = $(elem);
        const additionHeight = $('.navbar-search-outer').hasClass('show-state') && $('.navbar-search-outer').hasClass('show') ? 122 : 72;
        $('html, body').animate({
            scrollTop: elem.offset().top - additionHeight
        }, 200);
    },
    scrollToPt: (pt) => {
        $('html, body').animate({
            scrollTop: pt
        }, 200);
    }
}

export default Helper;
