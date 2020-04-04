import {render} from './utils';
import {createSiteMenuTemplate} from './components/Menu';
import {createFilterTemplate} from './components/Filters';
import {createBoardTemplate} from './components/Sorts';
import {createTaskTemplate} from './components/Task';
import {createTaskEditTemplate} from './components/Task-editor';
import {createLoadMoreButtonTemplate} from './components/Btn-more';

const TASK_COUNT = 3;

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

  for (let i = 0; i < TASK_COUNT; i++) {
    render(taskListElement, createTaskTemplate());
  }

  render(boardElement, createLoadMoreButtonTemplate());
};

const siteMainElement = document.querySelector(`.main`);
renderMenu();
renderBoards();
renderTasks();
