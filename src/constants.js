const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const SORT_OPTIONS = {
  DEFAULT: `DEFAULT`,
  DATE_UP: `DATE up`,
  DATE_DOWN: `DATE down`
};

const FilterType = {
  ALL: `all`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATING: `repeating`,
  TODAY: `today`
};

const COLOR = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const COLORS = Object.values(COLOR);

export {COLORS, DAYS, MONTH_NAMES, SORT_OPTIONS, FilterType, COLOR};
