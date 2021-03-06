import {COLORS} from "../constants.js";

const DESCRIPTION_ITEM = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти итенсив на соточку`
];
const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const getRandomArrayItem = (array) => {
  const randomItem = getRandomIntegerNumber(0, array.length);
  return array[randomItem];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    'mo': true,
  });
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();
  return {
    id: String(new Date() + Math.random()),
    dueDate,
    description: getRandomArrayItem(DESCRIPTION_ITEM),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(COLORS)
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(() => generateTask());
};

export {generateTask, generateTasks};
