import AbstractComponent from "./abstract-component.js";
import {SORT_OPTIONS} from "../constants";


const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`
};

const createSortOption = (name) => {
  return `<a href="#" data-sort-type="${SortType[name]}" class="board__filter">SORT BY ${SORT_OPTIONS[name]}</a>`;
};

const createSortTemplate = () => {
  let sortOptionMarkup = ``;

  for (const [key] of Object.entries(SORT_OPTIONS)) {
    sortOptionMarkup += createSortOption(key);
  }

  return (
    `<div class="board__filter-list">
    ${sortOptionMarkup}
    </div>`
  );
};


export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }
      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}

export {SortType};
