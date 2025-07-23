import Task  from "./task.js";
import TaskList from "./taskList.js";

QUnit.module("TaskList Tests", asserts => {
    QUnit.testStart(() => {
        localStorage.removeItem("MesTaches");
    });
    QUnit.test("addTask ajoute une tâche", assert => {
        const taskList = new TaskList();
        const task = new Task(1, "Tâche test", "Ceci est une tâche de test", "élevé");
        taskList.addTask(task);
        assert.deepEqual(taskList.getAllTasks(), [task], "La tâche doit être ajoutée à la liste");
    });

    QUnit.test("updateTask modifie une tâche", assert => {
        const taskList = new TaskList();
        const task = new Task(1, "Tâche test", "Ceci est une tâche de test", "élevé");
        taskList.addTask(task);
        const updatedTask = new Task(1, "Tâche modifiée", "Ceci est une tâche modifiée", "moyen");
        taskList.updateTask(updatedTask);
        assert.deepEqual(taskList.getAllTasks(), [updatedTask], "La tâche doit être modifiée dans la liste");
    });

    QUnit.test("deleteTask supprime une tâche", assert => {
        const taskList = new TaskList();
        const task = new Task(1, "Tâche test", "Ceci est une tâche de test", "élevé");
        taskList.addTask(task);
        taskList.deleteTask(task);
        assert.deepEqual(taskList.getAllTasks(), [], "La tâche doit être supprimée de la liste");
    });

    QUnit.test("Drag and drop réorganise les tâches", assert => {
        const taskList = new TaskList();
        const task1 = new Task(1, "Tâche 1", "Description 1", "élevé");
        const task2 = new Task(2, "Tâche 2", "Description 2", "moyen");
        taskList.addTask(task1);
        taskList.addTask(task2);
        taskList.dragAndDrop(task1.id, task2.id);
        assert.deepEqual(taskList.getAllTasks(), [task2, task1], "Les tâches doivent être réorganisées");
    });
    
    
});


