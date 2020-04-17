import BoardComponent from './components/Board';
import FilterComponent from './components/Filters';
import LoadMoreButtonComponent from './components/Btn-more';
import TaskEditComponent from './components/Task-editor';
import TaskComponent from './components/Task';
import TasksComponent from './components/Tasks';
import SiteMenuComponent from './components/Menu';
import SortComponent from './components/Sort';
import {generateTasks} from './mock/task';
import {generateFilters} from './mock/filter';
import {render} from './utils.js';
import {pagination} from './pagination';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;

const renderMenu = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  render(siteHeaderElement, new SiteMenuComponent().getElement());
};
const renderFilters = () => {
  render(siteMainElement, new FilterComponent(filters).getElement());
};
const renderTask = (taskListElement, task) => {
  const onEditButtonClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };
  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement());
};
const renderBoard = (tasks) => {
  const boardComponent = new BoardComponent();

  render(siteMainElement, boardComponent.getElement());
  render(boardComponent.getElement(), new SortComponent().getElement());
  render(boardComponent.getElement(), new TasksComponent().getElement());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

  tasks.slice(0, showingTasksCount)
    .forEach((task) => {
      renderTask(taskListElement, task);
    });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent.getElement());

  pagination(loadMoreButtonComponent, tasks, renderTask);
};


const siteMainElement = document.querySelector(`.main`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

renderMenu();
renderFilters();
renderBoard(tasks);
