import $ from 'jquery';
import stickybits from 'stickybits';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

export function init(options = {}) {
  const defaultOptions = {
    stickySelector: '.sticky',
    stickyOffset: 16,
    gridSelector: '.grid',
    gridItemSelector: '.grid-item',
    columnSizerSelector: '.column-sizer',
    gutterSizerSelector: '.gutter-sizer',
  };
  const {
    stickySelector,
    stickyOffset,
    gridSelector,
    gridItemSelector,
    columnSizerSelector,
    gutterSizerSelector,
  } = Object.assign({}, defaultOptions, options);

  // Sticky search bar
  stickybits(stickySelector, { stickyBitStickyOffset: stickyOffset });

  // Scroll to top of wrapper on typing in search bar
  // TODO

  // Masonry layout
  var iso = new Isotope(gridSelector, {
    itemSelector: gridItemSelector,
    masonry: {
      columnWidth: columnSizerSelector,
      gutter: gutterSizerSelector,
    },
  });

  // Refresh layout after images load
  imagesLoaded(gridSelector, () => {
    iso.layout();
  });
}
