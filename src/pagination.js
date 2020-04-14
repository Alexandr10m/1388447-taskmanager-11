import {render} from './utils';
import {createTaskTemplate} from './components/Task';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;


const pagination = (btn, array) => {
  btn.addEventListener(`click`, () => {
    const taskListElement = document.querySelector(`.board__tasks`);
    const prevTasksCount = showingTasksCount;

    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
    array.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => render(taskListElement, createTaskTemplate(task)));

    if (showingTasksCount >= array.length) {
      btn.remove();
    }
  });
};

export {pagination};
