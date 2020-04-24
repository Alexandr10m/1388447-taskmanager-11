import LoadMoreButtonComponent from "../components/Btn-more.js";
import NoTaskComponent from "../components/no-tasks.js";
import SortComponent from "../components/Sort.js";
import TasksComponent from "../components/Tasks.js";
import TaskEditComponent from "../components/Task-editor.js";
import TaskComponent from "../components/Task.js";
import {render, replace} from "../utils/render.js";
import {pagination} from "../pagination.js";


const SHOWING_TASKS_COUNT_ON_START = 8;
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

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTaskComponent = new NoTaskComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }
  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(container, this._noTaskComponent);
      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = container.querySelector(`.board__tasks`);
    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    tasks.slice(0, showingTasksCount).forEach((task) => {
      renderTask(taskListElement, task);
    });

    render(container, this._loadMoreButtonComponent);
    pagination(this._loadMoreButtonComponent, tasks, renderTask);
  }
}
