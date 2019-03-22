$(function() {
  // Generate random item data
  for (var i = 0; i < 50; i++)
    $('.grid').append(
      '<div class="item"><img src="' +
        faker.image.avatar() +
        '"><h2 class="name">' +
        faker.name.findName() +
        '</h2><p class="company">' +
        faker.name.jobTitle() +
        '</p><p class="quote">' +
        faker.lorem.paragraph() +
        '</p></div>'
    );

  // Initialize isotope search
  isotopeSearch.init({
    stickySelector: 'input',
    stickyOffset: 16,
    gridSelector: '.grid',
    gridItemSelector: '.item',
    columnSizerSelector: '.column-sizer',
    gutterSizerSelector: '.gutter-sizer',
  });
});
