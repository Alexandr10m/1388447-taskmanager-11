import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";
import SiteMenuComponent from "./components/Menu.js";
import TasksModel from "./model/tasks.js";
import {generateTasks} from "./mock/task.js";
import {render} from "./utils/render.js";

const TASK_COUNT = 22;

const renderMenu = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  render(siteHeaderElement, new SiteMenuComponent());
};
const renderFilters = () => {
  const filterController = new FilterController(siteMainElement, tasksModel);
  filterController.render();
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


renderMenu();
renderFilters();
renderBoard();
