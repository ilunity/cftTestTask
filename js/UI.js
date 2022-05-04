"use strict";

function highlightHTML(html, pos, length) {
    let resultHtml =
        html.slice(0, pos) +
        `<span class='highlighted'>` +
        html.slice(pos, pos + length) +
        '</span>' +
        html.slice(pos + length);

    return resultHtml;
}

class searchedColumn {
    static itemElements = document.querySelectorAll('.table__item:first-child');
    static highlighted = [];

    static highlightAndCount = (string) => {
        string = string.toLowerCase();

        let foundCount = 0;
        this.itemElements.forEach((element) => {
            const foundStringIndex = element.innerHTML.toLowerCase().indexOf(string);
            if (foundStringIndex === -1) return;

            foundCount += 1;
            this.highlighted.push({element, originalContent: element.innerHTML});
            element.innerHTML = highlightHTML(element.innerHTML, foundStringIndex, string.length);
        });

        return foundCount;
    };

    static resetHighlighted = () => {
        this.highlighted.forEach((item) => {
            item.element.innerHTML = item.originalContent;
        });
        this.highlighted = [];
    };
}

class searchForm {
    static input = document.querySelector('.search-form__input');
    static btn = document.querySelector('.search-form__submit-btn');
    static foundCountFrame = document.querySelector('.found-count-frame');

    static getSearchingText = () => {
        const value = this.input.value;
        this.resetInput();
        return value;
    };

    static resetInput = () => {
        this.input.value = '';
    };

    static setCount = (count) => {
        if (count !== 0) {
            this.foundCountFrame.textContent = `Количество совпадений: ${count}`;
            return;
        }

        this.foundCountFrame.textContent = 'Ничего не найдено';
    };
}

export {searchedColumn, searchForm};