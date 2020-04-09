const createFilterMarckup = (filter, isCheched) => {
  const {name, count} = filter;
  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isCheched ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};


const createFilterTemplate = (filters) => {
  const filtersMarckup = filters.map((it, i) => createFilterMarckup(it, i === 0)).join(`\n`);

  return (
    `<section class="main__filter filter container">
    ${filtersMarckup}
    </section>`
  );
};

export {createFilterTemplate};
