"use strict";
class Task {
  constructor(
    id,
    title,
    description,
    priority = "moyen"
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = false;
    this.priority = priority;
    this.createdAt = new Date();
  }
}


export default Task;