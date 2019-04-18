$(function() {
  // Generate random item data
  utils.postFaker('.isotope-search__grid', 20)

  // Initialize isotope search
  bundle.init({
    searchTextSelectors: [
      { selector: '.title', weight: 0.8 },
      { selector: '.excerpt', weight: 0.2 },
    ],
    layoutOnImagesLoaded: true,
  })
})
