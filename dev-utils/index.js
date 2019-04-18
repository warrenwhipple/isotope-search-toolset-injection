import faker from 'faker'
import $ from 'jquery'

export function postFaker(selector, count = 1) {
  const $selector = $(selector).first()
  for (let i = 0; i < count; i++)
    $selector.append(
      '<div class="isotope-search__item"><img src="' +
        faker.image.abstract() +
        '?=' +
        i +
        '"><h2 class="isotope-search__title">' +
        faker.company.catchPhrase() +
        '</h2><p class="isotope-search__excerpt">' +
        faker.lorem.paragraph() +
        '</p></div>'
    )
}
