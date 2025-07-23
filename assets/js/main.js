import Task from "./task.js";
import TaskList from "./taskList.js";
import UI from "./ui.js";

class App {
  constructor() {
    this.TaskList = new TaskList();
    // Passe l'instance de TaskList à UI
    this.ui = new UI(this.TaskList);
  }

  init() {
    this.ui.displayTasks(this.TaskList.getAllTasks());
    // Add event listener for the add button

    this.ui.form.addEventListener("submit", (event) => {
      event.preventDefault();
      // Prevent form submission

      if (this.ui.addBtn.textContent === "Modifier") {
        // If the button text is "Modifier", update the task
        this.updateTask(this.ui.idd);
      } else {
        this.addTask();
      }
    });

    console.log(this.TaskList.getTasksByCompletion(true));

    this.ui.bindCategoryEvents();

  }

  addTask() {
    const title = this.ui.title.value;
    const description = this.ui.description.value;
    const priority = this.ui.priority.value;

    // Génération d'un id auto-incrémenté
    const tasks = this.TaskList.getAllTasks();
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const task = new Task(newId, title, description, priority);

    this.TaskList.addTask(task);
    this.ui.modal.style.display = "none";
    this.ui.form.reset();
        this.ui.displayTasks(this.TaskList.getAllTasks()); // Refresh the task list display
        this.ui.updateCategoryCounters();
  }

  deleteTask(id) {
    const task = this.TaskList.getTaskById(id);
    this.TaskList.deleteTask(task);
    this.displayTasks(this.TaskList.getAllTasks());
  }


  updateTask(taskId) {
    const task = this.TaskList.getTaskById(taskId);
    if (task) {
      task.title = this.ui.title.value;
      task.description = this.ui.description.value;
      task.priority = this.ui.priority.value;
      this.TaskList.updateTask(task);
      this.ui.modal.style.display = "none";
      this.ui.form.reset();
      this.ui.displayTasks(this.TaskList.getAllTasks());
      this.ui.updateCategoryCounters();
    }
  }
}


const app = new App();
window.app = app;
app.init();


