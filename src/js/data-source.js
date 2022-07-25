import $ from 'jquery';
const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';
import EmptyResult from './custom-elem.js';
import Helper from './helper.js';

"use strict";

const DataSource = {
    findMeals: (keyword) => {
        Helper.scrollTo('#pageSection');
        searchResponseMessage('Sedang mencari makanan, tunggu yaa..', 'assets/img/illustration/Ice cream seller-amico.gif');
        fetch(`${baseUrl}search.php?s=${keyword}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.error) {
                    searchResponseMessage(responseJson.message);
                } else if (responseJson.meals == null) {
                    Helper.scrollToPt($(document).height());
                    searchResponseMessage();
                } else {
                    renderMealList(responseJson.meals);
                }
            })
            .catch(error => {
                if (error = 'SyntaxError: Unexpected end of JSON input') {
                    searchResponseMessage();
                } else {
                    searchResponseMessage(error);
                }
            });
    },
    randomMeals: () => {
        Helper.scrollTo('#pageSection');
        searchResponseMessage('Sedang mencari makanan, tunggu yaa..', 'assets/img/illustration/Ice cream seller-amico.gif');
        fetch(`${baseUrl}random.php`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.error) {
                    searchResponseMessage(responseJson.message);
                } else if (responseJson.length < 1) {
                    searchResponseMessage();
                } else {
                    renderMealList(responseJson.meals);
                }
            })
            .catch(error => {
                if (error = 'SyntaxError: Unexpected end of JSON input') {
                    searchResponseMessage();
                } else {
                    searchResponseMessage(error);
                }
            });
    },
}


const renderMealList = (meals) => {
    const listMealElement = $('.search-result');
    listMealElement.html('<div class="row food-list"></div>');


    $.each(meals, (key, meal) => {
        const image = new Image();
        image.src = (`${meal.strMealThumb}/preview`);
        image.alt = (`${meal.strMeal}`);

        let tags = '';
        if (meal.strTags != null) {
            tags += (`<div class="category-section tags"><span class="name">Tag</span> `);
            const mealTags = meal.strTags;
            $.each(mealTags.split(','), function(index, value) {
                tags += (`<span class="badge">${value}</span>`);
            });
            tags += (`</div>`);
        }

        let ingredients = '<ul>';
        for (var i = 1; i <= 20; i++) {
            if (meal["strIngredient" + i] != null && meal["strIngredient" + i] != '') {
                ingredients += `<li>${meal["strIngredient" + i]} (${meal["strMeasure" + i]})</li>`;
            }
        }
        ingredients += '</ul>';

        let source = '';
        if (meal.strSource != null && meal.strSource != '') {
            source = (`<a href="${meal.strSource}" target="_blank">${meal.strSource}</a>`);
        }

        $('.food-list').append(`
            <div class="food-item col-sm-12">
                <div class="card">
                    <div class="card-title card-title-close hidden"><a class="btn btn-outline-primary food-detail-close" href="#!">Kembali</a></div>
                    <div class="card-body">
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-link nav-tab nav-tab-detail active" data-tab="#sectionDetail" href="#">Detail</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-tab nav-tab-cook" data-tab="#sectionCaraMasak" href="#">Cara masak</a>
                            </li>
                        </ul>
                        <div class="section tab-section section-detail" id="sectionDetail">
                            <div class="thumbnail-wrapper">
                                <div class="thumbnail">
                                    <a id="url-img-${meal.idMeal}" href="${meal.strMealThumb}" class="img">
                                    </a>
                                </div>
                            </div>
                            <div class="info">
                                <a href="#!" data-id="${meal.idMeal}" class="title food-detail-trigger">${meal.strMeal}</a>
                                <div class="attribute">
                                    <div class="category">
                                        <div class="category-section">
                                            <span class="name">Asal</span>
                                            <span class="value">${meal.strArea != 'Unknown' ? meal.strArea : 'Tidak diketahui'}</span>
                                        </div>
                                        <div class="category-section">
                                            <span class="name">Kategori</span>
                                            <span class="value">${meal.strCategory != 'Unknown' ? meal.strCategory : 'Tidak diketahui'}</span>
                                        </div>
                                        ${tags}
                                    </div>
                                </div>
                                <div class="description" data-desc="${meal.strInstructions}">
                                    <p>${$.trim(meal.strInstructions).substring(0, 200).trim(this) + "..."}</p>
                                </div>
                            </div>
                            <div class="action">
                                <a class="btn btn-outline-primary food-detail-trigger food-detail-trigger-btn" href="#!" data-id="${meal.idMeal}">Selengkapnya</a>
                            </div>
                        </div>
                        <div class="section tab-section section-cook hidden" id="sectionCaraMasak">
                            <div class="cook-segment ingredient">
                                <div class="name">Bahan</div>
                                <div class="value">${ingredients}</div>
                            </div>
                            <div class="cook-segment howto">
                                <div class="name">Cara Masak</div>
                                <div class="value">${meal.strInstructions}</div>
                            </div>
                            <div class="cook-segment media my-5">
                                <div class="yt-wrapper" data-src="${meal.strYoutube.split("v=").pop()}" style="display: block; width: 100%; height: 50vh;">
                                </div>
                            </div>
                            <div class="cook-segment source pb-5">
                                <div class="name">Sumber</div>
                                <div class="value">${source}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
        $(`#url-img-${meal.idMeal}`).append(image);
    });

    $('.food-detail-trigger').on('click', function() {
        const $this = $(this);
        if (!$this.hasClass('disabled')) {
            const card = $this.parents('.card').first();
            const cardTop = card.offset().top - $(window).scrollTop();
            const cardLeft = card.offset().left - $(window).scrollLeft();
            const cardWidth = card.outerWidth();
            const cardHeight = card.outerHeight();

            card.css({
                'position': 'fixed',
                'z-index': '9999',
                'top': cardTop,
                'left': cardLeft,
                'width': cardWidth,
                'height': cardHeight,
            }).promise().done(function() {
                // ga tau kenapa promisenya ga jalan :( jadi kasih fallback timeout
                setTimeout(function() {
                    const imgSrc = card.find('.thumbnail img').attr('src');

                    if (!card.find('.thumbnail img.full-res')[0]) {
                        var newImage = new Image();
                        newImage.className = 'full-res';
                        newImage.src = imgSrc.replace('/preview', '');
                        newImage.onload = function() {
                            card.find('.thumbnail a').html(newImage);
                        }
                    }

                    const description = card.find('.description').attr('data-desc');
                    card.find('.description').text(description);
                    card.find('.food-detail-trigger-btn').addClass('hidden');
                    card.find('.food-detail-close').removeClass('hidden');
                    card.find('.title').addClass('disabled');
                    card.addClass('expand');
                    card.find('.card-title-close').removeClass('hidden');
                    const dataSrcYt = card.find('.yt-wrapper').attr('data-src');
                    if (!card.find('.yt-wrapper iframe')[0]) {
                        card.find('.yt-wrapper').html(`<iframe width="100%" height="100%" src="http://www.youtube.com/embed/${dataSrcYt}?enablejsapi=1&origin=http://example.com" frameborder="0"></iframe>`);
                    }
                    setTimeout(function() {
                        $('body').css('overflow', 'hidden');
                    }, 150);
                }, 10);
            });
        }
    });

    $('.food-detail-close').on('click', function() {
        const $this = $(this);
        const card = $this.parents('.card').first();

        card.removeClass('expand').promise().done(function() {

            $('.nav-tab').removeClass('active');
            $('.nav-tab-detail').addClass('active');
            $('.tab-section').addClass('hidden');
            $('.section-detail').removeClass('hidden');

            $('body').attr('style', '');
            const description = card.find('.description').attr('data-desc');
            card.find('.description').text($.trim(description).substring(0, 100).trim(this) + "...");
            card.find('.food-detail-trigger-btn').removeClass('hidden');
            card.find('.food-detail-close').addClass('hidden');
            card.find('.title').removeClass('disabled');
            card.find('.card-title-close').addClass('hidden');
            const imgSrc = card.find('.thumbnail img').attr('src');
            // ga tau kenapa promisenya ga jalan :( jadi kasih fallback timeout
            setTimeout(function() {
                card.attr('style', '');
            }, 150);
        });
    });
    $('a.img').on('click', function(e) {
        e.preventDefault();
        const $this = $(this);
        if ($this.parents('.card').first().hasClass('expand')) {
            if (!$this.hasClass('expand')) {
                const aImg = $this;
                const aImgLeft = aImg.offset().left - $(window).scrollLeft();
                const aImgWidth = aImg.outerWidth();
                const aImgHeight = aImg.outerHeight();

                aImg.css({
                    'position': 'fixed',
                    'z-index': '9999',
                    'margin-top': '-18px',
                    'left': aImgLeft,
                    'width': aImgWidth,
                    'height': aImgHeight,
                }).promise().done(function() {
                    // ga tau kenapa promisenya ga jalan :( jadi kasih fallback timeout
                    setTimeout(function() {
                        $this.addClass('expand');
                    }, 10);
                });
            } else {
                $this.removeClass('expand');
                setTimeout(function() {
                    $this.attr('style', '');
                }, 150);
            }
        } else {
            $this.parents('.card').first().find('.food-detail-trigger-btn').click();
        }
    });
    $('.nav-tab').on('click', function(e) {
        e.preventDefault();
        $('.nav-tab').removeClass('active');
        const $this = $(this);
        const dataTab = $this.attr('data-tab');
        $this.addClass('active');
        $('.tab-section').addClass('hidden');
        $this.parents('.card').first().find(dataTab).removeClass('hidden');
    });
};

const searchResponseMessage = (message = "Yahh, pencarianmu tidak ditemukan, yuk cari yang lain", src = 'assets/img/illustration/Fishing-amico.svg', header = 'Hasil Pencarian') => {
    EmptyResult.searchResultIllustration(message, src, header);
};

export default DataSource;
