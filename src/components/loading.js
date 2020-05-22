import AbstractComponent from "./abstract-component.js";

const loadingTmpl = `<p class="board__no-tasks">
    Loading...
</p>`;

export default class Loading extends AbstractComponent {
  getTemplate() {
    return loadingTmpl;
  }
}
