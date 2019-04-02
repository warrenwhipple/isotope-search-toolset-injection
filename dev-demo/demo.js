$(function() {
  // Generate random item data
  for (var i = 0; i < 50; i++)
    $('.grid').append(
      '<div class="grid-item"><img src="' +
        faker.image.avatar() +
        '"><h2 class="name search-text">' +
        faker.name.findName() +
        '</h2><p class="company search-text">' +
        faker.name.jobTitle() +
        '</p><p class="quote">' +
        faker.lorem.paragraph() +
        '</p></div>'
    );

  // Initialize isotope search
  bundle.init({
    searchTextSelectors: [
      { selector: '.name', weight: 0.5 },
      { selector: '.company', weight: 0.4 },
      { selector: '.quote', weight: 0.1 },
    ],
    layoutOnImagesLoaded: true,
  });
});
