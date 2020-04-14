const FILTER_NAME = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const generateFilters = () => {
  return FILTER_NAME.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 22)
    };
  });
};

export {generateFilters};
