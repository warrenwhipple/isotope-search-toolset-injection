(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.isotopeSearch = factory());
}(this, function () { 'use strict';

  function isotopeSearch() {
    console.log("Hello Isotope Search");
  }

  return isotopeSearch;

}));
