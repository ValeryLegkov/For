import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _paginationMarkupBtn(direction) {
    const currPage = this._data.page;
    const page = direction === 'next' ? currPage + 1 : currPage - 1;
    const arrow = direction === 'next' ? 'right' : 'left';

    return `
        <button 
        data-goto="${page}"
        class="btn--inline pagination__btn--${direction}">
        <span>Page ${page}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrow}"></use>
          </svg>
        </button>`;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._paginationMarkupBtn('next');
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      // console.log(this._paginationMarkupBtn('prev'));
      return this._paginationMarkupBtn('prev');
    }

    // Other page
    if (curPage < numPages) {
      return (
        this._paginationMarkupBtn('next') + this._paginationMarkupBtn('prev')
      );
    }
    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
