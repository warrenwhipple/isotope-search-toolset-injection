import $ from 'jquery';
import stickybits from 'stickybits';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

export function init({
  stickySelector,
  stickyOffset,
  gridSelector,
  gridItemSelector,
  columnSizerSelector,
  gutterSizerSelector,
}) {
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

  // Trigger layout after images load
  imagesLoaded(gridSelector, () => {
    iso.layout();
  });
}
