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
import {render, replace} from './utils/render.js';
import {pagination} from './pagination';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;

const renderMenu = () => {
  const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
  render(siteHeaderElement, new SiteMenuComponent());
};
const renderFilters = () => {
  render(siteMainElement, new FilterComponent(filters));
};
const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };
  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  const taskEditComponent = new TaskEditComponent(task);
  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent);
};
const renderBoard = (tasks) => {
  const boardComponent = new BoardComponent();
  render(siteMainElement, boardComponent);

  const isAllTasksArchived = tasks.every((task) => task.isArchive);
  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTaskComponent());
    return;
  }

  render(boardComponent.getElement(), new SortComponent());
  render(boardComponent.getElement(), new TasksComponent());

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);
  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
  tasks.slice(0, showingTasksCount).forEach((task) => {
    renderTask(taskListElement, task);
  });

  const loadMoreButtonComponent = new LoadMoreButtonComponent();
  render(boardComponent.getElement(), loadMoreButtonComponent);

  pagination(loadMoreButtonComponent, tasks, renderTask);
};


const siteMainElement = document.querySelector(`.main`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

renderMenu();
renderFilters();
renderBoard(tasks);
