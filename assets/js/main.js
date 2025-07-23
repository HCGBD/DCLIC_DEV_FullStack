import Task from "./task.js";
import TaskList from "./taskList.js";
import UI from "./ui.js";

/**
 * Classe principale de l'application.
 * Gère l'initialisation, l'ajout, la suppression et la modification des tâches.
 */
class App {
  /**
   * Initialise les instances de TaskList et UI.
   */
  constructor() {
    this.TaskList = new TaskList();
    // Passe l'instance de TaskList à UI
    this.ui = new UI(this.TaskList);
  }

  /**
   * Initialise l'interface utilisateur et les événements principaux.
   */
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

  /**
   * Crée et ajoute une nouvelle tâche à la liste.
   */
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

  /**
   * Supprime une tâche par son identifiant.
   */
  deleteTask(id) {
    const task = this.TaskList.getTaskById(id);
    this.TaskList.deleteTask(task);
    this.displayTasks(this.TaskList.getAllTasks());
  }

  /**
   * Met à jour une tâche existante par son identifiant.
   */
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
