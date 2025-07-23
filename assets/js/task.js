"use strict";
/**
 * Représente une tâche individuelle.
 * Contient les propriétés d'une tâche (id, titre, description, priorité, etc.).
 */
class Task {
  /**
   * Initialise une nouvelle tâche avec ses propriétés.
   */
  constructor(id, title, description, priority = "moyen") {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = false;
    this.priority = priority;
    this.createdAt = new Date();
  }
}

export default Task;
