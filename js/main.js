"use strict";

import * as UI from './UI.js';

const handleSearchBtn = () => {
    UI.searchedColumn.resetHighlighted();

    const searchingText = UI.searchForm.getSearchingText();
    const foundCount = UI.searchedColumn.highlightAndCount(searchingText);
    UI.searchForm.setCount(foundCount);
};

UI.searchForm.btn.addEventListener('click', handleSearchBtn);