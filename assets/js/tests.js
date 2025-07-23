import Task from "./task.js";
import TaskList from "./taskList.js";

/**
 * Suite de tests unitaires pour la classe TaskList.
 * Vérifie le bon fonctionnement des méthodes principales.
 */
QUnit.module("TaskList Tests", (asserts) => {
  /**
   * Réinitialise le localStorage avant chaque test.
   */
  QUnit.testStart(() => {
    localStorage.removeItem("MesTaches");
  });
  /**
   * Teste l'ajout d'une tâche.
   */
  QUnit.test("addTask ajoute une tâche", (assert) => {
    const taskList = new TaskList();
    const task = new Task(
      1,
      "Tâche test",
      "Ceci est une tâche de test",
      "élevé"
    );
    taskList.addTask(task);
    assert.deepEqual(
      taskList.getAllTasks(),
      [task],
      "La tâche doit être ajoutée à la liste"
    );
  });

  /**
   * Teste la modification d'une tâche.
   */
  QUnit.test("updateTask modifie une tâche", (assert) => {
    const taskList = new TaskList();
    const task = new Task(
      1,
      "Tâche test",
      "Ceci est une tâche de test",
      "élevé"
    );
    taskList.addTask(task);
    const updatedTask = new Task(
      1,
      "Tâche modifiée",
      "Ceci est une tâche modifiée",
      "moyen"
    );
    taskList.updateTask(updatedTask);
    assert.deepEqual(
      taskList.getAllTasks(),
      [updatedTask],
      "La tâche doit être modifiée dans la liste"
    );
  });

  /**
   * Teste la suppression d'une tâche.
   */
  QUnit.test("deleteTask supprime une tâche", (assert) => {
    const taskList = new TaskList();
    const task = new Task(
      1,
      "Tâche test",
      "Ceci est une tâche de test",
      "élevé"
    );
    taskList.addTask(task);
    taskList.deleteTask(task);
    assert.deepEqual(
      taskList.getAllTasks(),
      [],
      "La tâche doit être supprimée de la liste"
    );
  });

  /**
   * Teste la réorganisation des tâches par drag and drop.
   */
  QUnit.test("Drag and drop réorganise les tâches", (assert) => {
    const taskList = new TaskList();
    const task1 = new Task(1, "Tâche 1", "Description 1", "élevé");
    const task2 = new Task(2, "Tâche 2", "Description 2", "moyen");
    taskList.addTask(task1);
    taskList.addTask(task2);
    taskList.dragAndDrop(task1.id, task2.id);
    assert.deepEqual(
      taskList.getAllTasks(),
      [task2, task1],
      "Les tâches doivent être réorganisées"
    );
  });
});
