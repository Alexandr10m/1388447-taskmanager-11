import BoardComponent from './components/Board';
import BoardController from './controllers/board';
import FilterComponent from './components/Filters';
import SiteMenuComponent from './components/Menu';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';
import {render} from './utils/render.js';

const TASK_COUNT = 22;

const renderMenu = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  render(siteHeaderElement, new SiteMenuComponent());
};
const renderFilters = () => {
  render(siteMainElement, new FilterComponent(filters));
};
const renderBoard = () => {
  const boardComponent = new BoardComponent();
  const boardController = new BoardController(boardComponent);

  render(siteMainElement, boardComponent);
  boardController.render(tasks);
};

const siteMainElement = document.querySelector(`.main`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

renderMenu();
renderFilters();
renderBoard();
