const filterName = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const generateFilters = () => {
  return filterName.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 22)
    };
  });
};

export {generateFilters};
