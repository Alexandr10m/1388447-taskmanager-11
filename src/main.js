import BoardComponent from "./components/Board.js";
import BoardController from "./controllers/board.js";
import FilterComponent from "./components/Filters.js";
import SiteMenuComponent from "./components/Menu.js";
import TasksModel from "./model/tasks.js";
import {generateTasks} from "./mock/task.js";
import {generateFilters} from "./mock/filter.js";
import {render} from "./utils/render.js";

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
  const boardController = new BoardController(boardComponent, tasksModel);

  render(siteMainElement, boardComponent);
  boardController.render(tasks);
};

const siteMainElement = document.querySelector(`.main`);

const tasks = generateTasks(TASK_COUNT);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filters = generateFilters();

renderMenu();
renderFilters();
renderBoard();
