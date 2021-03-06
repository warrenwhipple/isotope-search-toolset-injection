import $ from 'jquery';
import stickybits from 'stickybits';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import Fuse from 'fuse.js';

export function init(options = {}) {
  const defaultOptions = {
    wrapperSelector: '.isotope-search',
    stickySelector: '.isotope-search__sticky',
    inputSelector: '.isotope-search input',
    gridSelector: '.isotope-search__grid',
    columnSizerSelector: '.isotope-search__column-sizer',
    gutterSizerSelector: '.isotope-search__gutter-sizer',
    gridItemSelector: '.isotope-search__item',
    searchTextSelectors: ['.isotope-search__search-text'],
    topOffset: 16,
    layoutOnImagesLoaded: false,
    filteringClass: 'isotope-search--filtering',
    transitionDuration: 200,
  };
  const {
    wrapperSelector,
    stickySelector,
    inputSelector,
    gridSelector,
    gridItemSelector,
    columnSizerSelector,
    gutterSizerSelector,
    searchTextSelectors,
    topOffset,
    layoutOnImagesLoaded,
    filteringClass,
    transitionDuration,
  } = Object.assign({}, defaultOptions, options);

  const $stickyWrapper = $(wrapperSelector),
    $input = $(inputSelector),
    $grid = $(gridSelector),
    $items = $(gridItemSelector);

  // Sticky search bar
  stickybits(stickySelector, { stickyBitStickyOffset: topOffset });

  // Initialize Isotope layout and sort data
  const isotope = new Isotope(gridSelector, {
    itemSelector: gridItemSelector,
    masonry: {
      columnWidth: columnSizerSelector,
      gutter: gutterSizerSelector,
    },
    transitionDuration,
    getSortData: {
      score: '[isotope-search-score] parseFloat',
    },
  });

  // Refresh layout after images load
  if (layoutOnImagesLoaded)
    imagesLoaded(gridSelector, () => {
      isotope.layout();
    });

  // Scroll to wrapper top
  let isScrollingToWrapperTop = false;
  function scrollToWrapperTop() {
    if (isScrollingToWrapperTop) return;
    const scrollTarget = Math.round($stickyWrapper.offset().top - topOffset);
    if ($('html').scrollTop() == scrollTarget) return;
    isScrollingToWrapperTop = true;
    $('html,body').animate(
      { scrollTop: scrollTarget },
      transitionDuration,
      () => {
        isScrollingToWrapperTop = false;
      }
    );
  }

  // Initialize Fuse.js search
  const fuseList = $items.get().map((item, itemIndex) => {
    let fuseEntry = { id: itemIndex };
    searchTextSelectors.forEach((selector, selectorIndex) => {
      fuseEntry[selectorIndex.toString()] = $(item)
        .find(selector.selector || selector)
        .text();
    });
    return fuseEntry;
  });
  const fuseKeys = searchTextSelectors.map((selector, index) =>
    selector.weight
      ? {
          name: index.toString(),
          weight: selector.weight,
        }
      : index.toString()
  );
  const fuseOptions = {
    id: 'id',
    tokenize: true,
    includeScore: true,
    keys: fuseKeys,
  };
  const fuse = new Fuse(fuseList, fuseOptions);

  // Score items by search
  function scoreBySearch(text) {
    const scores = fuse.search(text).reduce((object, item) => {
      object[item.item] = item.score;
      return object;
    }, {});
    $items.each((index, item) => {
      const score = scores[index.toString()] || 1;
      $(item).attr('isotope-search-score', score);
    });
  }

  // Score items by origin order
  function scoreByIndex() {
    $items.each((index, item) => {
      $(item).attr('isotope-search-score', index * 0.00001);
    });
  }

  // On input change: scroll
  $input.on('change keyup paste', () => {
    scrollToWrapperTop();
    const cleanedSearch = $input
      .val()
      .replace(/\s+/g, ' ')
      .trim();
    if (cleanedSearch) {
      scoreBySearch(cleanedSearch);
      $stickyWrapper.addClass(filteringClass);
    } else {
      scoreByIndex();
      $stickyWrapper.removeClass(filteringClass);
    }
    isotope.updateSortData($items);
    isotope.arrange({
      sortBy: 'score',
    });
  });
}
