import {render} from './utils';
import {createSiteMenuTemplate} from './components/Menu';
import {createFilterTemplate} from './components/Filters';
import {createBoardTemplate} from './components/Sorts';
import {createTaskTemplate} from './components/Task';
import {createTaskEditTemplate} from './components/Task-editor';
import {createLoadMoreButtonTemplate} from './components/Btn-more';
import {generateTasks} from './mock/task';

const TASK_COUNT = 12;

const tasks = generateTasks(TASK_COUNT);

const renderMenu = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  render(siteHeaderElement, createSiteMenuTemplate());
};
const renderBoards = () => {
  render(siteMainElement, createFilterTemplate());
  render(siteMainElement, createBoardTemplate());
};
const renderTasks = () => {
  const boardElement = siteMainElement.querySelector(`.board`);
  const taskListElement = boardElement.querySelector(`.board__tasks`);
  render(taskListElement, createTaskEditTemplate());

  for (let i = 1; i < tasks.length; i++) {
    render(taskListElement, createTaskTemplate(tasks[i]));
  }

  render(boardElement, createLoadMoreButtonTemplate());
};

const siteMainElement = document.querySelector(`.main`);
renderMenu();
renderBoards();
renderTasks();
