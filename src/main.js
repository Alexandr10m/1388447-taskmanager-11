import {render} from './utils';
import {createSiteMenuTemplate} from './components/Menu';
import {createFilterTemplate} from './components/Filters';
import {createBoardTemplate} from './components/Sorts';
import {createTaskTemplate} from './components/Task';
import {createTaskEditTemplate} from './components/Task-editor';
import {createLoadMoreButtonTemplate} from './components/Btn-more';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

const renderMenu = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  render(siteHeaderElement, createSiteMenuTemplate());
};
const renderBoards = () => {
  render(siteMainElement, createFilterTemplate(filters));
  render(siteMainElement, createBoardTemplate());
};
const renderTasks = () => {
  render(taskListElement, createTaskEditTemplate());

  for (let i = 1; i < showingTasksCout; i++) {
    render(taskListElement, createTaskTemplate(tasks[i]));
  }
};
const renderButtonLoadMore = () => {
  render(boardElement, createLoadMoreButtonTemplate());
};

let showingTasksCout = SHOWING_TASKS_COUNT_ON_START;

const siteMainElement = document.querySelector(`.main`);
renderMenu();
renderBoards();
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);
renderTasks();
renderButtonLoadMore();
const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCout;
  showingTasksCout = showingTasksCout + SHOWING_TASKS_COUNT_BY_BUTTON;
  tasks.slice(prevTasksCount, showingTasksCout)
    .forEach((task) => render(taskListElement, createTaskTemplate(task)));

  if (showingTasksCout >= tasks.length) {
    loadMoreButton.remove();
  }
});
