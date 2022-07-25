import $ from 'jquery';
import './custom-elem.js';
import DataSource from './data-source.js';

const emptyResultElem = document.$OuterDiv = $('<empty-result>');
$('.search-result').html(emptyResultElem);


$('.search-btn').on('click', function() {
    const inputSearch = $(this).prev();
    searchFunction(inputSearch);
});
$(".input-search").on('keyup', function(e) {
    const inputSearch = $(this);
    if (e.keyCode === 13) {
        searchFunction(inputSearch);
    }
});

function searchFunction(inputSearch) {
    if (inputSearch.val() != '') {
        const keyword = inputSearch.val();
        inputSearch.attr('placeholder', 'Cari makan');
        $('.keyword').text(keyword);
        $('#pageSection').removeClass('hidden');
        $('.tophead').attr('style', '');
        $('.input-search').val(keyword);
        DataSource.findMeals(keyword);
    } else {
        $('.keyword').text('');
        inputSearch.attr('placeholder', 'Ketik keyword');
        inputSearch.focus();
    }
}

$('.random-btn').on('click', function() {
    $('.keyword').text('');
    $('#pageSection').removeClass('hidden');
    $('.tophead').attr('style', '');
    DataSource.randomMeals();
});
