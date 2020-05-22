import API from "./api.js";
import BoardComponent from "./components/board.js";
import BoardController from "./controllers/board.js";
import FilterController from "./controllers/filter.js";
import SiteMenuComponent, {MenuItem} from "./components/Menu.js";
import StatisticsComponent from "./components/statistics.js";
import TasksModel from "./model/tasks.js";
import {render} from "./utils/render.js";

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;

const createTaskModel = () => {
  const tasksModel = new TasksModel();
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
const renderBordController = (board, data, api) => {
  const boardController = new BoardController(board, data, api);
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

const api = new API(END_POINT, AUTHORIZATION);
const tasksModel = createTaskModel();
const siteMenuComponent = renderMenu();
renderFilters();
const boardComponent = renderBord();
const boardController = renderBordController(boardComponent, tasksModel, api);


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

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });
