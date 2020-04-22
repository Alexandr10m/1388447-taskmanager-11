import BoardComponent from './components/Board';
import FilterComponent from './components/Filters';
import LoadMoreButtonComponent from './components/Btn-more';
import TaskEditComponent from './components/Task-editor';
import TaskComponent from './components/Task';
import TasksComponent from './components/Tasks';
import NoTaskComponent from './components/no-tasks';
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
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };
  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEditComponent(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement());
};
const renderBoard = (tasks) => {
  const boardComponent = new BoardComponent();

  render(siteMainElement, boardComponent.getElement());

  const isAllTasksArchived = tasks.every((task) => task.isArchive);

  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTaskComponent().getElement());
    return;
  }
  render(boardComponent.getElement(), new SortComponent().getElement());
  render(boardComponent.getElement(), new TasksComponent().getElement());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

  tasks.slice(0, showingTasksCount).forEach((task) => {
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
