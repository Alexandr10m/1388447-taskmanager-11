const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;


const pagination = (btnComponent, array, fn) => {
  btnComponent.getElement().addEventListener(`click`, () => {
    const taskListElement = document.querySelector(`.board__tasks`);
    const prevTasksCount = showingTasksCount;

    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
    array.slice(prevTasksCount, showingTasksCount)
      .forEach((task) => fn(taskListElement, task));

    if (showingTasksCount >= array.length) {
      btnComponent.getElement().remove();
      btnComponent.removeElement();
    }
  });
};

export {pagination};
