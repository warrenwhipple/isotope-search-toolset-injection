import $ from 'jquery';
import stickybits from 'stickybits';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

export function init(options = {}) {
  const defaultOptions = {
    stickyWrapperSelector: '.sticky-wrapper',
    stickySelector: '.sticky',
    inputSelector: '.sticky-wrapper input',
    gridSelector: '.grid',
    gridItemSelector: '.grid-item',
    columnSizerSelector: '.column-sizer',
    gutterSizerSelector: '.gutter-sizer',
    topOffset: 16,
    layoutOnImagesLoaded: false,
  };
  const {
    stickyWrapperSelector,
    stickySelector,
    inputSelector,
    gridSelector,
    gridItemSelector,
    columnSizerSelector,
    gutterSizerSelector,
    topOffset,
    layoutOnImagesLoaded,
  } = Object.assign({}, defaultOptions, options);

  // Sticky search bar
  stickybits(stickySelector, { stickyBitStickyOffset: topOffset });

  // Masonry layout
  const iso = new Isotope(gridSelector, {
    itemSelector: gridItemSelector,
    masonry: {
      columnWidth: columnSizerSelector,
      gutter: gutterSizerSelector,
    },
  });

  // Refresh layout after images load
  if (layoutOnImagesLoaded)
    imagesLoaded(gridSelector, () => {
      iso.layout();
    });

  // Scroll to wrapper top
  const $stickyWrapper = $(stickyWrapperSelector);
  let isScrollingToWrapperTop = false;
  function scrollToWrapperTop() {
    if (isScrollingToWrapperTop) return;
    const scrollTarget = Math.round($stickyWrapper.offset().top - topOffset);
    if ($('html').scrollTop() == scrollTarget) return;
    isScrollingToWrapperTop = true;
    $('html,body').animate({ scrollTop: scrollTarget }, 200, () => {
      isScrollingToWrapperTop = false;
    });
  }

  // On input change: scroll
  const $input = $(inputSelector);
  $input.on('change keyup paste', () => {
    scrollToWrapperTop();
  });
}
