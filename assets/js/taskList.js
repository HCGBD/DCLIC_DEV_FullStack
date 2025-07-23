"use strict";

import task from "./task.js";

/**
 * Gère la liste des tâches et les opérations associées (CRUD, tri, drag & drop).
 */
class TaskList {
  static tasksDb = "MesTaches";

  /**
   * Initialise la liste des tâches à partir du localStorage.
   */
  constructor() {
    this.tasks = TaskList.loadTasks();
  }

  // Permet de réordonner les tâches (drag and drop)
  /**
   * Permet de réordonner les tâches par glisser-déposer.
   */
  dragAndDrop(fromId, toId) {
    const fromIndex = this.tasks.findIndex((t) => t.id === fromId);
    const toIndex = this.tasks.findIndex((t) => t.id === toId);
    if (fromIndex !== -1 && toIndex !== -1) {
      const temp = this.tasks[fromIndex];
      this.tasks[fromIndex] = this.tasks[toIndex];
      this.tasks[toIndex] = temp;
      TaskList.saveTasks(this.tasks);
    }
  }

  /**
   * Ajoute une tâche à la liste et sauvegarde.
   */
  addTask(task) {
    this.tasks.push(task);
    TaskList.saveTasks(this.tasks);
  }

  /**
   * Met à jour une tâche existante et sauvegarde.
   */
  updateTask(task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      TaskList.saveTasks(this.tasks);
    }
  }

  /**
   * Supprime une tâche de la liste et sauvegarde.
   */
  deleteTask(task) {
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    TaskList.saveTasks(this.tasks);
  }

  /**
   * Retourne toutes les tâches.
   */
  getAllTasks() {
    return this.tasks;
  }

  /**
   * Retourne une tâche par son identifiant.
   */
  getTaskById(id) {
    return this.tasks.find((t) => t.id === id);
  }

  /**
   * Retourne les tâches selon leur priorité.
   */
  getTasksByPriority(priority) {
    return this.tasks.filter((t) => t.priority === priority);
  }

  /**
   * Retourne les tâches selon leur statut d'accomplissement.
   */
  getTasksByCompletion(completed) {
    return this.tasks.filter((t) => t.completed === completed);
  }

  /**
   * Sauvegarde la liste des tâches dans le localStorage.
   */
  static saveTasks(tasks) {
    localStorage.setItem(TaskList.tasksDb, JSON.stringify(tasks));
  }

  static loadTasks() {
    const tasks = localStorage.getItem(TaskList.tasksDb);
    return tasks ? JSON.parse(tasks) : [];
  }
}

export default TaskList;
