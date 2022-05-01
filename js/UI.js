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

const searchedColumn = new class {
    itemElements = document.querySelectorAll('.table__item:first-child');
    highlighted = [];

    highlightAndCount = (string) => {
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

    resetHighlighted = () => {
        this.highlighted.forEach((item) => {
            item.element.innerHTML = item.originalContent;
        });
        this.highlighted = [];
    };
};

const searchForm = new class {
    input = document.querySelector('.search-form__input');
    btn = document.querySelector('.search-form__submit-btn');
    foundCountFrame = document.querySelector('.found-count-frame');

    getSearchingText = () => {
        const value = this.input.value;
        this.resetInput();
        return value;
    };

    resetInput = () => {
        this.input.value = '';
    };

    setCount = (count) => {
        if (count !== 0) {
            this.foundCountFrame.textContent = `Количество совпадений: ${count}`;
            return;
        }

        this.foundCountFrame.textContent = 'Ничего не найдено';
    };
};

export {searchedColumn, searchForm};