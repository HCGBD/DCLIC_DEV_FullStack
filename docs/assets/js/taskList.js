"use strict";

import task from "./task.js";

class TaskList {
    // Permet de réordonner les tâches (drag and drop)
    dragAndDrop(fromId, toId) {
        const fromIndex = this.tasks.findIndex(t => t.id === fromId);
        const toIndex = this.tasks.findIndex(t => t.id === toId);
        if (fromIndex !== -1 && toIndex !== -1) {
            const temp = this.tasks[fromIndex];
            this.tasks[fromIndex] = this.tasks[toIndex];
            this.tasks[toIndex] = temp;
            TaskList.saveTasks(this.tasks);
        }
    }
    static tasksDb = "MesTaches";

    constructor() {
        this.tasks = TaskList.loadTasks();
    }

    addTask(task) {
        this.tasks.push(task);
        TaskList.saveTasks(this.tasks);
    }

    updateTask(task) {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            this.tasks[index] = task;
            TaskList.saveTasks(this.tasks);
        }
    }

    deleteTask(task) {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        TaskList.saveTasks(this.tasks);
    }

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(t => t.id === id);
    }

    getTasksByPriority(priority) {
        return this.tasks.filter(t => t.priority === priority);
    }

    getTasksByCompletion(completed) {
        return this.tasks.filter(t => t.completed === completed);
    }


    static saveTasks(tasks) {
        localStorage.setItem(TaskList.tasksDb, JSON.stringify(tasks));
    }

    static loadTasks() {
        const tasks = localStorage.getItem(TaskList.tasksDb);
        return tasks ? JSON.parse(tasks) : [];
    }
}


export default TaskList;
