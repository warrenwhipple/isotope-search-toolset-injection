import $ from 'jquery';
import stickybits from 'stickybits';

export function init() {
  // Sticky search bar
  stickybits('input');

  // Scroll to top of wrapper on typing in search bar
  // TODO

  // Masonry layout
  const $items = $('.item');
  console.log($items);
  // var iso = new Isotope('.grid', {
  //   itemSelector: '.item',
  //   masonry: {
  //     columnWidth:  200,
  //   },
  // });
}
