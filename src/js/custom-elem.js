import $ from 'jquery';

class EmptyResult extends HTMLElement {

    connectedCallback() {
        this.src = this.getAttribute('src') || 'assets/img/illustration/Eating together-amico.svg';
        this.caption = this.getAttribute('caption') || 'Ayo cari sesuatu untuk dimakan';

        this.innerHTML = (`
         <img src="${this.src}">
         <p class="text-muted mb-5">${this.caption}</p>
       `);
    }
    static searchResultIllustration(message, src, header) {
        $('.search-header').text(header);
        const emptyResultElem = document.$OuterDiv = $('<empty-result>')
            .attr('src', src)
            .attr('caption', message);
        $('.search-result').html(emptyResultElem);
    }
}

customElements.define('empty-result', EmptyResult);


export default EmptyResult;
