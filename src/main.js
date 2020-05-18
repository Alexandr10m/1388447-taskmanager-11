import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";
import SiteMenuComponent, {MenuItem} from "./components/Menu.js";
import StatisticsComponent from "./components/statistics.js";
import TasksModel from "./model/tasks.js";
import {generateTasks} from "./mock/task.js";
import {render} from "./utils/render.js";


const TASK_COUNT = 22;

const createTaskModel = (tasks) => {
  const tasksModel = new TasksModel();
  tasksModel.setTasks(tasks);
  return tasksModel;
};
const renderMenu = () => {
  const siteMenuComponent = new SiteMenuComponent();
  render(siteHeaderElement, siteMenuComponent);
  return siteMenuComponent;
};
const renderFilters = () => {
  const filterController = new FilterController(siteMainElement, tasksModel);
  filterController.render();
};
const renderBord = () => {
  const boardComponent = new BoardComponent();
  render(siteMainElement, boardComponent);
  return boardComponent;
};
const renderBordController = (board, data) => {
  const boardController = new BoardController(board, data);
  boardController.render();
  return boardController;
};
const renderStatistics = (model, from, to) => {
  const statisticsComponent = new StatisticsComponent({tasks: model, from, to});
  render(siteMainElement, statisticsComponent);
  return statisticsComponent;
};


const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = createTaskModel(tasks);
const siteMenuComponent = renderMenu();
renderFilters();
const boardComponent = renderBord();
const boardController = renderBordController(boardComponent, tasksModel);


const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  return d;
})();

const statisticsComponent = renderStatistics(tasksModel, dateFrom, dateTo);
statisticsComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticsComponent.hide();
      boardComponent.show();
      boardController.createTask();
      break;

    case MenuItem.STATISTICS:
      boardComponent.hide();
      statisticsComponent.show();
      break;

    case menuItem.TASKS:
      statisticsComponent.hide();
      boardComponent.show();
      break;
  }
});
