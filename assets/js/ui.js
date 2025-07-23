"use strict";
import TaskList from "./taskList.js";

class UI {
  constructor(taskListInstance) {
    this.TaskList = taskListInstance;
    this.idd = 0;
    // Dom elements
    this.addBtn = document.getElementById("ajouter");
    this.title = document.getElementById("title");
    this.description = document.getElementById("description");
    this.priority = document.getElementById("priority");
    this.form = document.querySelector("form");
    this.delete = document.querySelector(".delete");
    this.edit = document.querySelector(".edit");

    // Modal
    this.openModalBtn = document.getElementById("ajoutBtn");
    this.closeModalBtn = document.querySelector(".croi");
    this.modal = document.querySelector(".modal");

    // Task Container
    this.TaskContainer = document.querySelector(".taskList");
    // Barre de recherche
    this.searchInput = document.querySelector("#searchText input");
    if (this.searchInput) {
      this.searchInput.addEventListener("input", () => {
        this.handleSearch();
      });
    }

    this.openModalBtn.addEventListener("click", () => {
      this.modal.style.display = "block";
    });

    this.closeModalBtn.addEventListener("click", () => {
      this.modal.style.display = "none";
    });
  }

  // ...existing code...

  displayTasks(tasks) {
    // console.log(this.TaskList);

    this.TaskContainer.innerHTML = ""; // Clear previous tasks


tasks.forEach((task) => {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.setAttribute("draggable", "true");
  taskDiv.setAttribute("data-id", task.id);
  taskDiv.innerHTML = `
    <div class="task-details">
      <input
        type="checkbox"
        name="completed"
        class="completed"
        id="completed"
        ${task.completed ? "checked" : ""}
      />
      <div class="prio"></div>
      <div class="contTask">
        <h1 class="task-title" style="${task.completed ? 'text-decoration: line-through;' : ''}">${task.title}</h1>
        <p class="task-desc" style="${task.completed ? 'text-decoration: line-through;' : ''}">
          ${task.description}
        </p>
      </div>
    </div>
    <div class="btn">
      <button data-id="${task.id}" class="edit"><i class="fas fa-pen modif"></i></button>
      <button data-id="${task.id}" class="delete"><i class="fa-solid fa-trash sup"></i></button>
    </div>`;
  this.TaskContainer.appendChild(taskDiv);
});


// Drag and drop events
let draggedId = null;
const taskDivs = this.TaskContainer.querySelectorAll(".task");
taskDivs.forEach(div => {
  div.addEventListener("dragstart", (e) => {
    draggedId = Number(div.getAttribute("data-id"));
    e.dataTransfer.effectAllowed = "move";
  });
  div.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
        div.classList.add("dragging");
  });
  div.addEventListener("drop", (e) => {
        div.classList.remove("dragging");
    e.preventDefault();
    const targetId = Number(div.getAttribute("data-id"));
    if (draggedId !== null && draggedId !== targetId) {
      const tasks = this.TaskList.getAllTasks();
        div.classList.add("over");
      const fromIndex = tasks.findIndex(t => t.id === draggedId);
      const toIndex = tasks.findIndex(t => t.id === targetId);
        div.classList.remove("over");
      if (fromIndex !== -1 && toIndex !== -1) {
        // Permute les tâches
        const temp = tasks[fromIndex];
        tasks[fromIndex] = tasks[toIndex];
        tasks[toIndex] = temp;
        // Sauvegarde et réaffiche
        this.TaskList.tasks = tasks;
        TaskList.saveTasks(tasks);
        this.displayTasks(tasks);
        this.updateCategoryCounters();
      }
    }
    draggedId = null;
  });
});



    // Ajout de l'événement sur les cases à cocher
    const checkboxes = this.TaskContainer.querySelectorAll(".completed");
    checkboxes.forEach((box) => {
      box.addEventListener("change", (e) => {
        const parentTaskDiv = box.closest(".task");
        const id = Number(
          parentTaskDiv.querySelector(".edit").getAttribute("data-id")
        );
        const task = this.TaskList.getTaskById(id);
        if (task) {
          task.completed = box.checked;
          this.TaskList.updateTask(task);
          this.displayTasks(this.TaskList.getAllTasks());
          this.updateCategoryCounters();
        }
      });
    });

    // Ajout de l'événement sur les boutons delete
    const deleteButtons = this.TaskContainer.querySelectorAll(".delete");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(btn.getAttribute("data-id"));
        const task = this.TaskList.getTaskById(id);
        this.TaskList.deleteTask(task);
        this.displayTasks(this.TaskList.getAllTasks());
        this.updateCategoryCounters();
      });
    });

    // Ajout de l'événement sur les boutons edit
    const editButtons = this.TaskContainer.querySelectorAll(".edit");
    editButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(btn.getAttribute("data-id"));
        const task = this.TaskList.getTaskById(id);
        if (task) {
          // Ouvre la modale
          this.modal.style.display = "block";
          // Pré-remplit les champs
          this.title.value = task.title;
          this.description.value = task.description;
          this.priority.value = task.priority;

          this.addBtn.textContent = "Modifier";
          this.idd = task.id;
          this.updateCategoryCounters();
        }
      });
    });
    // Méthode pour mettre à jour les compteurs de catégories
  }

  updateCategoryCounters() {
    const allBtn = document.getElementById("all-tasks");
    const inProgressBtn = document.getElementById("in-progress");
    const completedBtn = document.getElementById("completed-tasks");
    const highPriorityBtn = document.getElementById("high-priority");
    const tasks = this.TaskList.getAllTasks();
    allBtn.querySelector(".nbre").textContent = tasks.length;
    inProgressBtn.querySelector(".nbre").textContent = tasks.filter(
      (t) => !t.completed
    ).length;
    completedBtn.querySelector(".nbre").textContent = tasks.filter(
      (t) => t.completed
    ).length;
    highPriorityBtn.querySelector(".nbre").textContent = tasks.filter(
      (t) => t.priority === "élévé"
    ).length;
  }

  bindCategoryEvents() {
    const allBtn = document.getElementById("all-tasks");
    const inProgressBtn = document.getElementById("in-progress");
    const completedBtn = document.getElementById("completed-tasks");
    const highPriorityBtn = document.getElementById("high-priority");

    const updateCounters = () => {
      const tasks = this.TaskList.getAllTasks();
      allBtn.querySelector(".nbre").textContent = tasks.length;
      inProgressBtn.querySelector(".nbre").textContent = tasks.filter(
        (t) => !t.completed
      ).length;
      completedBtn.querySelector(".nbre").textContent = tasks.filter(
        (t) => t.completed
      ).length;
      highPriorityBtn.querySelector(".nbre").textContent = tasks.filter(
        (t) => t.priority === "élévé"
      ).length;
    };

    allBtn.addEventListener("click", () => {
      const tasks = this.TaskList.getAllTasks();
      if (tasks.length > 0) {
        this.displayTasks(tasks);
      } else {
        this.TaskContainer.innerHTML = `<div style='display:flex;justify-content:center;align-items:center;height:120px;'><span style='font-size:1.2em;color:#ccc;'>Aucune tâche</span></div>`;
      }
    });
    inProgressBtn.addEventListener("click", () => {
      const tasks = this.TaskList.getAllTasks().filter((t) => !t.completed);
      if (tasks.length > 0) {
        this.displayTasks(tasks);
      } else {
        this.TaskContainer.innerHTML = `<div style='display:flex;justify-content:center;align-items:center;height:120px;'><span style='font-size:1.2em;color:#ccc;'>Aucune tâche</span></div>`;
      }
    });
    completedBtn.addEventListener("click", () => {
      const tasks = this.TaskList.getAllTasks().filter((t) => t.completed);
      if (tasks.length > 0) {
        this.displayTasks(tasks);
      } else {
        this.TaskContainer.innerHTML = `<div style='display:flex;justify-content:center;align-items:center;height:120px;'><span style='font-size:1.2em;color:#ccc;'>Aucune tâche</span></div>`;
      }
    });
    highPriorityBtn.addEventListener("click", () => {
      const tasks = this.TaskList.getAllTasks().filter((t) => t.priority === "élévé");
      if (tasks.length > 0) {
        this.displayTasks(tasks);
      } else {
        this.TaskContainer.innerHTML = `<div style='display:flex;justify-content:center;align-items:center;height:120px;'><span style='font-size:1.2em;color:#ccc;'>Aucune tâche</span></div>`;
      }
    });

    updateCounters();
    window.addEventListener("storage", updateCounters);
  }

  handleSearch() {
    const query = this.searchInput.value.trim().toLowerCase();
    const tasks = this.TaskList.getAllTasks();
    if (query === "") {
      this.displayTasks(tasks);
      return;
    }
    const filtered = tasks.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );
    if (filtered.length > 0) {
      this.displayTasks(filtered);
    } else {
      this.TaskContainer.innerHTML = `<div style='display:flex;justify-content:center;align-items:center;height:120px;'><span style='font-size:1.2em;color:#ccc;'>Aucune tâche trouvée</span></div>`;
    }
  }
}

export default UI;
