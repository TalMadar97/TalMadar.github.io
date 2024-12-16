
const todoInput = document.getElementById("todo-input");
const addTaskButton = document.getElementById("add-task-button");
const todoList = document.getElementById("todo-list");

let tasks = [];


function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function renderTasks() {
  todoList.innerHTML = ""; 

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("todo-item");

    const header = document.createElement("div");
    header.classList.add("todo-header");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener("change", () => {
      task.completed = taskCheckbox.checked;
      saveTasks();
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) taskText.classList.add("completed");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    header.appendChild(taskCheckbox);
    header.appendChild(taskText);
    header.appendChild(deleteButton);
    taskItem.appendChild(header);

    
    const subtaskList = document.createElement("ul");
    subtaskList.classList.add("subtask-list");

    task.subtasks.forEach((subtask, subIndex) => {
      const subtaskItem = document.createElement("li");
      subtaskItem.classList.add("subtask-item");

      const subtaskCheckbox = document.createElement("input");
      subtaskCheckbox.type = "checkbox";
      subtaskCheckbox.checked = subtask.completed;
      subtaskCheckbox.addEventListener("change", () => {
        subtask.completed = subtaskCheckbox.checked;
        saveTasks();
        renderTasks();
      });

      const subtaskText = document.createElement("span");
      subtaskText.textContent = subtask.text;
      if (subtask.completed) subtaskText.classList.add("completed");

      const subtaskDeleteButton = document.createElement("button");
      subtaskDeleteButton.textContent = "Delete";
      subtaskDeleteButton.classList.add("delete-button");
      subtaskDeleteButton.addEventListener("click", () => {
        task.subtasks.splice(subIndex, 1);
        saveTasks();
        renderTasks();
      });

      subtaskItem.appendChild(subtaskCheckbox);
      subtaskItem.appendChild(subtaskText);
      subtaskItem.appendChild(subtaskDeleteButton);
      subtaskList.appendChild(subtaskItem);
    });

    
    const addSubtaskButton = document.createElement("button");
    addSubtaskButton.textContent = "Add Item";
    addSubtaskButton.classList.add("add-subtask-button");
    addSubtaskButton.addEventListener("click", () => {
      const subtaskText = prompt("Enter item:");
      if (subtaskText) {
        task.subtasks.push({ text: subtaskText, completed: false });
        saveTasks();
        renderTasks();
      }
    });

    taskItem.appendChild(subtaskList);
    taskItem.appendChild(addSubtaskButton);

    todoList.appendChild(taskItem);
  });
}


function addTask() {
  const taskText = todoInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({ text: taskText, completed: false, subtasks: [] });
  saveTasks();
  renderTasks();

  todoInput.value = ""; 
}


addTaskButton.addEventListener("click", addTask);


todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});


loadTasks();
